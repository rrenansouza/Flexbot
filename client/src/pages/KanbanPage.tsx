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
import { Search, Filter, MoreVertical, UserPlus, MessageSquare, Clock, Paperclip, Plus, X, Share2, Eye, Tag, BarChart3, Download, Trash2, Lightbulb, FileText, File, Image as ImageIcon } from "lucide-react";
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

const getCategoriaColor = (categoria: string) => {
  switch (categoria) {
    case "Iniciativa": return "bg-purple-500 text-white";
    case "Chamado": return "bg-blue-500 text-white";
    case "Bug": return "bg-red-500 text-white";
    case "Melhoria": return "bg-green-500 text-white";
    default: return "bg-gray-500 text-white";
  }
};

const getInitials = (name: string) => {
  return name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase();
};

const getDeveloperColor = (name: string) => {
  const colors = [
    { bg: "bg-blue-500", text: "text-white" },
    { bg: "bg-green-500", text: "text-white" },
    { bg: "bg-purple-500", text: "text-white" },
    { bg: "bg-pink-500", text: "text-white" },
    { bg: "bg-indigo-500", text: "text-white" },
    { bg: "bg-teal-500", text: "text-white" },
    { bg: "bg-orange-500", text: "text-white" },
    { bg: "bg-cyan-500", text: "text-white" },
  ];
  
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % colors.length;
  return colors[index];
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
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <p className="text-xs text-gray-500" data-testid={`text-id-${ticket.id}`}>#{ticket.ticketNumber}</p>
            <Badge className={`text-xs px-2 py-0 ${getCategoriaColor(ticket.categoria)}`} data-testid={`badge-categoria-${ticket.id}`}>
              {ticket.categoria}
            </Badge>
          </div>
          <h3 className="font-medium text-sm line-clamp-1" data-testid={`text-titulo-${ticket.id}`}>
            {ticket.titulo}
          </h3>
        </div>
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

      {ticket.etiquetas && ticket.etiquetas.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-2">
          {ticket.etiquetas.map((etiqueta, idx) => (
            <Badge key={idx} variant="outline" className="text-xs" data-testid={`badge-etiqueta-${idx}`}>
              {etiqueta}
            </Badge>
          ))}
        </div>
      )}

      <div className="flex flex-wrap gap-2 mb-3">
        <Badge className={getPrioridadeColor(ticket.prioridade)} data-testid={`badge-prioridade-${ticket.id}`}>
          {ticket.prioridade}
        </Badge>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div data-no-drag>
            {ticket.responsavel ? (
              <Tooltip>
                <TooltipTrigger onClick={(e) => { e.stopPropagation(); onAssignClick(ticket); }}>
                  <Avatar className="h-6 w-6 cursor-pointer" data-testid={`avatar-responsavel-${ticket.id}`}>
                    <AvatarFallback className={`text-xs ${getDeveloperColor(ticket.responsavel).bg} ${getDeveloperColor(ticket.responsavel).text}`}>
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
  const [previewAnexo, setPreviewAnexo] = useState<{ url: string; nome: string; tipo: string } | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [assigningTicket, setAssigningTicket] = useState<Ticket | null>(null);
  const [newComment, setNewComment] = useState("");
  const [newEtiqueta, setNewEtiqueta] = useState("");
  const [showEtiquetaInput, setShowEtiquetaInput] = useState(false);
  const [isSeguindo, setIsSeguindo] = useState(false);
  const [filters, setFilters] = useState({
    categoria: "",
    prioridade: "",
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

  const addEtiquetaMutation = useMutation({
    mutationFn: async ({ ticketId, etiqueta }: { ticketId: string; etiqueta: string }) => {
      const res = await apiRequest("POST", `/api/tickets/${ticketId}/etiquetas`, { etiqueta, author: "Sistema" });
      return await res.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["/api/tickets"] });
      setSelectedTicket(data);
      setNewEtiqueta("");
      setShowEtiquetaInput(false);
      toast({ title: "Etiqueta adicionada!" });
    },
  });

  const removeEtiquetaMutation = useMutation({
    mutationFn: async ({ ticketId, etiqueta }: { ticketId: string; etiqueta: string }) => {
      const res = await apiRequest("DELETE", `/api/tickets/${ticketId}/etiquetas/${etiqueta}`, { author: "Sistema" });
      return await res.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["/api/tickets"] });
      setSelectedTicket(data);
      toast({ title: "Etiqueta removida!" });
    },
  });

  const toggleSeguirMutation = useMutation({
    mutationFn: async ({ ticketId, seguir }: { ticketId: string; seguir: boolean }) => {
      if (seguir) {
        const res = await apiRequest("POST", `/api/tickets/${ticketId}/seguir`, { seguidor: "Usuário Atual", author: "Sistema" });
        return await res.json();
      } else {
        const res = await apiRequest("DELETE", `/api/tickets/${ticketId}/seguir/Usuário Atual`, { author: "Sistema" });
        return await res.json();
      }
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["/api/tickets"] });
      setSelectedTicket(data);
      setIsSeguindo(variables.seguir);
      toast({ title: variables.seguir ? "Agora você está seguindo este ticket!" : "Você deixou de seguir este ticket" });
    },
  });

  const updateEvidenciasMutation = useMutation({
    mutationFn: async ({ ticketId, evidencias }: { ticketId: string; evidencias: string[] }) => {
      const res = await apiRequest("PATCH", `/api/tickets/${ticketId}/evidencias`, { evidencias, author: "Sistema" });
      return await res.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["/api/tickets"] });
      queryClient.invalidateQueries({ queryKey: [`/api/tickets/${data.id}/history`] });
      setSelectedTicket(data);
      toast({ title: "Anexo atualizado com sucesso!" });
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
        ticket.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.ticketNumber.toString().includes(searchQuery);
      
      const matchesCategoria = !filters.categoria || filters.categoria === "Todas" || ticket.categoria === filters.categoria;
      const matchesPrioridade = !filters.prioridade || filters.prioridade === "Todas" || ticket.prioridade === filters.prioridade;
      const matchesSolicitante = !filters.solicitante || 
        `${ticket.solicitanteNome} ${ticket.solicitanteSobrenome}`.toLowerCase().includes(filters.solicitante.toLowerCase());
      const matchesResponsavel = !filters.responsavel || filters.responsavel === "Todos" || ticket.responsavel === filters.responsavel;

      return matchesSearch && matchesCategoria && matchesPrioridade && matchesSolicitante && matchesResponsavel;
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

  const handleAddEtiqueta = () => {
    if (selectedTicket && newEtiqueta.trim()) {
      addEtiquetaMutation.mutate({
        ticketId: selectedTicket.id,
        etiqueta: newEtiqueta.trim(),
      });
    }
  };

  const handleRemoveEtiqueta = (etiqueta: string) => {
    if (selectedTicket) {
      removeEtiquetaMutation.mutate({
        ticketId: selectedTicket.id,
        etiqueta,
      });
    }
  };

  const handleToggleSeguir = () => {
    if (selectedTicket) {
      toggleSeguirMutation.mutate({
        ticketId: selectedTicket.id,
        seguir: !isSeguindo,
      });
    }
  };

  const handleShare = async () => {
    if (selectedTicket) {
      try {
        const res = await apiRequest("GET", `/api/tickets/${selectedTicket.id}/share`, {});
        const data = await res.json();
        navigator.clipboard.writeText(data.shareUrl);
        toast({ title: "Link copiado!", description: `Ticket #${data.ticketNumber} - Link copiado para a área de transferência` });
      } catch (error) {
        toast({ title: "Erro ao gerar link", variant: "destructive" });
      }
    }
  };

  const handleRemoveEvidencia = (index: number) => {
    if (selectedTicket && selectedTicket.evidencias) {
      const confirmed = window.confirm("Tem certeza que deseja excluir este anexo?");
      if (confirmed) {
        const newEvidencias = selectedTicket.evidencias.filter((_, i) => i !== index);
        updateEvidenciasMutation.mutate({
          ticketId: selectedTicket.id,
          evidencias: newEvidencias,
        });
      }
    }
  };

  const getFileExtension = (fileName: string) => {
    const parts = fileName.split('.');
    return parts.length > 1 ? parts[parts.length - 1].toLowerCase() : '';
  };

  const isImageFile = (fileName: string) => {
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg'];
    return imageExtensions.includes(getFileExtension(fileName));
  };

  const isPdfFile = (fileName: string) => {
    return getFileExtension(fileName) === 'pdf';
  };

  const getFileIcon = (fileName: string) => {
    if (isImageFile(fileName)) {
      return <ImageIcon className="h-8 w-8" />;
    } else if (isPdfFile(fileName)) {
      return <FileText className="h-8 w-8" />;
    } else {
      return <File className="h-8 w-8" />;
    }
  };

  const convertEvidenciasToAnexos = (evidencias: string[]) => {
    return evidencias.map(url => ({
      nome: url.split('/').pop() || url,
      tipo: getFileExtension(url),
      url: url,
      uploadedAt: "",
      uploadedBy: "",
      tamanho: undefined
    }));
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return null;
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const formatUploadDate = (date: string) => {
    try {
      return new Date(date).toLocaleDateString('pt-BR', { 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric' 
      });
    } catch {
      return date;
    }
  };

  const canPreview = (fileName: string) => {
    return isImageFile(fileName) || isPdfFile(fileName);
  };

  const handleAnexoClick = (fileName: string) => {
    if (canPreview(fileName)) {
      setPreviewAnexo({ url: fileName, nome: fileName, tipo: getFileExtension(fileName) });
    } else {
      handleDownloadEvidencia(fileName);
    }
  };

  const handleDownloadEvidencia = (fileName: string) => {
    const link = document.createElement('a');
    link.href = fileName;
    link.download = fileName.split('/').pop() || fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast({ title: "Download iniciado", description: fileName.split('/').pop() || fileName });
  };

  const clearFilters = () => {
    setFilters({
      categoria: "",
      prioridade: "",
      solicitante: "",
      responsavel: "",
    });
    setSearchQuery("");
  };

  const formatHistoryMessage = (h: TicketHistory) => {
    if (h.action === "status_changed") {
      return `${h.author} moveu o ticket de "${h.oldValue}" para "${h.newValue}"`;
    } else if (h.action === "assignee_changed") {
      if (!h.oldValue && h.newValue) {
        return `${h.author} atribuiu ${h.newValue} como responsável`;
      } else if (h.oldValue && !h.newValue) {
        return `${h.author} removeu ${h.oldValue} como responsável`;
      } else {
        return `${h.author} alterou o responsável de ${h.oldValue} para ${h.newValue}`;
      }
    } else if (h.action === "comment_added") {
      return `${h.author} adicionou um comentário`;
    } else {
      return `${h.author} ${h.action}${h.field ? ` - ${h.field}` : ""}`;
    }
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
            <Link href="/graficos">
              <Button variant="outline" data-testid="button-graficos">
                <BarChart3 className="h-4 w-4 mr-2" />
                Gráficos
              </Button>
            </Link>
            <Link href="/cemiterio">
              <Button variant="outline" data-testid="button-cemiterio">
                Cemitério
              </Button>
            </Link>
            <Button variant="outline" data-testid="button-exportar">
              <Download className="h-4 w-4 mr-2" />
              Exportar CSV
            </Button>
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
                  <SelectItem value="Todas">Todas</SelectItem>
                  {PRIORIDADES.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                </SelectContent>
              </Select>

              <Select value={filters.responsavel} onValueChange={(value) => setFilters(prev => ({ ...prev, responsavel: value }))}>
                <SelectTrigger className="w-[160px]" data-testid="select-responsavel">
                  <SelectValue placeholder="Responsável" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Todos">Todos</SelectItem>
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
        <DialogContent className="max-w-5xl max-h-[90vh] p-0 overflow-y-auto" data-testid="modal-detalhes">
          {selectedTicket && (
            <div className="flex flex-col">
              <div className="p-6 border-b">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <p className="text-sm text-gray-500 mb-1">#{selectedTicket.ticketNumber}</p>
                    <DialogTitle className="text-xl" data-testid="text-modal-titulo">{selectedTicket.titulo}</DialogTitle>
                    <p className="text-sm text-gray-600 mt-1">em {selectedTicket.status}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setShowAIModal(true)} 
                      className="border-yellow-500 text-yellow-600 hover:bg-yellow-50"
                      data-testid="button-sugestao-ia"
                    >
                      <Lightbulb className="h-4 w-4 mr-2" />
                      Sugestão IA
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleToggleSeguir} data-testid="button-seguir">
                      <Eye className="h-4 w-4 mr-2" />
                      {isSeguindo ? "Seguindo" : "Seguir"}
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleShare} data-testid="button-compartilhar">
                      <Share2 className="h-4 w-4 mr-2" />
                      Compartilhar
                    </Button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {selectedTicket.etiquetas && selectedTicket.etiquetas.length > 0 && selectedTicket.etiquetas.map((etiqueta, idx) => (
                    <Badge key={idx} variant="secondary" className="gap-1" data-testid={`modal-etiqueta-${idx}`}>
                      {etiqueta}
                      <X className="h-3 w-3 cursor-pointer" onClick={() => handleRemoveEtiqueta(etiqueta)} />
                    </Badge>
                  ))}
                  {showEtiquetaInput ? (
                    <div className="flex gap-1">
                      <Input
                        value={newEtiqueta}
                        onChange={(e) => setNewEtiqueta(e.target.value)}
                        placeholder="Nome da etiqueta"
                        className="h-6 text-xs w-32"
                        onKeyPress={(e) => e.key === 'Enter' && handleAddEtiqueta()}
                        data-testid="input-nova-etiqueta"
                      />
                      <Button size="sm" className="h-6 px-2" onClick={handleAddEtiqueta} data-testid="button-salvar-etiqueta">
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  ) : (
                    <Button variant="outline" size="sm" className="h-6 px-2" onClick={() => setShowEtiquetaInput(true)} data-testid="button-adicionar-etiqueta">
                      <Tag className="h-3 w-3 mr-1" />
                      Adicionar Etiqueta
                    </Button>
                  )}
                </div>
              </div>

              <div className="flex flex-1 overflow-hidden">
                <ScrollArea className="flex-1 p-6">
                  <div className="space-y-6 pr-4">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-700 mb-2">Detalhes</h3>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Categoria:</span> <span className="font-medium" data-testid="text-modal-categoria">{selectedTicket.categoria}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Sistema:</span> <span className="font-medium" data-testid="text-modal-sistema">{selectedTicket.sistema}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Solicitante:</span> <span className="font-medium" data-testid="text-modal-solicitante">{selectedTicket.solicitanteNome} {selectedTicket.solicitanteSobrenome}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Responsável:</span> <span className="font-medium" data-testid="text-modal-responsavel">{selectedTicket.responsavel || "Não atribuído"}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Prioridade:</span> <Badge className={getPrioridadeColor(selectedTicket.prioridade)}>{selectedTicket.prioridade}</Badge>
                        </div>
                        <div>
                          <span className="text-gray-600">Criticidade:</span> <span className="font-medium" data-testid="text-modal-criticidade">{selectedTicket.criticidade}</span>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-sm font-semibold text-gray-700 mb-2">Descrição</h3>
                      <p className="text-sm text-gray-900 whitespace-pre-wrap" data-testid="text-modal-descricao">{selectedTicket.problemaDescricao}</p>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-gray-700 mb-2">O que não consegue fazer</h3>
                      <p className="text-sm text-gray-900" data-testid="text-modal-nao-consegue">{selectedTicket.naoConsegue}</p>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-gray-700 mb-2">Como replicar</h3>
                      <p className="text-sm text-gray-900" data-testid="text-modal-replicacao">{selectedTicket.replicacao}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-sm font-semibold text-gray-700 mb-2">Frequência</h3>
                        <p className="text-sm text-gray-900" data-testid="text-modal-frequencia">{selectedTicket.frequencia}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-gray-700 mb-2">Impedimento</h3>
                        <p className="text-sm text-gray-900" data-testid="text-modal-impedimento">{selectedTicket.impedimento}</p>
                      </div>
                    </div>

                    {((selectedTicket.anexos && selectedTicket.anexos.length > 0) || (selectedTicket.evidencias && selectedTicket.evidencias.length > 0)) && (() => {
                      const anexos = selectedTicket.anexos && selectedTicket.anexos.length > 0 
                        ? selectedTicket.anexos 
                        : convertEvidenciasToAnexos(selectedTicket.evidencias || []);
                      return (
                        <div>
                          <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                            <Paperclip className="h-4 w-4 mr-1" />
                            Anexos ({anexos.length})
                          </h3>
                          <div className="space-y-2">
                            {anexos.map((anexo, idx) => {
                              const isPreviewable = canPreview(anexo.url);
                              const fileSize = formatFileSize(anexo.tamanho);
                              
                              return (
                                <div 
                                  key={idx} 
                                  className="group flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all"
                                  data-testid={`anexo-${idx}`}
                                >
                                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded flex items-center justify-center text-gray-500 overflow-hidden">
                                    {isImageFile(anexo.url) ? (
                                      <img 
                                        src={anexo.url} 
                                        alt={anexo.nome}
                                        className="w-full h-full object-cover"
                                      />
                                    ) : (
                                      <div className="scale-75">
                                        {getFileIcon(anexo.url)}
                                      </div>
                                    )}
                                  </div>
                                  
                                  <div className="flex-1 min-w-0">
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <p className="text-sm font-medium text-gray-900 truncate">{anexo.nome}</p>
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p className="max-w-xs break-all">{anexo.nome}</p>
                                      </TooltipContent>
                                    </Tooltip>
                                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                                      <span className="text-xs text-gray-500 uppercase font-medium">{anexo.tipo || 'arquivo'}</span>
                                      {fileSize && (
                                        <>
                                          <span className="text-xs text-gray-300">•</span>
                                          <span className="text-xs text-gray-500">{fileSize}</span>
                                        </>
                                      )}
                                      {anexo.uploadedBy && (
                                        <>
                                          <span className="text-xs text-gray-300">•</span>
                                          <span className="text-xs text-gray-500">
                                            Anexado por {anexo.uploadedBy}
                                          </span>
                                        </>
                                      )}
                                    </div>
                                  </div>

                                  <div className="flex-shrink-0 flex gap-1">
                                    {isPreviewable && (
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600"
                                            onClick={() => handleAnexoClick(anexo.url)}
                                            data-testid={`button-preview-anexo-${idx}`}
                                          >
                                            <Eye className="h-4 w-4" />
                                          </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                          <p>Visualizar</p>
                                        </TooltipContent>
                                      </Tooltip>
                                    )}
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          className="h-8 w-8 p-0 hover:bg-green-50 hover:text-green-600"
                                          onClick={() => handleDownloadEvidencia(anexo.url)}
                                          data-testid={`button-download-anexo-${idx}`}
                                        >
                                          <Download className="h-4 w-4" />
                                        </Button>
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p>Baixar</p>
                                      </TooltipContent>
                                    </Tooltip>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                                          onClick={() => handleRemoveEvidencia(idx)}
                                          data-testid={`button-excluir-anexo-${idx}`}
                                        >
                                          <Trash2 className="h-4 w-4" />
                                        </Button>
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p>Excluir</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </ScrollArea>

                <div className="w-80 border-l bg-gray-50 flex flex-col">
                  <div className="p-4 border-b bg-white">
                    <h3 className="font-semibold text-gray-900">Atividade</h3>
                  </div>
                  <div className="flex-1 p-4 overflow-y-auto">
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-xs font-semibold text-gray-700 uppercase mb-2">Comentários</h4>
                        <div className="space-y-2 mb-3">
                          {comments.length === 0 ? (
                            <p className="text-xs text-gray-500">Nenhum comentário</p>
                          ) : (
                            comments.map(comment => (
                              <div key={comment.id} className="bg-white border rounded p-2" data-testid={`comentario-${comment.id}`}>
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-xs font-medium">{comment.author}</span>
                                  <span className="text-xs text-gray-500">{new Date(comment.createdAt).toLocaleDateString()}</span>
                                </div>
                                <p className="text-xs text-gray-700">{comment.content}</p>
                              </div>
                            ))
                          )}
                        </div>
                        <Textarea
                          placeholder="Escrever um comentário..."
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          className="text-xs mb-2"
                          rows={3}
                          data-testid="input-comentario"
                        />
                        <Button 
                          size="sm"
                          onClick={handleAddComment} 
                          disabled={!newComment.trim() || addCommentMutation.isPending}
                          className="w-full"
                          data-testid="button-adicionar-comentario"
                        >
                          Adicionar Comentário
                        </Button>
                      </div>

                      <Separator />

                      <div>
                        <h4 className="text-xs font-semibold text-gray-700 uppercase mb-2">Histórico</h4>
                        <div className="space-y-2">
                          {history.length === 0 ? (
                            <p className="text-xs text-gray-500">Nenhum histórico</p>
                          ) : (
                            history.map(h => (
                              <div key={h.id} className="text-xs border-l-2 border-gray-300 pl-2" data-testid={`historico-${h.id}`}>
                                <p className="text-gray-900">{formatHistoryMessage(h)}</p>
                                <p className="text-gray-500 text-xs mt-1">{new Date(h.createdAt).toLocaleString()}</p>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
                  <AvatarFallback className={`text-xs ${getDeveloperColor(dev).bg} ${getDeveloperColor(dev).text}`}>
                    {getInitials(dev)}
                  </AvatarFallback>
                </Avatar>
                {dev}
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showAIModal} onOpenChange={setShowAIModal}>
        <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto" data-testid="modal-sugestao-ia">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl">
              <Lightbulb className="h-6 w-6 text-yellow-500" />
              Sugestão FlexIA
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 mt-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Problemas semelhantes encontrados anteriormente
              </h3>
              <div className="space-y-2">
                <div className="bg-white rounded p-3 border border-blue-100">
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">#127 - Sistema Bandeiras:</span> Erro ao processar dados similares identificado em 15/09/2025
                  </p>
                </div>
                <div className="bg-white rounded p-3 border border-blue-100">
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">#089 - Sistema Bandeiras:</span> Inconsistência no processamento detectada em 03/08/2025
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-900 mb-3 flex items-center gap-2">
                <Tag className="h-5 w-5" />
                Resoluções executadas
              </h3>
              <div className="space-y-3">
                <div className="bg-white rounded p-3 border border-green-100">
                  <p className="font-medium text-sm text-gray-900 mb-1">Ticket #127</p>
                  <p className="text-sm text-gray-700">
                    Ajuste realizado no módulo de validação de dados. Implementada verificação adicional para campos obrigatórios.
                  </p>
                  <p className="text-xs text-gray-500 mt-2">Resolvido por: William Santana • Tempo: 2h 30min</p>
                </div>
                <div className="bg-white rounded p-3 border border-green-100">
                  <p className="font-medium text-sm text-gray-900 mb-1">Ticket #089</p>
                  <p className="text-sm text-gray-700">
                    Correção aplicada na lógica de processamento em lote. Adicionado tratamento para casos especiais.
                  </p>
                  <p className="text-xs text-gray-500 mt-2">Resolvido por: Lucas Dewes • Tempo: 1h 45min</p>
                </div>
              </div>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <h3 className="font-semibold text-orange-900 mb-3 flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Alternativas de possibilidades do problema
              </h3>
              <ul className="space-y-2">
                <li className="bg-white rounded p-3 border border-orange-100">
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">1.</span> Possível inconsistência nos dados de entrada
                  </p>
                </li>
                <li className="bg-white rounded p-3 border border-orange-100">
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">2.</span> Timeout na comunicação com serviços externos
                  </p>
                </li>
                <li className="bg-white rounded p-3 border border-orange-100">
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">3.</span> Problema de configuração no ambiente
                  </p>
                </li>
              </ul>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h3 className="font-semibold text-purple-900 mb-3 flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                O que fazer
              </h3>
              <div className="space-y-3">
                <div className="bg-white rounded p-3 border border-purple-100">
                  <p className="font-medium text-sm text-purple-900 mb-2">Passo 1: Validação inicial</p>
                  <p className="text-sm text-gray-700">
                    Verificar os logs do sistema para identificar o ponto exato da falha. Conferir se há mensagens de erro relacionadas.
                  </p>
                </div>
                <div className="bg-white rounded p-3 border border-purple-100">
                  <p className="font-medium text-sm text-purple-900 mb-2">Passo 2: Análise comparativa</p>
                  <p className="text-sm text-gray-700">
                    Comparar os dados de entrada deste ticket com os tickets #127 e #089 para identificar padrões.
                  </p>
                </div>
                <div className="bg-white rounded p-3 border border-purple-100">
                  <p className="font-medium text-sm text-purple-900 mb-2">Passo 3: Aplicação da correção</p>
                  <p className="text-sm text-gray-700">
                    Implementar a solução similar ao ticket #127, adaptando para o contexto atual.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-100 rounded-lg p-4 border border-gray-300">
              <p className="text-xs text-gray-600 flex items-center gap-2">
                <Lightbulb className="h-4 w-4" />
                <span>
                  Esta análise foi gerada pela FlexIA com base em tickets anteriores. A integração completa com IA estará disponível em breve.
                </span>
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={!!previewAnexo} onOpenChange={() => setPreviewAnexo(null)}>
        <DialogContent className="max-w-5xl max-h-[90vh] p-0">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b bg-gray-50">
              <div className="flex-1 min-w-0">
                <DialogTitle className="text-lg font-semibold truncate">
                  {previewAnexo?.nome.split('/').pop() || previewAnexo?.nome}
                </DialogTitle>
                <p className="text-sm text-gray-500 mt-1">
                  {previewAnexo?.tipo.toUpperCase()} • Clique em "Baixar" para salvar o arquivo
                </p>
              </div>
              <div className="flex gap-2 ml-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => previewAnexo && handleDownloadEvidencia(previewAnexo.url)}
                  data-testid="button-download-preview"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Baixar
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPreviewAnexo(null)}
                  data-testid="button-fechar-preview"
                >
                  <X className="h-4 w-4 mr-2" />
                  Fechar
                </Button>
              </div>
            </div>

            <div className="flex-1 overflow-auto bg-gray-900 flex items-center justify-center p-4">
              {previewAnexo && (
                <>
                  {isImageFile(previewAnexo.nome) ? (
                    <img 
                      src={previewAnexo.url} 
                      alt={previewAnexo.nome}
                      className="max-w-full max-h-full object-contain"
                      data-testid="img-preview-anexo"
                    />
                  ) : isPdfFile(previewAnexo.nome) ? (
                    <iframe
                      src={previewAnexo.url}
                      className="w-full h-full min-h-[600px] bg-white"
                      title={previewAnexo.nome}
                      data-testid="iframe-preview-pdf"
                    />
                  ) : (
                    <div className="text-center text-white">
                      <FileText className="h-20 w-20 mx-auto mb-4 opacity-50" />
                      <p className="text-lg">Prévia não disponível</p>
                      <p className="text-sm text-gray-400 mt-2">Clique em "Baixar" para abrir o arquivo</p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
