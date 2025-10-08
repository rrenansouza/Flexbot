import { useState, useMemo } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { DndContext, DragEndEvent, DragOverlay, closestCorners, PointerSensor, useSensor, useSensors, DragStartEvent, useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Search, Filter, MoreVertical, UserPlus, MessageSquare, Clock, Paperclip, Plus, X } from "lucide-react";
import type { Ticket, TicketComment, TicketHistory } from "@shared/schema";
import logoImage from "@assets/Gemini_Generated_Image_r1r30mr1r30mr1r3 1 (1)_1759432339653.png";

const COLUMNS = [
  { id: "Chamados abertos", title: "Chamados abertos" },
  { id: "Em atendimento", title: "Em atendimento" },
  { id: "Aguardando publicação", title: "Aguardando publicação" },
  { id: "Finalizados", title: "Finalizados" },
];

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

const PRIORIDADES = ["Baixa", "Média", "Alta", "Urgente"];
const CRITICIDADES = ["C1", "C2", "C3", "C4"];

const getPrioridadeColor = (prioridade: string) => {
  switch (prioridade) {
    case "Baixa": return "bg-gray-500 text-white";
    case "Média": return "bg-blue-500 text-white";
    case "Alta": return "bg-orange-500 text-white";
    case "Urgente": return "bg-red-500 text-white";
    default: return "bg-gray-400 text-white";
  }
};

const getCriticidadeColor = (criticidade: string) => {
  switch (criticidade) {
    case "C1": return "bg-red-500 text-white";
    case "C2": return "bg-orange-500 text-white";
    case "C3": return "bg-yellow-500 text-black";
    case "C4": return "bg-green-500 text-white";
    default: return "bg-gray-400 text-white";
  }
};

const getInitials = (name: string) => {
  return name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase();
};

interface KanbanCardProps {
  ticket: Ticket;
  onCardClick: (ticket: Ticket) => void;
  onAssignClick: (ticket: Ticket) => void;
}

function SortableCard({ ticket, onCardClick, onAssignClick }: KanbanCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: ticket.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('[data-no-drag]')) {
      return;
    }
    onCardClick(ticket);
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} onClick={handleClick}>
      <KanbanCard ticket={ticket} onCardClick={() => {}} onAssignClick={onAssignClick} />
    </div>
  );
}

interface DroppableColumnProps {
  id: string;
  children: React.ReactNode;
}

function DroppableColumn({ id, children }: DroppableColumnProps) {
  const { setNodeRef } = useDroppable({ id });
  
  return (
    <div ref={setNodeRef} className="h-full">
      {children}
    </div>
  );
}

function KanbanCard({ ticket, onCardClick, onAssignClick }: KanbanCardProps) {
  const hasComments = false;
  const hasAttachments = ticket.evidencias && ticket.evidencias.length > 0;

  return (
    <Card 
      className="p-4 mb-3 bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => onCardClick(ticket)}
      data-testid={`card-ticket-${ticket.id}`}
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-medium text-sm line-clamp-1 flex-1" data-testid={`text-titulo-${ticket.id}`}>
          {ticket.titulo}
        </h3>
        <div data-no-drag>
          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
              <Button variant="ghost" size="icon" className="h-6 w-6" data-testid={`button-menu-${ticket.id}`}>
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onCardClick(ticket); }} data-testid={`menu-ver-${ticket.id}`}>
                Ver detalhado
              </DropdownMenuItem>
              <DropdownMenuItem data-testid={`menu-editar-${ticket.id}`}>Editar</DropdownMenuItem>
              <DropdownMenuItem data-testid={`menu-duplicar-${ticket.id}`}>Duplicar</DropdownMenuItem>
              <DropdownMenuItem className="text-red-600" data-testid={`menu-excluir-${ticket.id}`}>Excluir</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <p className="text-xs text-gray-600 mb-3" data-testid={`text-solicitante-${ticket.id}`}>
        {ticket.solicitanteNome} {ticket.solicitanteSobrenome}
      </p>

      <div className="flex flex-wrap gap-2 mb-3">
        <Badge className={getPrioridadeColor(ticket.prioridade)} data-testid={`badge-prioridade-${ticket.id}`}>
          {ticket.prioridade}
        </Badge>
        <Badge className={getCriticidadeColor(ticket.criticidade)} data-testid={`badge-criticidade-${ticket.id}`}>
          {ticket.criticidade}
        </Badge>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div data-no-drag>
            {ticket.responsavel ? (
              <Tooltip>
                <TooltipTrigger onClick={(e) => { e.stopPropagation(); onAssignClick(ticket); }}>
                  <Avatar className="h-6 w-6 cursor-pointer" data-testid={`avatar-responsavel-${ticket.id}`}>
                    <AvatarFallback className="text-xs bg-blue-100 text-blue-700">
                      {getInitials(ticket.responsavel)}
                    </AvatarFallback>
                  </Avatar>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{ticket.responsavel}</p>
                </TooltipContent>
              </Tooltip>
            ) : (
              <Tooltip>
                <TooltipTrigger onClick={(e) => { e.stopPropagation(); onAssignClick(ticket); }}>
                  <div className="h-6 w-6 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-gray-400" data-testid={`button-atribuir-${ticket.id}`}>
                    <UserPlus className="h-3 w-3 text-gray-400" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Atribuir responsável</p>
                </TooltipContent>
              </Tooltip>
            )}
          </div>

          <div className="flex gap-1">
            {hasComments && (
              <Tooltip>
                <TooltipTrigger>
                  <MessageSquare className="h-4 w-4 text-gray-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Tem comentários</p>
                </TooltipContent>
              </Tooltip>
            )}
            {hasAttachments && (
              <Tooltip>
                <TooltipTrigger>
                  <Paperclip className="h-4 w-4 text-gray-400" data-testid={`icon-anexo-${ticket.id}`} />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Tem anexos</p>
                </TooltipContent>
              </Tooltip>
            )}
          </div>
        </div>

        <Tooltip>
          <TooltipTrigger>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3 text-green-600" />
              <span className="text-xs text-green-600">No prazo</span>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Dentro do prazo</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </Card>
  );
}

