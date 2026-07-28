import { API_BASE } from './config'

// Mirrors the public-chat DTOs in the jobportal server's support.controller.ts.

export interface AgentChatMessage {
  id: string
  message: string
  sender: string
  timestamp: string // ISO
  isAdmin: boolean
}

export type AgentChatStatus = 'open' | 'in-progress' | 'resolved' | 'closed'

export interface AgentChat {
  id: string
  title: string
  status: AgentChatStatus
  createdAt: string
  updatedAt: string
  messages: AgentChatMessage[]
}

/** Stored locally so a returning visitor lands back in their conversation. */
export interface AgentChatSession {
  id: string
  key: string
  email: string
}

const SESSION_KEY = 'surwive_agent_chat'

export function loadChatSession(): AgentChatSession | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as AgentChatSession
    return parsed.id && parsed.key ? parsed : null
  } catch {
    return null
  }
}

export function saveChatSession(session: AgentChatSession): void {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session))
}

export function clearChatSession(): void {
  localStorage.removeItem(SESSION_KEY)
}

async function req<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...(options.headers ?? {}) },
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error((data as { message?: string }).message ?? `Request failed: ${res.status}`)
  }
  return data as T
}

export function startAgentChat(input: { email: string; title: string; description: string }) {
  return req<{ chat: AgentChat; key: string }>('/api/support/public/chats', {
    method: 'POST',
    body: JSON.stringify(input),
  })
}

export async function fetchAgentChat(id: string, key: string): Promise<AgentChat> {
  const data = await req<{ chat: AgentChat }>(
    `/api/support/public/chats/${id}?key=${encodeURIComponent(key)}`,
  )
  return data.chat
}

export async function sendAgentMessage(id: string, key: string, message: string): Promise<AgentChat> {
  const data = await req<{ chat: AgentChat }>(`/api/support/public/chats/${id}/messages`, {
    method: 'POST',
    body: JSON.stringify({ key, message }),
  })
  return data.chat
}

export function formatChatTime(iso: string): string {
  if (!iso) return ''
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ''
  return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
}
