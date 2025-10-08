import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Ticket } from "@shared/schema";
import logoImage from "@assets/Gemini_Generated_Image_r1r30mr1r30mr1r3 1 (1)_1759432339653.png";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];
const CATEGORIAS = ["Melhoria", "Bug", "Projeto", "Chamado"];

export function GraficosPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("Todas");
  const [selectedMonth, setSelectedMonth] = useState<string>("todos");

  const { data: tickets = [] } = useQuery<Ticket[]>({
    queryKey: ["/api/tickets"],
  });

  const filteredTickets = useMemo(() => {
    let filtered = tickets;
    
    if (selectedCategory !== "Todas") {
      filtered = filtered.filter(t => t.categoria === selectedCategory);
    }
    
    if (selectedMonth !== "todos") {
      filtered = filtered.filter(t => {
        const ticketMonth = new Date(t.createdAt).toLocaleString('pt-BR', { month: 'long', year: 'numeric' });
        return ticketMonth === selectedMonth;
      });
    }
    
    return filtered;
  }, [tickets, selectedCategory, selectedMonth]);

  const ticketsPorMes = useMemo(() => {
    const monthCount: Record<string, number> = {};
    filteredTickets.forEach(ticket => {
      const month = new Date(ticket.createdAt).toLocaleString('pt-BR', { month: 'long', year: 'numeric' });
      monthCount[month] = (monthCount[month] || 0) + 1;
    });
    return Object.entries(monthCount).map(([name, value]) => ({ name, value }));
  }, [filteredTickets]);

  const ticketsPorColaborador = useMemo(() => {
    const devCount: Record<string, number> = {};
    filteredTickets
      .filter(t => t.responsavel && t.status === "Finalizados")
      .forEach(ticket => {
        if (ticket.responsavel) {
          devCount[ticket.responsavel] = (devCount[ticket.responsavel] || 0) + 1;
        }
      });
    return Object.entries(devCount)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [filteredTickets]);

  const ticketsPorCategoria = useMemo(() => {
    const catCount: Record<string, number> = {};
    tickets.forEach(ticket => {
      catCount[ticket.categoria] = (catCount[ticket.categoria] || 0) + 1;
    });
    return Object.entries(catCount).map(([name, value]) => ({ name, value }));
  }, [tickets]);

  const colaboradorMaisTickets = useMemo(() => {
    if (ticketsPorColaborador.length === 0) return null;
    return ticketsPorColaborador[0];
  }, [ticketsPorColaborador]);

  const availableMonths = useMemo(() => {
    const months = new Set<string>();
    tickets.forEach(ticket => {
      const month = new Date(ticket.createdAt).toLocaleString('pt-BR', { month: 'long', year: 'numeric' });
      months.add(month);
    });
    return Array.from(months).sort();
  }, [tickets]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-[#9e090f] w-full py-6 px-4 md:px-8 lg:px-16 pt-[10px] pb-[10px]">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <Link href="/">
            <img
              src={logoImage}
              alt="redeFlex"
              className="h-8 md:h-10 w-auto cursor-pointer"
              data-testid="logo-redeflex"
            />
          </Link>
          <nav className="flex flex-wrap gap-6 md:gap-8 lg:gap-12 justify-center">
            <Link href="/">
              <motion.div
                className="font-semibold text-white text-base md:text-lg cursor-pointer"
                whileHover={{ opacity: 0.8, scale: 1.05 }}
                transition={{ duration: 0.2 }}
                data-testid="nav-home"
              >
                Home
              </motion.div>
            </Link>
            <Link href="/kanban">
              <motion.div
                className="font-semibold text-white text-base md:text-lg cursor-pointer"
                whileHover={{ opacity: 0.8, scale: 1.05 }}
                transition={{ duration: 0.2 }}
                data-testid="nav-kanban"
              >
                Kanban
              </motion.div>
            </Link>
          </nav>
        </div>
      </header>

      <div className="max-w-[1600px] mx-auto p-4 md:p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6" data-testid="text-titulo-graficos">
          Análise de Tickets
        </h1>

        <div className="flex flex-wrap gap-4 mb-6">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[200px]" data-testid="select-categoria">
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Todas">Todas as categorias</SelectItem>
              {CATEGORIAS.map(cat => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger className="w-[200px]" data-testid="select-mes">
              <SelectValue placeholder="Mês" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos os meses</SelectItem>
              {availableMonths.map(month => (
                <SelectItem key={month} value={month}>{month}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Tabs defaultValue="mes" className="space-y-4">
          <TabsList data-testid="tabs-graficos">
            <TabsTrigger value="mes" data-testid="tab-mes">Por Mês</TabsTrigger>
            <TabsTrigger value="colaborador" data-testid="tab-colaborador">Por Colaborador</TabsTrigger>
            <TabsTrigger value="categoria" data-testid="tab-categoria">Por Categoria</TabsTrigger>
            <TabsTrigger value="top" data-testid="tab-top">Top Colaborador</TabsTrigger>
          </TabsList>

          <TabsContent value="mes" className="space-y-4">
            <Card data-testid="card-tickets-mes">
              <CardHeader>
                <CardTitle>Tickets Atendidos por Mês</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={ticketsPorMes}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" name="Tickets" fill="#9e090f" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="colaborador" className="space-y-4">
            <Card data-testid="card-tickets-colaborador">
              <CardHeader>
                <CardTitle>Tickets Atendidos por Colaborador</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={ticketsPorColaborador}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" name="Tickets Finalizados" fill="#f4a61f" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="categoria" className="space-y-4">
            <Card data-testid="card-tickets-categoria">
              <CardHeader>
                <CardTitle>Tickets Abertos por Categoria</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <PieChart>
                    <Pie
                      data={ticketsPorCategoria}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={150}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {ticketsPorCategoria.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="top" className="space-y-4">
            <Card data-testid="card-top-colaborador">
              <CardHeader>
                <CardTitle>Colaborador com Mais Chamados Atendidos no Mês</CardTitle>
              </CardHeader>
              <CardContent>
                {colaboradorMaisTickets ? (
                  <div className="text-center py-8">
                    <div className="text-6xl font-bold text-[#9e090f] mb-4" data-testid="text-top-valor">
                      {colaboradorMaisTickets.value}
                    </div>
                    <div className="text-2xl text-gray-700" data-testid="text-top-nome">
                      {colaboradorMaisTickets.name}
                    </div>
                    <p className="text-gray-500 mt-2">tickets finalizados</p>
                  </div>
                ) : (
                  <p className="text-center py-8 text-gray-500">Nenhum dado disponível</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
