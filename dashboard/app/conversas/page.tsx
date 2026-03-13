"use client"

import { useState, useRef, useEffect } from "react"
import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Link,
  MessageSquare,
  Phone,
  Search,
  Send,
  Settings,
  Zap,
  Circle,
} from "lucide-react"

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, active: false },
  { label: "Conversas", icon: MessageSquare, active: true },
  { label: "Agentes", icon: Zap, active: false },
  { label: "WhatsApp", icon: Phone, active: false },
  { label: "Webhooks", icon: Link, active: false },
  { label: "Configurações", icon: Settings, active: false },
]

const agentBadgeStyles: Record<string, string> = {
  "Qualif.": "bg-[rgba(252,230,192,0.15)] text-[#fce6c0]",
  "Recup.": "bg-[rgba(245,158,11,0.15)] text-[#f59e0b]",
  "Pós-v.": "bg-[rgba(96,165,250,0.15)] text-[#60a5fa]",
  "Suporte": "bg-[rgba(248,113,113,0.15)] text-[#f87171]",
}

const conversations = [
  {
    id: 1,
    name: "Maria Aparecida",
    initials: "MA",
    phone: "+55 (11) 98765-4321",
    badge: "Qualif.",
    lastMessage: "Quero saber o valor do plano premium e integração.",
    time: "há 2 min",
    unread: 2,
    messages: [
      { id: 1, from: "user", text: "Olá! Vi o anúncio de vocês e fiquei interessada.", time: "14:30" },
      { id: 2, from: "agent", text: "Olá Maria! Sou a Aria, consultora da AgentsHub. O que posso fazer por você?", time: "14:31" },
      { id: 3, from: "user", text: "Quero saber o valor do plano premium e integração.", time: "14:32" },
      { id: 4, from: "agent", text: "Nosso plano Pro é R$197/mês com até 2.000 mensagens e 4 agentes ativos. Posso te enviar mais detalhes?", time: "14:32" },
      { id: 5, from: "user", text: "Sim, me manda mais informações sobre a integração.", time: "14:35" },
    ],
  },
  {
    id: 2,
    name: "João Roberto",
    initials: "JR",
    phone: "+55 (21) 99123-4567",
    badge: "Recup.",
    lastMessage: "Tem alguma condição para recuperar o carrinho?",
    time: "há 8 min",
    unread: 0,
    messages: [
      { id: 1, from: "agent", text: "Oi João! Vi que você deixou alguns itens no carrinho. Posso te ajudar?", time: "14:25" },
      { id: 2, from: "user", text: "Tem alguma condição para recuperar o carrinho?", time: "14:27" },
      { id: 3, from: "agent", text: "Sim! Cupom especial de 10%: VOLTA10. Válido por 2 horas!", time: "14:27" },
    ],
  },
  {
    id: 3,
    name: "Carla Silva",
    initials: "CS",
    phone: "+55 (31) 97654-3210",
    badge: "Pós-v.",
    lastMessage: "Obrigada, pode seguir com a atualização do pedido.",
    time: "há 18 min",
    unread: 0,
    messages: [
      { id: 1, from: "user", text: "Quero saber o status do meu pedido #4521.", time: "14:10" },
      { id: 2, from: "agent", text: "Seu pedido #4521 está em separação e será despachado hoje!", time: "14:11" },
      { id: 3, from: "user", text: "Obrigada, pode seguir com a atualização do pedido.", time: "14:20" },
    ],
  },
  {
    id: 4,
    name: "Pedro Lima",
    initials: "PL",
    phone: "+55 (85) 98888-1111",
    badge: "Suporte",
    lastMessage: "Preciso de ajuda com o status do envio agora.",
    time: "há 32 min",
    unread: 1,
    messages: [
      { id: 1, from: "user", text: "Meu produto chegou com defeito.", time: "14:00" },
      { id: 2, from: "agent", text: "Lamento pelo transtorno. Pode me descrever o defeito?", time: "14:01" },
      { id: 3, from: "user", text: "Preciso de ajuda com o status do envio agora.", time: "14:06" },
    ],
  },
]

