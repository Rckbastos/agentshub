"use client"

import { useState } from "react"
import {
  ChevronLeft, ChevronRight, LayoutDashboard, Link,
  MessageSquare, Phone, Settings, Zap, Plus, Trash2,
  ToggleLeft, ToggleRight, Smartphone, X,
} from "lucide-react"

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, active: false },
  { label: "Conversas", icon: MessageSquare, active: false },
  { label: "Agentes", icon: Zap, active: false },
  { label: "WhatsApp", icon: Phone, active: true },
  { label: "Webhooks", icon: Link, active: false },
  { label: "Configurações", icon: Settings, active: false },
]

const initialInstances = [
  { id: 1, name: "Principal", phone: "+55 (11) 99999-0000", status: "connected", active: true, msgs: 247 },
  { id: 2, name: "Suporte", phone: "+55 (11) 98888-1111", status: "connected", active: true, msgs: 89 },
  { id: 3, name: "Recuperação", phone: "+55 (21) 97777-2222", status: "disconnected", active: false, msgs: 0 },
]

export default function WhatsAppPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [instances, setInstances] = useState(initialInstances)
  const [showModal, setShowModal] = useState(false)
  const [newName, setNewName] = useState("")

  const toggleInstance = (id: number) => {
    setInstances((prev) => prev.map((i) => i.id === id ? { ...i, active: !i.active, status: i.active ? "disconnected" : "connected" } : i))
  }

  const removeInstance = (id: number) => {
    setInstances((prev) => prev.filter((i) => i.id !== id))
  }

  const addInstance = () => {
    if (!newName.trim()) return
    setInstances((prev) => [...prev, { id: Date.now(), name: newName.trim(), phone: "Aguardando conexão", status: "disconnected", active: false, msgs: 0 }])
    setNewName("")
    setShowModal(false)
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
          <div className="text-sm text-[#9ca3af]">WhatsApp</div>
          <div className="flex items-center gap-3">
            <button onClick={() => setShowModal(true)} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#fce6c0] to-[#d0aa74] text-black text-sm font-semibold hover:opacity-90 transition-opacity">
              <Plus className="h-4 w-4" /> Nova instância
            </button>
            <div className="w-9 h-9 rounded-full bg-gradient-to-r from-[#fce6c0] to-[#d0aa74] flex items-center justify-center text-black text-sm font-semibold">RB</div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
          {instances.map((inst) => (
            <div key={inst.id} className="bg-[#111009] border border-[rgba(252,230,192,0.12)] rounded-xl p-5 hover:scale-[1.005] transition-transform duration-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg ${inst.status === "connected" ? "bg-[rgba(37,211,102,0.1)] border border-[rgba(37,211,102,0.3)]" : "bg-[rgba(107,114,128,0.1)] border border-[rgba(107,114,128,0.3)]"}`}>
                    <Smartphone className={`h-5 w-5 ${inst.status === "connected" ? "text-[#50c878]" : "text-[#6b7280]"}`} />
                  </div>
                  <div>
                    <div className="text-base font-semibold">{inst.name}</div>
                    <div className="text-sm text-[#9ca3af]">{inst.phone}</div>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className={`flex items-center gap-1.5 text-xs ${inst.status === "connected" ? "text-[#50c878]" : "text-[#6b7280]"}`}>
                        <span className={`w-2 h-2 rounded-full ${inst.status === "connected" ? "bg-[#50c878] animate-pulse" : "bg-[#6b7280]"}`} />
                        {inst.status === "connected" ? "Conectado" : "Desconectado"}
                      </span>
                      {inst.msgs > 0 && <span className="text-xs text-[#6b7280]">· {inst.msgs} msgs hoje</span>}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => toggleInstance(inst.id)} className="p-2 rounded-lg border border-[rgba(252,230,192,0.12)] hover:bg-[rgba(252,230,192,0.08)] transition-colors">
                    {inst.active ? <ToggleRight className="h-5 w-5 text-[#50c878]" /> : <ToggleLeft className="h-5 w-5 text-[#6b7280]" />}
                  </button>
                  <button onClick={() => removeInstance(inst.id)} className="p-2 rounded-lg border border-[rgba(248,113,113,0.2)] hover:bg-[rgba(248,113,113,0.08)] transition-colors">
                    <Trash2 className="h-4 w-4 text-[#f87171]" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-[#111009] border border-[rgba(252,230,192,0.15)] rounded-2xl w-full max-w-sm mx-4 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="text-lg font-semibold">Nova instância</div>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-lg hover:bg-[rgba(252,230,192,0.08)] transition-colors">
                <X className="h-5 w-5 text-[#9ca3af]" />
              </button>
            </div>
            <div>
              <label className="text-xs text-[#9ca3af] uppercase tracking-wider">Nome da instância</label>
              <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addInstance()} placeholder="Ex: Vendas, Suporte..." className="mt-1.5 w-full bg-[rgba(252,230,192,0.05)] border border-[rgba(252,230,192,0.12)] rounded-lg px-3 py-2.5 text-sm text-white placeholder-[#6b7280] focus:outline-none focus:border-[rgba(252,230,192,0.3)] transition-colors" />
              <p className="text-xs text-[#6b7280] mt-2">Após criar, conecte o WhatsApp escaneando o QR code.</p>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 rounded-lg border border-[rgba(252,230,192,0.12)] text-sm text-[#9ca3af] hover:bg-[rgba(252,230,192,0.08)] transition-colors">Cancelar</button>
              <button onClick={addInstance} className="flex-1 py-2.5 rounded-lg bg-gradient-to-r from-[#fce6c0] to-[#d0aa74] text-black text-sm font-semibold hover:opacity-90 transition-opacity">Criar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
