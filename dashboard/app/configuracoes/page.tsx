"use client"

import { useState } from "react"
import {
  ChevronLeft, ChevronRight, LayoutDashboard, Link,
  MessageSquare, Phone, Settings, Zap, Save, User, CreditCard, Bell,
} from "lucide-react"

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, active: false },
  { label: "Conversas", icon: MessageSquare, active: false },
  { label: "Agentes", icon: Zap, active: false },
  { label: "WhatsApp", icon: Phone, active: false },
  { label: "Webhooks", icon: Link, active: false },
  { label: "Configurações", icon: Settings, active: true },
]

const plans = [
  { id: "starter", name: "Starter", price: "R$97/mês", msgs: "500 msgs", color: "#9ca3af" },
  { id: "pro", name: "Pro", price: "R$197/mês", msgs: "2.000 msgs", color: "#fce6c0" },
  { id: "scale", name: "Scale", price: "R$397/mês", msgs: "Ilimitado", color: "#50c878" },
]

export default function ConfiguracoesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeTab, setActiveTab] = useState("conta")
  const [saved, setSaved] = useState(false)
  const [form, setForm] = useState({
    nome: "Ricardo Bastos",
    email: "ricardo@agentshub.com.br",
    empresa: "AgentsHub",
    plano: "pro",
    notifEmail: true,
    notifWhatsApp: false,
  })

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const tabs = [
    { id: "conta", label: "Conta", icon: User },
    { id: "plano", label: "Plano", icon: CreditCard },
    { id: "notificacoes", label: "Notificações", icon: Bell },
  ]

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
                  <button key={item.label} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${item.active ? "bg-gradient-to-r from-[#fce6c0] to-[#d0aa74] text-black font-semibold" : "text-[#9ca3af] hover:bg-[rgba(252,230,192,0.08)] hover:text-white"} ${sidebarOpen ? "justify-start" : "justify-center"}`}>
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
          <div className="text-sm text-[#9ca3af]">Configurações</div>
          <div className="w-9 h-9 rounded-full bg-gradient-to-r from-[#fce6c0] to-[#d0aa74] flex items-center justify-center text-black text-sm font-semibold">RB</div>
        </header>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          <div className="max-w-2xl mx-auto">
            <div className="flex gap-1 mb-6 bg-[#111009] border border-[rgba(252,230,192,0.10)] rounded-xl p-1">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === tab.id ? "bg-gradient-to-r from-[#fce6c0] to-[#d0aa74] text-black" : "text-[#9ca3af] hover:text-white"}`}>
                    <Icon className="h-4 w-4" />
                    {tab.label}
                  </button>
                )
              })}
            </div>

            {activeTab === "conta" && (
              <div className="space-y-4">
                <div className="bg-[#111009] border border-[rgba(252,230,192,0.12)] rounded-xl p-6 space-y-4">
                  <div className="text-base font-semibold">Dados da conta</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-[#9ca3af] uppercase tracking-wider">Nome completo</label>
                      <input type="text" value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} className="mt-1.5 w-full bg-[rgba(252,230,192,0.05)] border border-[rgba(252,230,192,0.12)] rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[rgba(252,230,192,0.3)] transition-colors" />
                    </div>
                    <div>
                      <label className="text-xs text-[#9ca3af] uppercase tracking-wider">E-mail</label>
                      <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-1.5 w-full bg-[rgba(252,230,192,0.05)] border border-[rgba(252,230,192,0.12)] rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[rgba(252,230,192,0.3)] transition-colors" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-xs text-[#9ca3af] uppercase tracking-wider">Nome da empresa</label>
                      <input type="text" value={form.empresa} onChange={(e) => setForm({ ...form, empresa: e.target.value })} className="mt-1.5 w-full bg-[rgba(252,230,192,0.05)] border border-[rgba(252,230,192,0.12)] rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[rgba(252,230,192,0.3)] transition-colors" />
                    </div>
                  </div>
                </div>
                <button onClick={handleSave} className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${saved ? "bg-[#50c878] text-black" : "bg-gradient-to-r from-[#fce6c0] to-[#d0aa74] text-black hover:opacity-90"}`}>
                  <Save className="h-4 w-4" />
                  {saved ? "Salvo!" : "Salvar alterações"}
                </button>
              </div>
            )}

            {activeTab === "plano" && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {plans.map((plan) => (
                    <button key={plan.id} onClick={() => setForm({ ...form, plano: plan.id })} className={`bg-[#111009] border rounded-xl p-5 text-left transition-all hover:scale-[1.02] ${form.plano === plan.id ? "border-[rgba(252,230,192,0.4)] ring-1 ring-[rgba(252,230,192,0.2)]" : "border-[rgba(252,230,192,0.12)]"}`}>
                      <div className="text-base font-semibold" style={{ color: plan.color }}>{plan.name}</div>
                      <div className="text-2xl font-bold mt-2">{plan.price}</div>
                      <div className="text-sm text-[#9ca3af] mt-1">{plan.msgs}</div>
                      {form.plano === plan.id && <div className="mt-3 text-xs text-[#50c878]">✓ Plano atual</div>}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "notificacoes" && (
              <div className="bg-[#111009] border border-[rgba(252,230,192,0.12)] rounded-xl p-6 space-y-4">
                <div className="text-base font-semibold">Preferências de notificação</div>
                [{
                  key: "notifEmail",
                  label: "Notificações por e-mail",
                  desc: "Receba alertas de novas conversas e eventos no e-mail",
                },
                {
                  key: "notifWhatsApp",
                  label: "Notificações por WhatsApp",
                  desc: "Receba alertas diretamente no WhatsApp",
                }].map((item) => (
                  <div key={item.key} className="flex items-center justify-between py-3 border-b border-[rgba(252,230,192,0.06)] last:border-0">
                    <div>
                      <div className="text-sm font-medium">{item.label}</div>
                      <div className="text-xs text-[#6b7280] mt-0.5">{item.desc}</div>
                    </div>
                    <button onClick={() => setForm({ ...form, [item.key]: !form[item.key as keyof typeof form] })} className={`w-12 h-6 rounded-full transition-colors relative ${form[item.key as keyof typeof form] ? "bg-gradient-to-r from-[#fce6c0] to-[#d0aa74]" : "bg-[rgba(255,255,255,0.1)]"}`}>
                      <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${form[item.key as keyof typeof form] ? "left-7" : "left-1"}`} />
                    </button>
                  </div>
                ))}
                <button onClick={handleSave} className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${saved ? "bg-[#50c878] text-black" : "bg-gradient-to-r from-[#fce6c0] to-[#d0aa74] text-black hover:opacity-90"}`}>
                  <Save className="h-4 w-4" />
                  {saved ? "Salvo!" : "Salvar alterações"}
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
