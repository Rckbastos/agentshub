"use client"

import { useState } from "react"
import {
  ChevronLeft, ChevronRight, LayoutDashboard, Link,
  MessageSquare, Phone, Settings, Zap, X, Upload,
  Edit2, ToggleLeft, ToggleRight,
} from "lucide-react"

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, active: false },
  { label: "Conversas", icon: MessageSquare, active: false },
  { label: "Agentes", icon: Zap, active: true },
  { label: "WhatsApp", icon: Phone, active: false },
  { label: "Webhooks", icon: Link, active: false },
  { label: "Configurações", icon: Settings, active: false },
]

const initialAgents = [
  {
    id: 1,
    name: "Qualificador",
    description: "Qualifica leads e apresenta o produto",
    color: "#fce6c0",
    badgeStyle: "bg-[rgba(252,230,192,0.15)] text-[#fce6c0]",
    active: true,
    stats: { msgs: 89, rate: "85%" },
    config: { urlProduto: "", descricao: "", linkCheckout: "", provaSocial1: "", provaSocial2: "" },
  },
  {
    id: 2,
    name: "Pós-venda",
    description: "Acompanha pedidos e fideliza clientes",
    color: "#50c878",
    badgeStyle: "bg-[rgba(80,200,120,0.15)] text-[#50c878]",
    active: true,
    stats: { msgs: 64, rate: "61%" },
    config: { urlProduto: "", descricao: "", linkCheckout: "", provaSocial1: "", provaSocial2: "" },
  },
  {
    id: 3,
    name: "Suporte",
    description: "Resolve dúvidas e problemas dos clientes",
    color: "#60a5fa",
    badgeStyle: "bg-[rgba(96,165,250,0.15)] text-[#60a5fa]",
    active: true,
    stats: { msgs: 57, rate: "54%" },
    config: { urlProduto: "", descricao: "", linkCheckout: "", provaSocial1: "", provaSocial2: "" },
  },
  {
    id: 4,
    name: "Recuperação",
    description: "Recupera carrinhos abandonados",
    color: "#f59e0b",
    badgeStyle: "bg-[rgba(245,158,11,0.15)] text-[#f59e0b]",
    active: false,
    stats: { msgs: 37, rate: "35%" },
    config: { urlProduto: "", descricao: "", linkCheckout: "", provaSocial1: "", provaSocial2: "" },
  },
]

type Agent = typeof initialAgents[0]