const filterOptions = ["Todos", "Qualif.", "Pós-v.", "Suporte", "Recup."]

export default function ConversasPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [selectedConv, setSelectedConv] = useState(conversations[0])
  const [search, setSearch] = useState("")
  const [activeFilter, setActiveFilter] = useState("Todos")
  const [newMessage, setNewMessage] = useState("")
  const [messages, setMessages] = useState<Record<number, { id: number; from: string; text: string; time: string }[]>>(
    Object.fromEntries(conversations.map((c) => [c.id, c.messages]))
  )
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [selectedConv, messages])

  const filteredConvs = conversations.filter((c) => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.phone.includes(search)
    const matchFilter = activeFilter === "Todos" || c.badge === activeFilter
    return matchSearch && matchFilter
  })

  const handleSend = () => {
    if (!newMessage.trim()) return
    const now = new Date()
    const time = `${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")}`
    setMessages((prev) => ({
      ...prev,
      [selectedConv.id]: [...(prev[selectedConv.id] || []), { id: Date.now(), from: "agent", text: newMessage.trim(), time }],
    }))
    setNewMessage("")
  }

  const currentMessages = messages[selectedConv.id] || []

  return (
    <div className="flex h-screen bg-black text-white overflow-hidden">
      <aside className={`flex flex-col bg-[rgba(0,0,0,0.95)] border-r border-[rgba(252,230,192,0.10)] transition-all duration-300 ${sidebarOpen ? "w-[220px]" : "w-[64px]"}`}>
        <div className="flex items-center justify-between px-4 py-5">
          <div className={`text-lg font-semibold bg-gradient-to-r from-[#fce6c0] to-[#d0aa74] bg-clip-text text-transparent transition-all duration-300 ${sidebarOpen ? "opacity-100" : "opacity-0 w-0 overflow-hidden"}`}>
            AgentsHub
          </div>
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
          <button onClick={() => setSidebarOpen((prev) => !prev)} className="w-full flex items-center justify-center h-10 rounded-lg border border-[rgba(252,230,192,0.12)] bg-[rgba(252,230,192,0.04)] hover:bg-[rgba(252,230,192,0.08)] transition-colors">
            {sidebarOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-14 bg-[rgba(0,0,0,0.95)] border-b border-[rgba(252,230,192,0.12)] flex items-center justify-between px-6 shrink-0">
          <div className="text-sm text-[#9ca3af]">Conversas</div>
          <div className="w-9 h-9 rounded-full bg-gradient-to-r from-[#fce6c0] to-[#d0aa74] flex items-center justify-center text-black text-sm font-semibold">RB</div>
        </header>

        <div className="flex-1 flex overflow-hidden">
          <div className="w-[320px] shrink-0 border-r border-[rgba(252,230,192,0.10)] flex flex-col bg-[rgba(0,0,0,0.6)]">
            <div className="p-3 border-b border-[rgba(252,230,192,0.08)]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6b7280]" />
                <input type="text" placeholder="Buscar conversa..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full bg-[rgba(252,230,192,0.05)] border border-[rgba(252,230,192,0.10)] rounded-lg pl-9 pr-3 py-2 text-sm text-white placeholder-[#6b7280] focus:outline-none focus:border-[rgba(252,230,192,0.3)] transition-colors" />
              </div>
            </div>
            <div className="px-3 py-2 flex gap-2 overflow-x-auto border-b border-[rgba(252,230,192,0.08)]">
              {filterOptions.map((f) => (
                <button key={f} onClick={() => setActiveFilter(f)} className={`shrink-0 px-3 py-1 rounded-full text-xs font-medium transition-colors ${activeFilter === f ? "bg-gradient-to-r from-[#fce6c0] to-[#d0aa74] text-black" : "bg-[rgba(252,230,192,0.06)] text-[#9ca3af] hover:bg-[rgba(252,230,192,0.12)] hover:text-white"}`}>{f}</button>
              ))}
            </div>
            <div className="flex-1 overflow-y-auto">
              {filteredConvs.map((conv) => (
                <button key={conv.id} onClick={() => setSelectedConv(conv)} className={`w-full text-left px-4 py-3 border-b border-[rgba(252,230,192,0.06)] transition-colors hover:bg-[rgba(252,230,192,0.04)] ${selectedConv.id === conv.id ? "bg-[rgba(252,230,192,0.07)]" : ""}`}>
                  <div className="flex items-start gap-3">
                    <div className="relative shrink-0">
                      <div className="w-10 h-10 rounded-lg bg-[rgba(252,230,192,0.1)] border border-[rgba(252,230,192,0.15)] flex items-center justify-center text-[#fce6c0] text-sm font-semibold">{conv.initials}</div>
                      <span className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-[#50c878] border-2 border-black" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-medium truncate">{conv.name}</span>
                        <span className="text-xs text-[#6b7280] shrink-0">{conv.time}</span>
                      </div>
                      <div className="flex items-center justify-between gap-2 mt-0.5">
                        <span className="text-xs text-[#6b7280] truncate">{conv.lastMessage}</span>
                        <div className="flex items-center gap-1 shrink-0">
                          <span className={`text-xs px-2 py-0.5 rounded-full ${agentBadgeStyles[conv.badge]}`}>{conv.badge}</span>
                          {conv.unread > 0 && <span className="w-5 h-5 rounded-full bg-gradient-to-r from-[#fce6c0] to-[#d0aa74] text-black text-xs font-bold flex items-center justify-center">{conv.unread}</span>}
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="h-16 shrink-0 border-b border-[rgba(252,230,192,0.10)] px-6 flex items-center justify-between bg-[rgba(0,0,0,0.4)]">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-lg bg-[rgba(252,230,192,0.1)] border border-[rgba(252,230,192,0.15)] flex items-center justify-center text-[#fce6c0] text-sm font-semibold">{selectedConv.initials}</div>
                  <span className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-[#50c878] border-2 border-black" />
                </div>
                <div>
                  <div className="text-sm font-semibold">{selectedConv.name}</div>
                  <div className="text-xs text-[#6b7280]">{selectedConv.phone}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-xs px-3 py-1 rounded-full ${agentBadgeStyles[selectedConv.badge]}`}>Agente: {selectedConv.badge}</span>
                <div className="flex items-center gap-1.5 text-xs text-[#50c878]">
                  <Circle className="h-2 w-2 fill-[#50c878]" />
                  Online
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
              {currentMessages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.from === "agent" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[65%] rounded-2xl px-4 py-2.5 text-sm ${msg.from === "agent" ? "bg-gradient-to-r from-[#fce6c0] to-[#d0aa74] text-black rounded-br-sm" : "bg-[#111009] border border-[rgba(252,230,192,0.12)] text-white rounded-bl-sm"}`}>
                    <p className="leading-relaxed">{msg.text}</p>
                    <p className={`text-xs mt-1 ${msg.from === "agent" ? "text-black/50" : "text-[#6b7280]"}`}>{msg.time}</p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="shrink-0 border-t border-[rgba(252,230,192,0.10)] px-4 py-3 bg-[rgba(0,0,0,0.4)]">
              <div className="flex items-center gap-3">
                <input type="text" placeholder="Digite uma mensagem..." value={newMessage} onChange={(e) => setNewMessage(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSend()} className="flex-1 bg-[rgba(252,230,192,0.05)] border border-[rgba(252,230,192,0.12)] rounded-xl px-4 py-3 text-sm text-white placeholder-[#6b7280] focus:outline-none focus:border-[rgba(252,230,192,0.3)] transition-colors" />
                <button onClick={handleSend} className="h-11 w-11 rounded-xl bg-gradient-to-r from-[#fce6c0] to-[#d0aa74] flex items-center justify-center text-black hover:opacity-90 transition-opacity shrink-0">
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
