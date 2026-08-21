import { useState } from 'react'
import { AgentChatPanel } from './AgentChatPanel'
import { IconClose, IconUsers } from './icons'

// Global, always-mounted counterpart to the "Connect with an agent" card on
// the contact page — same AgentChatPanel, reachable from anywhere on the site.
export function FloatingAgentWidget() {
  const [open, setOpen] = useState(false)

  return (
    <div className="agent-widget">
      {open && (
        <div className="agent-widget__panel">
          <button
            type="button"
            className="agent-widget__close"
            onClick={() => setOpen(false)}
            aria-label="Close chat"
          >
            <IconClose />
          </button>
          <AgentChatPanel />
        </div>
      )}

      <button
        type="button"
        className="agent-widget__fab"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close agent chat' : 'Chat with an agent'}
        aria-expanded={open}
      >
        {open ? <IconClose /> : <IconUsers />}
      </button>
    </div>
  )
}