export default function AgentesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [agents, setAgents] = useState(initialAgents)
  const [editingAgent, setEditingAgent] = useState<Agent | null>(null)
  const [form, setForm] = useState({ urlProduto: "", descricao: "", linkCheckout: "", provaSocial1: "", provaSocial2: "" })

  const openModal = (agent: Agent) => {
    setEditingAgent(agent)
    setForm(agent.config)
  }

  const closeModal = () => {
    setEditingAgent(null)
  }

  const saveConfig = () => {
    if (!editingAgent) return
    setAgents((prev) => prev.map((a) => a.id === editingAgent.id ? { ...a, config: form } : a))
    closeModal()
  }

  const toggleAgent = (id: number) => {
    setAgents((prev) => prev.map((a) => a.id === id ? { ...a, active: !a.active } : a))
  }

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
          <div className="text-sm text-[#9ca3af]">Agentes</div>
          <div className="w-9 h-9 rounded-full bg-gradient-to-r from-[#fce6c0] to-[#d0aa74] flex items-center justify-center text-black text-sm font-semibold">RB</div>
        </header>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {agents.map((agent) => (
              <div key={agent.id} className="bg-[#111009] border border-[rgba(252,230,192,0.12)] rounded-xl p-5 hover:scale-[1.01] transition-transform duration-200">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${agent.color}20`, border: `1px solid ${agent.color}40` }}>
                      <Zap className="h-5 w-5" style={{ color: agent.color }} />
                    </div>
                    <div>
                      <div className="text-base font-semibold">{agent.name}</div>
                      <div className="text-xs text-[#6b7280] mt-0.5">{agent.description}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => openModal(agent)} className="p-2 rounded-lg border border-[rgba(252,230,192,0.12)] hover:bg-[rgba(252,230,192,0.08)] transition-colors">
                      <Edit2 className="h-4 w-4 text-[#9ca3af]" />
                    </button>
                    <button onClick={() => toggleAgent(agent.id)} className="p-2 rounded-lg border border-[rgba(252,230,192,0.12)] hover:bg-[rgba(252,230,192,0.08)] transition-colors">
                      {agent.active
                        ? <ToggleRight className="h-5 w-5 text-[#50c878]" />
                        : <ToggleLeft className="h-5 w-5 text-[#6b7280]" />}
                    </button>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-3">
                  <span className={`text-xs px-2 py-1 rounded-full ${agent.active ? "bg-[rgba(80,200,120,0.15)] text-[#50c878]" : "bg-[rgba(107,114,128,0.15)] text-[#6b7280]"}`}>
                    {agent.active ? "Ativo" : "Inativo"}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full ${agent.badgeStyle}`}>{agent.name}</span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="bg-[rgba(252,230,192,0.04)] rounded-lg p-3 border border-[rgba(252,230,192,0.08)]">
                    <div className="text-xs text-[#6b7280]">Mensagens</div>
                    <div className="text-xl font-bold mt-1">{agent.stats.msgs}</div>
                  </div>
                  <div className="bg-[rgba(252,230,192,0.04)] rounded-lg p-3 border border-[rgba(252,230,192,0.08)]">
                    <div className="text-xs text-[#6b7280]">Taxa uso</div>
                    <div className="text-xl font-bold mt-1">{agent.stats.rate}</div>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="h-1 rounded-full bg-[rgba(252,230,192,0.08)]">
                    <div className="h-1 rounded-full transition-all duration-500" style={{ width: agent.stats.rate, backgroundColor: agent.color }} />
                  </div>
                </div>

                {(agent.config.urlProduto || agent.config.linkCheckout) && (
                  <div className="mt-3 text-xs text-[#6b7280] truncate">
                    {agent.config.urlProduto && <span>🔗 {agent.config.urlProduto}</span>}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>

      {editingAgent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-[#111009] border border-[rgba(252,230,192,0.15)] rounded-2xl w-full max-w-md mx-4 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="text-lg font-semibold">Configurar agente</div>
                <div className="text-sm text-[#9ca3af] mt-0.5">{editingAgent.name}</div>
              </div>
              <button onClick={closeModal} className="p-2 rounded-lg hover:bg-[rgba(252,230,192,0.08)] transition-colors">
                <X className="h-5 w-5 text-[#9ca3af]" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs text-[#9ca3af] uppercase tracking-wider">URL do Produto *</label>
                <input type="url" value={form.urlProduto} onChange={(e) => setForm({ ...form, urlProduto: e.target.value })} placeholder="https://seuproduto.com" className="mt-1.5 w-full bg-[rgba(252,230,192,0.05)] border border-[rgba(252,230,192,0.12)] rounded-lg px-3 py-2.5 text-sm text-white placeholder-[#6b7280] focus:outline-none focus:border-[rgba(252,230,192,0.3)] transition-colors" />
              </div>
              <div>
                <label className="text-xs text-[#9ca3af] uppercase tracking-wider">Descrição do Produto <span className="normal-case text-[#6b7280]">(opcional)</span></label>
                <textarea value={form.descricao} onChange={(e) => setForm({ ...form, descricao: e.target.value })} placeholder="Descreva brevemente o produto..." rows={3} className="mt-1.5 w-full bg-[rgba(252,230,192,0.05)] border border-[rgba(252,230,192,0.12)] rounded-lg px-3 py-2.5 text-sm text-white placeholder-[#6b7280] focus:outline-none focus:border-[rgba(252,230,192,0.3)] transition-colors resize-none" />
              </div>
              <div>
                <label className="text-xs text-[#9ca3af] uppercase tracking-wider">Link de Checkout *</label>
                <input type="url" value={form.linkCheckout} onChange={(e) => setForm({ ...form, linkCheckout: e.target.value })} placeholder="https://checkout.seuproduto.com" className="mt-1.5 w-full bg-[rgba(252,230,192,0.05)] border border-[rgba(252,230,192,0.12)] rounded-lg px-3 py-2.5 text-sm text-white placeholder-[#6b7280] focus:outline-none focus:border-[rgba(252,230,192,0.3)] transition-colors" />
              </div>
              <div>
                <label className="text-xs text-[#9ca3af] uppercase tracking-wider">Prova Social 1 <span className="normal-case text-[#6b7280]">(imagem ou áudio)</span></label>
                <div className="mt-1.5 flex gap-2">
                  <input type="url" value={form.provaSocial1} onChange={(e) => setForm({ ...form, provaSocial1: e.target.value })} placeholder="URL da imagem ou áudio" className="flex-1 bg-[rgba(252,230,192,0.05)] border border-[rgba(252,230,192,0.12)] rounded-lg px-3 py-2.5 text-sm text-white placeholder-[#6b7280] focus:outline-none focus:border-[rgba(252,230,192,0.3)] transition-colors" />
                  <button className="px-3 py-2.5 rounded-lg border border-[rgba(252,230,192,0.12)] hover:bg-[rgba(252,230,192,0.08)] transition-colors">
                    <Upload className="h-4 w-4 text-[#9ca3af]" />
                  </button>
                </div>
              </div>
              <div>
                <label className="text-xs text-[#9ca3af] uppercase tracking-wider">Prova Social 2 <span className="normal-case text-[#6b7280]">(imagem ou áudio)</span></label>
                <div className="mt-1.5 flex gap-2">
                  <input type="url" value={form.provaSocial2} onChange={(e) => setForm({ ...form, provaSocial2: e.target.value })} placeholder="URL da imagem ou áudio" className="flex-1 bg-[rgba(252,230,192,0.05)] border border-[rgba(252,230,192,0.12)] rounded-lg px-3 py-2.5 text-sm text-white placeholder-[#6b7280] focus:outline-none focus:border-[rgba(252,230,192,0.3)] transition-colors" />
                  <button className="px-3 py-2.5 rounded-lg border border-[rgba(252,230,192,0.12)] hover:bg-[rgba(252,230,192,0.08)] transition-colors">
                    <Upload className="h-4 w-4 text-[#9ca3af]" />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={closeModal} className="flex-1 py-2.5 rounded-lg border border-[rgba(252,230,192,0.12)] text-sm text-[#9ca3af] hover:bg-[rgba(252,230,192,0.08)] transition-colors">Cancelar</button>
              <button onClick={saveConfig} className="flex-1 py-2.5 rounded-lg bg-gradient-to-r from-[#fce6c0] to-[#d0aa74] text-black text-sm font-semibold hover:opacity-90 transition-opacity">Salvar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
