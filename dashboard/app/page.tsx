"use client"

import { useState } from "react"
import {
  ChevronLeft,
  ChevronRight,
  DollarSign,
  LayoutDashboard,
  Link,
  MessageSquare,
  Phone,
  Settings,
  Smartphone,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react"

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, active: true },
  { label: "Conversas", icon: MessageSquare, active: false },
  { label: "Agentes", icon: Zap, active: false },
  { label: "WhatsApp", icon: Phone, active: false },
  { label: "Webhooks", icon: Link, active: false },
  { label: "Configurações", icon: Settings, active: false },
]

const stats = [
  {
    label: "Mensagens hoje",
    value: "247",
    subtext: "↑ 18% vs ontem",
    icon: MessageSquare,
  },
  {
    label: "Conversas ativas",
    value: "12",
    subtext: "↑ 3 novas agora",
    icon: Users,
  },
  {
    label: "Taxa de resposta",
    value: "94%",
    subtext: "↑ 2% esta semana",
    icon: TrendingUp,
  },
  {
    label: "Vendas recuperadas",
    value: "R$1.2k",
    subtext: "↑ 8 pedidos salvos",
    icon: DollarSign,
  },
]

const activeAgents = [
  {
    name: "Qualificador",
    color: "#fce6c0",
    count: "89 msgs",
    rate: "85%",
    width: "85%",
  },
  {
    name: "Pós-venda",
    color: "#50c878",
    count: "64 msgs",
    rate: "61%",
    width: "61%",
  },
  {
    name: "Suporte",
    color: "#60a5fa",
    count: "57 msgs",
    rate: "54%",
    width: "54%",
  },
  {
    name: "Recuperação",
    color: "#f59e0b",
    count: "37 msgs",
    rate: "35%",
    width: "35%",
  },
]

const recentChats = [
  {
    name: "Maria Aparecida",
    initials: "MA",
    preview: "Quero saber o valor do plano premium e integração.",
    badge: "Qualif.",
    badgeStyle: "bg-[rgba(80,200,120,0.15)] text-[#50c878]",
    time: "há 2 min",
  },
  {
    name: "João Roberto",
    initials: "JR",
    preview: "Tem alguma condição para recuperar o carrinho?",
    badge: "Recup.",
    badgeStyle: "bg-[rgba(245,158,11,0.15)] text-[#f59e0b]",
    time: "há 8 min",
  },
  {
    name: "Carla Silva",
    initials: "CS",
    preview: "Obrigada, pode seguir com a atualização do pedido.",
    badge: "Pós-v.",
    badgeStyle: "bg-[rgba(96,165,250,0.15)] text-[#60a5fa]",
    time: "há 18 min",
  },
  {
    name: "Pedro Lima",
    initials: "PL",
    preview: "Preciso de ajuda com o status do envio agora.",
    badge: "Suporte",
    badgeStyle: "bg-[rgba(248,113,113,0.15)] text-[#f87171]",
    time: "há 32 min",
  },
]

