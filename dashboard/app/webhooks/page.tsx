"use client"

import { useState } from "react"
import {
  ChevronLeft, ChevronRight, LayoutDashboard, Link,
  MessageSquare, Phone, Settings, Zap, Plus, Trash2, Copy, Check,
} from "lucide-react"

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, active: false },
  { label: "Conversas", icon: MessageSquare, active: false },
  { label: "Agentes", icon: Zap, active: false },
  { label: "WhatsApp", icon: Phone, active: false },
  { label: "Webhooks", icon: Link, active: true },
  { label: "Configurações", icon: Settings, active: false },
]

const eventOptions = ["checkout.created", "checkout.paid", "checkout.abandoned", "checkout.refunded", "order.created", "order.shipped"]

const initialWebhooks = [
  { id: 1, name: "Pós-venda Pegasus", url: "https://agentshub-production.up.railway.app/webhook/posVenda", events: ["checkout.paid", "order.shipped"], active: true, lastTriggered: "há 2 min" },
  { id: 2, name: "Recuperação de carrinho", url: "https://agentshub-production.up.railway.app/webhook/recuperacao", events: ["checkout.abandoned"], active: true, lastTriggered: "há 15 min" },
]

export default function WebhooksPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [webhooks, setWebhooks] = useState(initialWebhooks)
  const [showModal, setShowModal] = useState(false)
  const [copied, setCopied] = useState<number | null>(null)
  const [form, setForm] = useState({ name: "", events: [] as string[] })

  const copyUrl = (id: number, url: string) => {
    navigator.clipboard.writeText(url)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  const toggleEvent = (event: string) => {
    setForm((prev) => ({
      ...prev,
      events: prev.events.includes(event) ? prev.events.filter((e) => e !== event) : [...prev.events, event],
    }))
  }

  const addWebhook = () => {
    if (!form.name.trim() || form.events.length === 0) return
    const slug = form.name.toLowerCase().replace(/\s+/g, "-")
    setWebhooks((prev) => [...prev, {
      id: Date.now(),
      name: form.name,
      url: `https://agentshub-production.up.railway.app/webhook/${slug}`,
      events: form.events,
      active: true,
      lastTriggered: "nunca",
    }])
    setForm({ name: "", events: [] })
    setShowModal(false)
  }

  const removeWebhook = (id: number) => setWebhooks((prev) => prev.filter((w) => w.id !== id))

  return (
    <div className="flex h-screen bg-black text-white overflow-hidden">
      <aside className={`flex flex-col bg-[rgba(0,0,0,0.95)] border-r border-[rgba(252,230,192,0.10)] transition-all duration-300 ${sidebarOpen ? "w-[220px]" : "w-[64px]"}`}>
        <div className="flex items-center px-4 py-5">
          <div className={`text-lg font-semibold bg-gradient-to-r from-[#fce6c0] to-[#d0aa74] bg-clip-text text-transparent transition-all duration-300 ${sidebarOpen ? "opacity-100" : "opacity-0 w-0 overflow-hidden"}`}>AgentsHub</div>
        </div>
        <nav className="flex-1 px-2 space-y-6">
          <div className="space-y-2">
            <div className={`px-3 text-xs uppercase tracking-[0.2em] text-[#6b7280] ${sidebarOpen ? "opacity-100" : "opacity-0 h-0 overflow-hidden"}`}>Principal</div>
            <div className="space-y-1">
              {navItems.slice(0, 5).map((item) => {
                const Icon = item.icon
                return (
                  <button key={item.label} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${item.active ? "bg-gradient-to-r from-[#fce6c0] to-[#d0aa74] text-black font-semibold" : "text-[#9ca3af] hover:bg-[rgba(252,230,192,0.08)] hover:text-white"} ${sidebarOpen ? "justify-start" : "justify-center"}`}>
                    <Icon className="h-5 w-5 shrink-0" />
                    <span className={`transition-all duration-300 ${sidebarOpen ? "opacity-100" : "opacity-0 w-0 overflow-hidden"}`}>{item.label}</span>
                  </button>
                )
              })}
            </div>
          </div>
          <div className="space-y-2">
            <div className={`px-3 text-xs uppercase tracking-[0.2em] text-[#6b7280] ${sidebarOpen ? "opacity-100" : "opacity-0 h-0 overflow-hidden"}`}>Configuração</div>
            <div className="space-y-1">
              {navItems.slice(5).map((item) => {
                const Icon = item.icon
                return (
                  <button key={item.label} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors text-[#9ca3af] hover:bg-[rgba(252,230,192,0.08)] hover:text-white ${sidebarOpen ? "justify-start" : "justify-center"}`}>
                    <Icon className="h-5 w-5 shrink-0" />
                    <span className={`transition-all duration-300 ${sidebarOpen ? "opacity-100" : "opacity-0 w-0 overflow-hidden"}`}>{item.label}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </nav>
        <div className="px-4 pb-4">
          <button onClick={() => setSidebarOpen((p) => !p)} className="w-full flex items-center justify-center h-10 rounded-lg border border-[rgba(252,230,192,0.12)] bg-[rgba(252,230,192,0.04)] hover:bg-[rgba(252,230,192,0.08)] transition-colors">
            {sidebarOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-14 bg-[rgba(0,0,0,0.95)] border-b border-[rgba(252,230,192,0.12)] flex items-center justify-between px-6 shrink-0">
          <div className="text-sm text-[#9ca3af]">Webhooks</div>
          <div className="flex items-center gap-3">
            <button onClick={() => setShowModal(true)} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#fce6c0] to-[#d0aa74] text-black text-sm font-semibold hover:opacity-90 transition-opacity">
              <Plus className="h-4 w-4" /> Novo webhook
            </button>
            <div className="w-9 h-9 rounded-full bg-gradient-to-r from-[#fce6c0] to-[#d0aa74] flex items-center justify-center text-black text-sm font-semibold">RB</div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
          <div className="bg-[rgba(252,230,192,0.04)] border border-[rgba(252,230,192,0.10)] rounded-xl p-4 text-sm text-[#9ca3af]">
            Cole a URL gerada abaixo nos eventos da <span className="text-[#fce6c0]">Pegasus Checkout</span> para ativar os agentes automaticamente.
          </div>

          {webhooks.map((wh) => (
            <div key={wh.id} className="bg-[#111009] border border-[rgba(252,230,192,0.12)] rounded-xl p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <div className="text-base font-semibold">{wh.name}</div>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${wh.active ? "bg-[rgba(80,200,120,0.15)] text-[#50c878]" : "bg-[rgba(107,114,128,0.15)] text-[#6b7280]"}`}>
                      {wh.active ? "Ativo" : "Inativo"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <code className="text-xs text-[#9ca3af] bg-[rgba(255,255,255,0.04)] px-2 py-1 rounded truncate max-w-sm">{wh.url}</code>
                    <button onClick={() => copyUrl(wh.id, wh.url)} className="shrink-0 p-1.5 rounded hover:bg-[rgba(252,230,192,0.08)] transition-colors">
                      {copied === wh.id ? <Check className="h-3.5 w-3.5 text-[#50c878]" /> : <Copy className="h-3.5 w-3.5 text-[#6b7280]" />}
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {wh.events.map((e) => (
                      <span key={e} className="text-xs px-2 py-0.5 rounded-full bg-[rgba(96,165,250,0.12)] text-[#60a5fa]">{e}</span>
                    ))}
                  </div>
                  <div className="text-xs text-[#6b7280] mt-2">Último disparo: {wh.lastTriggered}</div>
                </div>
                <button onClick={() => removeWebhook(wh.id)} className="p-2 rounded-lg border border-[rgba(248,113,113,0.2)] hover:bg-[rgba(248,113,113,0.08)] transition-colors shrink-0">
                  <Trash2 className="h-4 w-4 text-[#f87171]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-[#111009] border border-[rgba(252,230,192,0.15)] rounded-2xl w-full max-w-md mx-4 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="text-lg font-semibold">Novo webhook</div>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-lg hover:bg-[rgba(252,230,192,0.08)] transition-colors">
                <span className="text-[#9ca3af] text-lg leading-none">×</span>
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-[#9ca3af] uppercase tracking-wider">Nome</label>
                <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Ex: Recuperação de carrinho" className="mt-1.5 w-full bg-[rgba(252,230,192,0.05)] border border-[rgba(252,230,192,0.12)] rounded-lg px-3 py-2.5 text-sm text-white placeholder-[#6b7280] focus:outline-none focus:border-[rgba(252,230,192,0.3)] transition-colors" />
              </div>
              <div>
                <label className="text-xs text-[#9ca3af] uppercase tracking-wider mb-2 block">Eventos Pegasus</label>
                <div className="flex flex-wrap gap-2">
                  {eventOptions.map((e) => (
                    <button key={e} onClick={() => toggleEvent(e)} className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${form.events.includes(e) ? "bg-gradient-to-r from-[#fce6c0] to-[#d0aa74] text-black border-transparent" : "border-[rgba(252,230,192,0.12)] text-[#9ca3af] hover:border-[rgba(252,230,192,0.3)]"}`}>
                      {e}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 rounded-lg border border-[rgba(252,230,192,0.12)] text-sm text-[#9ca3af] hover:bg-[rgba(252,230,192,0.08)] transition-colors">Cancelar</button>
              <button onClick={addWebhook} className="flex-1 py-2.5 rounded-lg bg-gradient-to-r from-[#fce6c0] to-[#d0aa74] text-black text-sm font-semibold hover:opacity-90 transition-opacity">Criar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
