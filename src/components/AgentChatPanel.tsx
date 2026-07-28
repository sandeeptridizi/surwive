import { useEffect, useRef, useState, type FormEvent } from 'react'
import {
  clearChatSession,
  fetchAgentChat,
  formatChatTime,
  loadChatSession,
  saveChatSession,
  sendAgentMessage,
  startAgentChat,
  type AgentChat,
  type AgentChatSession,
  type AgentChatStatus,
} from '../lib/agentChat'
import { IconSend, IconSpark } from './icons'

const POLL_MS = 5000

const STATUS_LABEL: Record<AgentChatStatus, string> = {
  open: 'Open',
  'in-progress': 'In progress',
  resolved: 'Resolved',
  closed: 'Closed',
}

export function AgentChatPanel() {
  const [session, setSession] = useState<AgentChatSession | null>(() => loadChatSession())
  const [chat, setChat] = useState<AgentChat | null>(null)

  const [email, setEmail] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [starting, setStarting] = useState(false)

  const [reply, setReply] = useState('')
  const [sending, setSending] = useState(false)
  const [errorText, setErrorText] = useState('')

  const bodyRef = useRef<HTMLDivElement>(null)

  const dropSession = () => {
    clearChatSession()
    setSession(null)
    setChat(null)
    setErrorText('')
  }

  // Load the thread and keep polling for agent replies while it's on screen.
  useEffect(() => {
    if (!session) return
    let cancelled = false

    const load = () =>
      fetchAgentChat(session.id, session.key)
        .then((fresh) => {
          if (!cancelled) setChat(fresh)
        })
        .catch(() => {
          // The chat is gone or the key no longer matches — start fresh.
          if (!cancelled) dropSession()
        })

    load()
    const timer = window.setInterval(load, POLL_MS)
    return () => {
      cancelled = true
      window.clearInterval(timer)
    }
  }, [session])

  useEffect(() => {
    const el = bodyRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [chat?.messages.length])

  async function handleStart(e: FormEvent) {
    e.preventDefault()
    if (starting) return
    setStarting(true)
    setErrorText('')
    try {
      const { chat: created, key } = await startAgentChat({
        email: email.trim(),
        title: title.trim(),
        description: description.trim(),
      })
      const next = { id: created.id, key, email: email.trim() }
      saveChatSession(next)
      setChat(created)
      setSession(next)
      setTitle('')
      setDescription('')
    } catch (err) {
      setErrorText(err instanceof Error ? err.message : 'Could not start the chat. Please try again.')
    } finally {
      setStarting(false)
    }
  }

  async function handleSend() {
    if (!session || !reply.trim() || sending) return
    setSending(true)
    setErrorText('')
    try {
      setChat(await sendAgentMessage(session.id, session.key, reply.trim()))
      setReply('')
    } catch (err) {
      setErrorText(err instanceof Error ? err.message : 'Could not send that message.')
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="agent-chat">
      <div className="agent-chat__head">
        <span className="agent-chat__avatar"><IconSpark /></span>
        <div>
          <h3>Surwive support</h3>
          <p>{session ? 'An agent will reply here — keep this tab open or check back later.' : 'Tell us who you are and how we can help.'}</p>
        </div>
        {chat && <span className={`agent-chat__status agent-chat__status--${chat.status}`}>{STATUS_LABEL[chat.status]}</span>}
      </div>

      {!session ? (
        <form className="agent-chat__form" onSubmit={handleStart}>
          <div className="modal__field">
            <label htmlFor="agent-chat-title">Heading</label>
            <input
              id="agent-chat-title"
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Briefly describe the issue"
            />
          </div>
          <div className="modal__field">
            <label htmlFor="agent-chat-description">Description</label>
            <textarea
              id="agent-chat-description"
              required
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tell us more about what's going on..."
            />
          </div>
          <div className="modal__field">
            <label htmlFor="agent-chat-email">Email</label>
            <input
              id="agent-chat-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="jane@email.com"
            />
          </div>
          <button type="submit" className="btn btn--solid agent-chat__start" disabled={starting}>
            {starting ? 'Connecting…' : 'Start chat'} <IconSend />
          </button>
          <p className="agent-chat__note">
            Have a Surwive account? Use the same email — this conversation will be waiting in your
            dashboard chat when you log in.
          </p>
          {errorText && <p className="agent-chat__error">{errorText}</p>}
        </form>
      ) : (
        <>
          <div className="agent-chat__body" ref={bodyRef}>
            {!chat && <p className="agent-chat__loading">Loading your conversation…</p>}
            {chat?.messages.map((msg) => (
              <div key={msg.id} className={`chat-msg ${msg.isAdmin ? 'chat-msg--agent' : 'chat-msg--guest'}`}>
                {msg.isAdmin && <span className="chat-msg__sender">{msg.sender}</span>}
                {msg.message}
                <small>{formatChatTime(msg.timestamp)}</small>
              </div>
            ))}
            {chat && chat.messages.every((m) => !m.isAdmin) && (
              <p className="agent-chat__loading">You're connected — an agent will respond shortly.</p>
            )}
          </div>
          <div className="agent-chat__row">
            <input
              type="text"
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSend()
              }}
              placeholder="Type a message..."
              aria-label="Message"
            />
            <button
              type="button"
              className="agent-chat__send"
              onClick={handleSend}
              disabled={!reply.trim() || sending}
              aria-label="Send message"
            >
              <IconSend />
            </button>
          </div>
          <div className="agent-chat__foot">
            {errorText ? <span className="agent-chat__error">{errorText}</span> : <span>Linked to {session.email || 'your email'}</span>}
            <button type="button" className="agent-chat__restart" onClick={dropSession}>
              Start a new chat
            </button>
          </div>
        </>
      )}
    </div>
  )
}