export default function DashboardPage() {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div className="flex h-screen bg-black text-white overflow-hidden">
      <aside
        className={`flex flex-col bg-[rgba(0,0,0,0.95)] border-r border-[rgba(252,230,192,0.10)] transition-all duration-300 ${
          isOpen ? "w-[220px]" : "w-[64px]"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-5">
          <div
            className={`text-lg font-semibold bg-gradient-to-r from-[#fce6c0] to-[#d0aa74] bg-clip-text text-transparent transition-all duration-300 ${
              isOpen ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
            }`}
          >
            AgentsHub
          </div>
        </div>

        <nav className="flex-1 px-2 space-y-6">
          <div className="space-y-2">
            <div
              className={`px-3 text-xs uppercase tracking-[0.2em] text-[#6b7280] transition-all duration-300 ${
                isOpen ? "opacity-100" : "opacity-0 h-0 overflow-hidden"
              }`}
            >
              Principal
            </div>
            <div className="space-y-1">
              {navItems.slice(0, 5).map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.label}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                      item.active
                        ? "bg-gradient-to-r from-[#fce6c0] to-[#d0aa74] text-black font-semibold"
                        : "text-[#9ca3af] hover:bg-[rgba(252,230,192,0.08)] hover:text-white"
                    } ${isOpen ? "justify-start" : "justify-center"}`}
                  >
                    <Icon className="h-5 w-5" />
                    <span
                      className={`transition-all duration-300 ${
                        isOpen ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
                      }`}
                    >
                      {item.label}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="space-y-2">
            <div
              className={`px-3 text-xs uppercase tracking-[0.2em] text-[#6b7280] transition-all duration-300 ${
                isOpen ? "opacity-100" : "opacity-0 h-0 overflow-hidden"
              }`}
            >
              Configuração
            </div>
            <div className="space-y-1">
              {navItems.slice(5).map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.label}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors text-[#9ca3af] hover:bg-[rgba(252,230,192,0.08)] hover:text-white ${
                      isOpen ? "justify-start" : "justify-center"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span
                      className={`transition-all duration-300 ${
                        isOpen ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
                      }`}
                    >
                      {item.label}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </nav>

        <div className="px-4 pb-4">
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="w-full flex items-center justify-center h-10 rounded-lg border border-[rgba(252,230,192,0.12)] bg-[rgba(252,230,192,0.04)] hover:bg-[rgba(252,230,192,0.08)] transition-colors"
          >
            {isOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-14 bg-[rgba(0,0,0,0.95)] border-b border-[rgba(252,230,192,0.12)] flex items-center justify-between px-6">
          <div className="text-sm text-[#9ca3af]">Dashboard</div>
          <div className="w-9 h-9 rounded-full bg-gradient-to-r from-[#fce6c0] to-[#d0aa74] flex items-center justify-center text-black text-sm font-semibold">
            RB
          </div>
        </header>

        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {stats.map((stat) => {
              const Icon = stat.icon
              return (
                <div
                  key={stat.label}
                  className="bg-[#111009] border border-[rgba(252,230,192,0.12)] rounded-xl p-5 hover:scale-[1.01] transition-transform duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-[#9ca3af]">{stat.label}</div>
                    <div className="p-2 rounded-lg bg-gradient-to-r from-[#fce6c0] to-[#d0aa74] text-black">
                      <Icon className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="mt-4 text-4xl font-bold">{stat.value}</div>
                  <div className="mt-2 text-sm text-[#50c878]">{stat.subtext}</div>
                </div>
              )
            })}
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            <div className="bg-[#111009] border border-[rgba(252,230,192,0.12)] rounded-xl p-5 hover:scale-[1.01] transition-transform duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-base font-semibold">Agentes ativos</div>
                  <div className="text-xs text-[#6b7280]">Últimas 24h</div>
                </div>
                <div className="p-2 rounded-lg bg-gradient-to-r from-[#fce6c0] to-[#d0aa74] text-black">
                  <Zap className="h-4 w-4" />
                </div>
              </div>

              <div className="mt-5 space-y-4">
                {activeAgents.map((agent) => (
                  <div key={agent.name}>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: agent.color }}
                        />
                        <span>{agent.name}</span>
                      </div>
                      <div className="flex items-center gap-4 text-[#9ca3af]">
                        <span>{agent.count}</span>
                        <span className="text-white">{agent.rate}</span>
                      </div>
                    </div>
                    <div className="mt-2 h-1 rounded-full bg-[rgba(252,230,192,0.08)]">
                      <div
                        className="h-1 rounded-full"
                        style={{ width: agent.width, backgroundColor: agent.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#111009] border border-[rgba(252,230,192,0.12)] rounded-xl p-5 hover:scale-[1.01] transition-transform duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-base font-semibold">Conversas recentes</div>
                  <div className="text-xs text-[#6b7280]">Atualizado em tempo real</div>
                </div>
                <div className="p-2 rounded-lg bg-gradient-to-r from-[#fce6c0] to-[#d0aa74] text-black">
                  <MessageSquare className="h-4 w-4" />
                </div>
              </div>

              <div className="mt-5 space-y-4">
                {recentChats.map((chat) => (
                  <div key={chat.name} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[rgba(252,230,192,0.1)] border border-[rgba(252,230,192,0.15)] flex items-center justify-center text-[#fce6c0] text-sm font-semibold">
                      {chat.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium">{chat.name}</div>
                        <span className="text-xs text-[#6b7280]">{chat.time}</span>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-xs text-[#6b7280] truncate">{chat.preview}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${chat.badgeStyle}`}>
                          {chat.badge}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-[#111009] border border-[rgba(252,230,192,0.12)] rounded-xl p-5 hover:scale-[1.01] transition-transform duration-200">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-[rgba(37,211,102,0.1)] border border-[rgba(37,211,102,0.3)] text-[#50c878]">
                  <Smartphone className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-base font-semibold">WhatsApp conectado</div>
                  <div className="text-sm text-[#9ca3af]">+55 (11) 99999-0000 · Evolution API</div>
                  <div className="mt-2 flex items-center gap-2 text-xs text-[#9ca3af]">
                    <span className="w-2 h-2 rounded-full bg-[#50c878] animate-pulse" />
                    Online · última mensagem há 2 min
                  </div>
                </div>
              </div>
              <button className="px-4 py-2 rounded-lg text-sm border border-[rgba(252,230,192,0.3)] text-[#fce6c0] hover:bg-[rgba(252,230,192,0.08)] transition-colors">
                Gerenciar
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