export function KanbanPage() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [assigningTicket, setAssigningTicket] = useState<Ticket | null>(null);
  const [newComment, setNewComment] = useState("");
  const [filters, setFilters] = useState({
    categoria: "",
    prioridade: "",
    criticidade: "",
    solicitante: "",
    responsavel: "",
  });

  const { data: tickets = [], isLoading } = useQuery<Ticket[]>({
    queryKey: ["/api/tickets"],
  });

  const { data: comments = [] } = useQuery<TicketComment[]>({
    queryKey: selectedTicket ? [`/api/tickets/${selectedTicket.id}/comments`] : [],
    enabled: !!selectedTicket,
  });

  const { data: history = [] } = useQuery<TicketHistory[]>({
    queryKey: selectedTicket ? [`/api/tickets/${selectedTicket.id}/history`] : [],
    enabled: !!selectedTicket,
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const res = await apiRequest("PATCH", `/api/tickets/${id}/status`, { status, author: "Sistema" });
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tickets"] });
      toast({ title: "Status atualizado com sucesso!" });
    },
  });

  const updateResponsavelMutation = useMutation({
    mutationFn: async ({ id, responsavel }: { id: string; responsavel: string | null }) => {
      const res = await apiRequest("PATCH", `/api/tickets/${id}/assignee`, { responsavel, author: "Sistema" });
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tickets"] });
      setShowAssignModal(false);
      setAssigningTicket(null);
      toast({ title: "Responsável atribuído com sucesso!" });
    },
  });

  const addCommentMutation = useMutation({
    mutationFn: async ({ ticketId, content, author }: { ticketId: string; content: string; author: string }) => {
      const res = await apiRequest("POST", `/api/tickets/${ticketId}/comments`, { content, author });
      return await res.json();
    },
    onSuccess: () => {
      if (selectedTicket) {
        queryClient.invalidateQueries({ queryKey: [`/api/tickets/${selectedTicket.id}/comments`] });
        queryClient.invalidateQueries({ queryKey: [`/api/tickets/${selectedTicket.id}/history`] });
      }
      setNewComment("");
      toast({ title: "Comentário adicionado!" });
    },
  });

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const filteredTickets = useMemo(() => {
    return tickets.filter(ticket => {
      const matchesSearch = 
        ticket.titulo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.id.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategoria = !filters.categoria || ticket.categoria === filters.categoria;
      const matchesPrioridade = !filters.prioridade || ticket.prioridade === filters.prioridade;
      const matchesCriticidade = !filters.criticidade || ticket.criticidade === filters.criticidade;
      const matchesSolicitante = !filters.solicitante || 
        `${ticket.solicitanteNome} ${ticket.solicitanteSobrenome}`.toLowerCase().includes(filters.solicitante.toLowerCase());
      const matchesResponsavel = !filters.responsavel || ticket.responsavel === filters.responsavel;

      return matchesSearch && matchesCategoria && matchesPrioridade && matchesCriticidade && matchesSolicitante && matchesResponsavel;
    });
  }, [tickets, searchQuery, filters]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) return;

    const ticketId = active.id as string;
    let newStatus = over.id as string;

    if (!COLUMNS.find(c => c.id === newStatus)) {
      const targetTicket = tickets.find(t => t.id === newStatus);
      if (targetTicket) {
        newStatus = targetTicket.status;
      } else {
        return;
      }
    }

    const ticket = tickets.find(t => t.id === ticketId);
    if (ticket && ticket.status !== newStatus) {
      updateStatusMutation.mutate({ id: ticketId, status: newStatus });
    }
  };

  const handleCardClick = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setShowDetailModal(true);
  };

  const handleAssignClick = (ticket: Ticket) => {
    setAssigningTicket(ticket);
    setShowAssignModal(true);
  };

  const handleAssign = (developer: string) => {
    if (assigningTicket) {
      updateResponsavelMutation.mutate({ id: assigningTicket.id, responsavel: developer });
    }
  };

  const handleAddComment = () => {
    if (selectedTicket && newComment.trim()) {
      addCommentMutation.mutate({
        ticketId: selectedTicket.id,
        content: newComment,
        author: "Sistema",
      });
    }
  };

  const clearFilters = () => {
    setFilters({
      categoria: "",
      prioridade: "",
      criticidade: "",
      solicitante: "",
      responsavel: "",
    });
    setSearchQuery("");
  };

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
          </nav>
        </div>
      </header>

      <div className="max-w-[1600px] mx-auto p-4 md:p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-900" data-testid="text-titulo-kanban">Gerenciador de Tickets</h1>
          
          <div className="flex flex-wrap gap-2">
            <Link href="/melhoria/ticket">
              <Button className="bg-[#f4a61f] hover:bg-[#d89419] text-black" data-testid="button-novo-chamado">
                <Plus className="h-4 w-4 mr-2" />
                Novo chamado
              </Button>
            </Link>
            <Button variant="outline" data-testid="button-exportar">Exportar CSV</Button>
            <Button variant="outline" onClick={() => queryClient.invalidateQueries({ queryKey: ["/api/tickets"] })} data-testid="button-atualizar">
              Atualizar
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 mb-6 shadow-sm">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar por título ou ID"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                  data-testid="input-busca"
                />
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Select value={filters.prioridade} onValueChange={(value) => setFilters(prev => ({ ...prev, prioridade: value }))}>
                <SelectTrigger className="w-[140px]" data-testid="select-prioridade">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Prioridade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value=" ">Todas</SelectItem>
                  {PRIORIDADES.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                </SelectContent>
              </Select>

              <Select value={filters.criticidade} onValueChange={(value) => setFilters(prev => ({ ...prev, criticidade: value }))}>
                <SelectTrigger className="w-[140px]" data-testid="select-criticidade">
                  <SelectValue placeholder="Criticidade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value=" ">Todas</SelectItem>
                  {CRITICIDADES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>

              <Select value={filters.responsavel} onValueChange={(value) => setFilters(prev => ({ ...prev, responsavel: value }))}>
                <SelectTrigger className="w-[160px]" data-testid="select-responsavel">
                  <SelectValue placeholder="Responsável" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value=" ">Todos</SelectItem>
                  {DEVELOPERS.map(dev => <SelectItem key={dev} value={dev}>{dev}</SelectItem>)}
                </SelectContent>
              </Select>

              <Button variant="outline" onClick={clearFilters} data-testid="button-limpar-filtros">
                <X className="h-4 w-4 mr-2" />
                Limpar
              </Button>
            </div>
          </div>
        </div>

        <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {COLUMNS.map(column => {
              const columnTickets = filteredTickets.filter(t => t.status === column.id);
              
              return (
                <DroppableColumn key={column.id} id={column.id}>
                  <div className="bg-gray-100 rounded-lg p-4 h-full" data-testid={`coluna-${column.id}`}>
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="font-semibold text-gray-900" data-testid={`text-coluna-${column.id}`}>{column.title}</h2>
                      <Badge variant="secondary" data-testid={`badge-count-${column.id}`}>{columnTickets.length}</Badge>
                    </div>
                    
                    <SortableContext items={columnTickets.map(t => t.id)} strategy={verticalListSortingStrategy}>
                      <ScrollArea className="h-[calc(100vh-400px)]">
                        {isLoading ? (
                          <div className="flex items-center justify-center py-8">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                          </div>
                        ) : columnTickets.length === 0 ? (
                          <p className="text-center text-gray-500 py-8" data-testid={`text-vazio-${column.id}`}>Nenhum ticket</p>
                        ) : (
                          columnTickets.map(ticket => (
                            <SortableCard 
                              key={ticket.id}
                              ticket={ticket} 
                              onCardClick={handleCardClick}
                              onAssignClick={handleAssignClick}
                            />
                          ))
                        )}
                      </ScrollArea>
                    </SortableContext>
                  </div>
                </DroppableColumn>
              );
            })}
          </div>
        </DndContext>
      </div>

      <Dialog open={showDetailModal} onOpenChange={setShowDetailModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col" data-testid="modal-detalhes">
          {selectedTicket && (
            <>
              <DialogHeader>
                <DialogTitle data-testid="text-modal-titulo">{selectedTicket.titulo}</DialogTitle>
              </DialogHeader>
              
              <ScrollArea className="flex-1 pr-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Categoria</label>
                      <p className="text-sm text-gray-900" data-testid="text-modal-categoria">{selectedTicket.categoria}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Sistema</label>
                      <p className="text-sm text-gray-900" data-testid="text-modal-sistema">{selectedTicket.sistema}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Solicitante</label>
                      <p className="text-sm text-gray-900" data-testid="text-modal-solicitante">{selectedTicket.solicitanteNome} {selectedTicket.solicitanteSobrenome}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Responsável</label>
                      <p className="text-sm text-gray-900" data-testid="text-modal-responsavel">{selectedTicket.responsavel || "Não atribuído"}</p>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">Descrição do problema</label>
                    <p className="text-sm text-gray-900 whitespace-pre-wrap" data-testid="text-modal-descricao">{selectedTicket.problemaDescricao}</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">O que não consegue fazer</label>
                    <p className="text-sm text-gray-900" data-testid="text-modal-nao-consegue">{selectedTicket.naoConsegue}</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">Como replicar</label>
                    <p className="text-sm text-gray-900" data-testid="text-modal-replicacao">{selectedTicket.replicacao}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Frequência</label>
                      <p className="text-sm text-gray-900" data-testid="text-modal-frequencia">{selectedTicket.frequencia}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Impedimento</label>
                      <p className="text-sm text-gray-900" data-testid="text-modal-impedimento">{selectedTicket.impedimento}</p>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-medium text-gray-900 mb-3" data-testid="text-historico">Histórico</h3>
                    <div className="space-y-2">
                      {history.length === 0 ? (
                        <p className="text-sm text-gray-500">Nenhum histórico disponível</p>
                      ) : (
                        history.map(h => (
                          <div key={h.id} className="text-sm" data-testid={`historico-${h.id}`}>
                            <span className="font-medium">{h.author}</span> {h.action} 
                            {h.field && ` - ${h.field}: ${h.oldValue} → ${h.newValue}`}
                            <span className="text-gray-500 ml-2">{new Date(h.createdAt).toLocaleString()}</span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-medium text-gray-900 mb-3" data-testid="text-comentarios">Comentários</h3>
                    <div className="space-y-3 mb-4">
                      {comments.length === 0 ? (
                        <p className="text-sm text-gray-500">Nenhum comentário ainda</p>
                      ) : (
                        comments.map(comment => (
                          <div key={comment.id} className="bg-gray-50 rounded-lg p-3" data-testid={`comentario-${comment.id}`}>
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-medium text-sm">{comment.author}</span>
                              <span className="text-xs text-gray-500">{new Date(comment.createdAt).toLocaleString()}</span>
                            </div>
                            <p className="text-sm text-gray-700">{comment.content}</p>
                          </div>
                        ))
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Textarea
                        placeholder="Adicionar comentário..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="flex-1"
                        data-testid="input-comentario"
                      />
                      <Button 
                        onClick={handleAddComment} 
                        disabled={!newComment.trim() || addCommentMutation.isPending}
                        data-testid="button-adicionar-comentario"
                      >
                        Enviar
                      </Button>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={showAssignModal} onOpenChange={setShowAssignModal}>
        <DialogContent data-testid="modal-atribuir">
          <DialogHeader>
            <DialogTitle>Atribuir Responsável</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            {assigningTicket && assigningTicket.responsavel && (
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => handleAssign(assigningTicket.responsavel!)}
                data-testid="button-atribuir-para-mim"
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Atribuir para mim ({assigningTicket.responsavel})
              </Button>
            )}
            <Separator />
            <p className="text-sm font-medium text-gray-700">Selecionar desenvolvedor:</p>
            {DEVELOPERS.map(dev => (
              <Button
                key={dev}
                variant="ghost"
                className="w-full justify-start"
                onClick={() => handleAssign(dev)}
                data-testid={`button-dev-${dev}`}
              >
                <Avatar className="h-6 w-6 mr-2">
                  <AvatarFallback className="text-xs bg-blue-100 text-blue-700">
                    {getInitials(dev)}
                  </AvatarFallback>
                </Avatar>
                {dev}
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
