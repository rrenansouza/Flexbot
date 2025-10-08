import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Search, Filter, X, Calendar, User, Tag, FileText } from "lucide-react";
import type { Ticket } from "@shared/schema";
import logoImage from "@assets/Gemini_Generated_Image_r1r30mr1r30mr1r3 1 (1)_1759432339653.png";

const DEVELOPERS = [
  "Alesson Garcia",
  "Joan Reis Santos",
  "Lucas Dewes",
  "Nicolas Souza",
  "William Santana",
  "Raildo",
  "Raylander da Silva Melo",
  "Vitoria Regina",
];

const getCategoriaColor = (categoria: string) => {
  switch (categoria) {
    case "Iniciativa": return "bg-purple-500 text-white";
    case "Chamado": return "bg-blue-500 text-white";
    case "Bug": return "bg-red-500 text-white";
    case "Melhoria": return "bg-green-500 text-white";
    default: return "bg-gray-500 text-white";
  }
};

export function CemiterioPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"id" | "finalizadoEm">("finalizadoEm");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [filters, setFilters] = useState({
    categoria: "",
    responsavel: "",
    solicitante: "",
    sistema: "",
  });

  const { data: archivedTickets = [], isLoading } = useQuery<Ticket[]>({
    queryKey: ["/api/tickets-archived"],
  });

  const filteredAndSortedTickets = useMemo(() => {
    let filtered = archivedTickets.filter(ticket => {
      const matchesSearch = 
        ticket.titulo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.ticketNumber.toString().includes(searchQuery);
      
      const matchesCategoria = !filters.categoria || filters.categoria === "Todas" || ticket.categoria === filters.categoria;
      const matchesResponsavel = !filters.responsavel || filters.responsavel === "Todos" || ticket.responsavel === filters.responsavel;
      const matchesSolicitante = !filters.solicitante || 
        `${ticket.solicitanteNome} ${ticket.solicitanteSobrenome}`.toLowerCase().includes(filters.solicitante.toLowerCase());
      const matchesSistema = !filters.sistema || filters.sistema === "Todos" || ticket.sistema === filters.sistema;

      return matchesSearch && matchesCategoria && matchesResponsavel && matchesSolicitante && matchesSistema;
    });

    filtered.sort((a, b) => {
      if (sortBy === "id") {
        return sortOrder === "asc" ? a.ticketNumber - b.ticketNumber : b.ticketNumber - a.ticketNumber;
      } else {
        const dateA = a.finalizadoEm ? new Date(a.finalizadoEm).getTime() : 0;
        const dateB = b.finalizadoEm ? new Date(b.finalizadoEm).getTime() : 0;
        return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
      }
    });

    return filtered;
  }, [archivedTickets, searchQuery, filters, sortBy, sortOrder]);

  const ticketsBySistema = useMemo(() => {
    const grouped = new Map<string, Ticket[]>();
    filteredAndSortedTickets.forEach(ticket => {
      if (!grouped.has(ticket.sistema)) {
        grouped.set(ticket.sistema, []);
      }
      grouped.get(ticket.sistema)!.push(ticket);
    });
    return Array.from(grouped.entries()).sort(([a], [b]) => a.localeCompare(b));
  }, [filteredAndSortedTickets]);

  const clearFilters = () => {
    setFilters({
      categoria: "",
      responsavel: "",
      solicitante: "",
      sistema: "",
    });
    setSearchQuery("");
  };

  const sistemas = useMemo(() => {
    const uniqueSistemas = new Set(archivedTickets.map(t => t.sistema));
    return Array.from(uniqueSistemas).sort();
  }, [archivedTickets]);

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
                data-testid="nav-chamados"
              >
                Chamados
              </motion.div>
            </Link>
          </nav>
        </div>
      </header>

      <div className="max-w-[1600px] mx-auto p-4 md:p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900" data-testid="text-titulo-cemiterio">Cemitério de Tickets</h1>
            <p className="text-gray-600 text-sm mt-1">Tickets finalizados e arquivados</p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Link href="/kanban">
              <Button variant="outline" data-testid="button-voltar-kanban">
                Voltar ao Kanban
              </Button>
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 mb-6 shadow-sm">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Buscar por título ou ID"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                    data-testid="input-busca-cemiterio"
                  />
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Select value={filters.categoria} onValueChange={(value) => setFilters(prev => ({ ...prev, categoria: value }))}>
                  <SelectTrigger className="w-[140px]" data-testid="select-categoria-cemiterio">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Todas">Todas</SelectItem>
                    <SelectItem value="Iniciativa">Iniciativa</SelectItem>
                    <SelectItem value="Chamado">Chamado</SelectItem>
                    <SelectItem value="Bug">Bug</SelectItem>
                    <SelectItem value="Melhoria">Melhoria</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filters.responsavel} onValueChange={(value) => setFilters(prev => ({ ...prev, responsavel: value }))}>
                  <SelectTrigger className="w-[160px]" data-testid="select-responsavel-cemiterio">
                    <SelectValue placeholder="Responsável" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Todos">Todos</SelectItem>
                    {DEVELOPERS.map(dev => <SelectItem key={dev} value={dev}>{dev}</SelectItem>)}
                  </SelectContent>
                </Select>

                <Select value={filters.sistema} onValueChange={(value) => setFilters(prev => ({ ...prev, sistema: value }))}>
                  <SelectTrigger className="w-[160px]" data-testid="select-sistema-cemiterio">
                    <SelectValue placeholder="Sistema" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Todos">Todos</SelectItem>
                    {sistemas.map(sistema => <SelectItem key={sistema} value={sistema}>{sistema}</SelectItem>)}
                  </SelectContent>
                </Select>

                <Input
                  placeholder="Solicitante"
                  value={filters.solicitante}
                  onChange={(e) => setFilters(prev => ({ ...prev, solicitante: e.target.value }))}
                  className="w-[160px]"
                  data-testid="input-solicitante-cemiterio"
                />

                <Button variant="outline" onClick={clearFilters} data-testid="button-limpar-filtros-cemiterio">
                  <X className="h-4 w-4 mr-2" />
                  Limpar
                </Button>
              </div>
            </div>

            <div className="flex gap-4 items-center">
              <span className="text-sm text-gray-600">Ordenar por:</span>
              <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                <SelectTrigger className="w-[160px]" data-testid="select-ordenar-cemiterio">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="finalizadoEm">Data Finalização</SelectItem>
                  <SelectItem value="id">ID</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortOrder} onValueChange={(value: any) => setSortOrder(value)}>
                <SelectTrigger className="w-[140px]" data-testid="select-ordem-cemiterio">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="desc">Decrescente</SelectItem>
                  <SelectItem value="asc">Crescente</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          </div>
        ) : filteredAndSortedTickets.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500" data-testid="text-vazio-cemiterio">Nenhum ticket arquivado encontrado</p>
          </div>
        ) : (
          <ScrollArea className="h-[calc(100vh-400px)]">
            <div className="space-y-6 pr-4">
              {ticketsBySistema.map(([sistema, tickets]) => (
                <div key={sistema} className="bg-white rounded-lg p-4 shadow-sm">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2" data-testid={`text-sistema-${sistema}`}>
                    <FileText className="h-5 w-5" />
                    {sistema}
                    <Badge variant="secondary">{tickets.length}</Badge>
                  </h2>
                  <Separator className="mb-4" />
                  <div className="space-y-3">
                    {tickets.map(ticket => (
                      <Card key={ticket.id} className="p-4" data-testid={`card-cemiterio-${ticket.id}`}>
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-sm font-mono text-gray-500" data-testid={`text-cemiterio-id-${ticket.id}`}>#{ticket.ticketNumber}</span>
                              <Badge className={`text-xs ${getCategoriaColor(ticket.categoria)}`}>{ticket.categoria}</Badge>
                            </div>
                            <h3 className="font-medium mb-2" data-testid={`text-cemiterio-titulo-${ticket.id}`}>{ticket.titulo}</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-gray-600">
                              <div className="flex items-center gap-1">
                                <User className="h-3 w-3" />
                                <span>{ticket.responsavel || "Não atribuído"}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Tag className="h-3 w-3" />
                                <span>{ticket.solicitanteNome} {ticket.solicitanteSobrenome}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                <span>Criado: {new Date(ticket.createdAt).toLocaleDateString()}</span>
                              </div>
                              {ticket.finalizadoEm && (
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  <span>Finalizado: {new Date(ticket.finalizadoEm).toLocaleDateString()}</span>
                                </div>
                              )}
                            </div>
                            {ticket.arquivadoEm && (
                              <div className="text-xs text-gray-500 mt-2">
                                Arquivado em: {new Date(ticket.arquivadoEm).toLocaleString()}
                              </div>
                            )}
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </div>
    </div>
  );
}
