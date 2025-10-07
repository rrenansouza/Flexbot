import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import logoImage from "@assets/Gemini_Generated_Image_r1r30mr1r30mr1r3 1 (1)_1759432339653.png";
import type { InsertTicket } from "@shared/schema";

const sistemas = [
  "Acompanha ponto",
  "Bandeiras",
  "Flexforce",
  "GMUD",
  "Appcliente",
  "Banco de dados",
  "Cadastro",
  "CMS",
  "Comercial",
  "Compliance",
  "Corban",
  "Crm",
  "Digitro",
  "Flexbank",
  "Flexcred",
  "Força de vendas",
  "Integrações",
  "Intraflex",
  "Marketing",
  "Operadoras",
  "Plancom",
  "Portal do cliente",
  "POS",
  "PowerBI",
  "Redeflex Mobile",
  "Relacionamento",
  "Reports",
  "SAP",
  "Scrum",
  "Site redeflex",
  "Sub e Adq",
  "TEF",
];

const frequencias = [
  "Pontualmente",
  "Às vezes",
  "Quase sempre",
  "Frequentemente",
];

type Step =
  | "abertura"
  | "aguardando"
  | "titulo"
  | "sistema"
  | "naoConsegue"
  | "replicar"
  | "frequencia"
  | "impedimento"
  | "criticidade"
  | "evidencias"
  | "solicitante"
  | "resumo";

interface TicketFormData {
  problemaDescricao: string;
  titulo: string;
  sistema: string;
  naoConsegue: string;
  replicacao: string;
  frequencia: string;
  impedimento: string;
  criticidade: string;
  evidencias: string[];
  solicitanteNome: string;
  solicitanteSobrenome: string;
}

export const TicketWizard = (): JSX.Element => {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState<Step>("abertura");
  const [formData, setFormData] = useState<TicketFormData>({
    problemaDescricao: "",
    titulo: "",
    sistema: "",
    naoConsegue: "",
    replicacao: "",
    frequencia: "",
    impedimento: "",
    criticidade: "",
    evidencias: [],
    solicitanteNome: "",
    solicitanteSobrenome: "",
  });

  const createTicketMutation = useMutation({
    mutationFn: async (data: InsertTicket) => {
      const res = await apiRequest("POST", "/api/tickets", data);
      return await res.json();
    },
    onSuccess: () => {
      toast({
        title: "Ticket criado com sucesso!",
        description: "Seu ticket foi registrado e será analisado em breve.",
      });
      setLocation("/melhoria");
    },
    onError: (error) => {
      toast({
        title: "Erro ao criar ticket",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const stepOrder: Step[] = [
    "abertura",
    "aguardando",
    "titulo",
    "sistema",
    "naoConsegue",
    "replicar",
    "frequencia",
    "impedimento",
    "criticidade",
    "evidencias",
    "solicitante",
    "resumo",
  ];

  const goBack = () => {
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(stepOrder[currentIndex - 1]);
    } else {
      setLocation("/melhoria");
    }
  };

  const goNext = () => {
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex < stepOrder.length - 1) {
      setCurrentStep(stepOrder[currentIndex + 1]);
    }
  };

  const goToStep = (step: Step) => {
    setCurrentStep(step);
  };

  useEffect(() => {
    if (currentStep === "aguardando") {
      const timer = setTimeout(() => {
        goNext();
      }, 7000);
      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  const updateField = (field: keyof TicketFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileNames = Array.from(files).map((file) => file.name);
      updateField("evidencias", [...formData.evidencias, ...fileNames]);
    }
  };

  const handleSubmit = () => {
    const ticketData: InsertTicket = {
      problemaDescricao: formData.problemaDescricao,
      titulo: formData.titulo,
      sistema: formData.sistema,
      naoConsegue: formData.naoConsegue,
      replicacao: formData.replicacao,
      frequencia: formData.frequencia,
      impedimento: formData.impedimento,
      criticidade: formData.criticidade,
      evidencias: formData.evidencias.length > 0 ? formData.evidencias : undefined,
      solicitanteNome: formData.solicitanteNome,
      solicitanteSobrenome: formData.solicitanteSobrenome,
    };
    createTicketMutation.mutate(ticketData);
  };

  const navigationItems = [
    { label: "Home", path: "/" },
    { label: "Suporte", path: "/" },
    { label: "Chamados", path: "/" },
  ];

  return (
    <div className="bg-[#9e090f] min-h-screen w-full [font-family:'Poppins',Helvetica]">
      <header className="bg-[#9e090f] w-full py-6 px-4 md:px-8 lg:px-16 pt-[10px] pb-[10px]">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <img
            src={logoImage}
            alt="redeFlex"
            className="h-8 md:h-10 w-auto cursor-pointer"
            data-testid="logo-redeflex"
            onClick={() => setLocation("/")}
          />
          <nav className="flex flex-wrap gap-6 md:gap-8 lg:gap-12 justify-center">
            {navigationItems.map((item, index) => (
              <motion.div
                key={`nav-${index}`}
                className="font-semibold text-white text-base md:text-lg cursor-pointer"
                whileHover={{ opacity: 0.8, scale: 1.05 }}
                transition={{ duration: 0.2 }}
                onClick={() => setLocation(item.path)}
                data-testid={`nav-${item.label.toLowerCase()}`}
              >
                {item.label}
              </motion.div>
            ))}
          </nav>
        </div>
      </header>

      <div className="max-w-[1000px] mx-auto px-4 py-8">
        {currentStep !== "aguardando" && currentStep !== "abertura" && (
          <button
            onClick={goBack}
            className="flex items-center gap-2 text-white mb-4 hover:opacity-80 transition-opacity"
            data-testid="button-voltar"
          >
            <ArrowLeft className="w-5 h-5" />
            VOLTAR
          </button>
        )}

        {currentStep !== "aguardando" && currentStep !== "abertura" && (
          <p className="text-white mb-6">
            Categoria designada: <span className="text-[#b8e986]">Melhoria</span>
          </p>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="min-h-[500px] flex flex-col items-center justify-center"
          >
            {currentStep === "abertura" && (
              <div className="w-full max-w-[900px] space-y-6">
                {currentStep === "abertura" && (
                  <button
                    onClick={goBack}
                    className="flex items-center gap-2 text-white mb-4 hover:opacity-80 transition-opacity"
                    data-testid="button-voltar"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    VOLTAR
                  </button>
                )}
                <div className="flex justify-center mb-8">
                  <div className="w-[150px] h-[150px] bg-[#4a9eff] rounded-lg" data-testid="div-blue-box"></div>
                </div>
                <h1 className="text-white text-3xl font-bold text-center mb-4" data-testid="text-titulo-abertura">
                  Vamos entender inicialmente o seu problema 🔍
                </h1>
                <p className="text-white text-center mb-6" data-testid="text-descricao-abertura">
                  Descreva com a maior riqueza de detalhes possíveis o problema que vem enfrentando. Lembre-se de instruir a abertura em um formato como se estivesse explicando a um colaborador em seu primeiro dia de trabalho. Assim trazemos o máximo de contexto possível para a abertura do ticket.
                </p>
                <Textarea
                  placeholder="Descreva seu problema"
                  value={formData.problemaDescricao}
                  onChange={(e) => updateField("problemaDescricao", e.target.value)}
                  className="w-full min-h-[150px] bg-white text-black rounded-lg p-4"
                  data-testid="input-problema-descricao"
                />
                <div className="flex justify-center mt-8">
                  <Button
                    onClick={goNext}
                    className="bg-[#f4a61f] hover:bg-[#d89419] text-black font-bold px-12 py-3 rounded-full"
                    disabled={!formData.problemaDescricao.trim()}
                    data-testid="button-avancar"
                  >
                    AVANÇAR
                  </Button>
                </div>
              </div>
            )}

            {currentStep === "aguardando" && (
              <div className="w-full max-w-[900px] space-y-6 text-center">
                <div className="flex justify-center mb-8">
                  <div className="w-[150px] h-[150px] bg-[#4a9eff] rounded-lg" data-testid="div-blue-box-aguardando"></div>
                </div>
                <h1 className="text-white text-3xl font-bold" data-testid="text-aguardando">
                  O FlexIA está analisando e categorizando seu ticket
                </h1>
              </div>
            )}

            {currentStep === "titulo" && (
              <div className="w-full max-w-[900px] space-y-6">
                <h1 className="text-white text-3xl font-bold" data-testid="text-titulo">
                  Agora de um título ao seu ticket 📝
                </h1>
                <Input
                  placeholder="Escreva o título do ticket"
                  value={formData.titulo}
                  onChange={(e) => updateField("titulo", e.target.value)}
                  className="w-full bg-white text-black rounded-full px-6 py-6"
                  data-testid="input-titulo"
                />
                <div className="flex justify-center mt-8">
                  <Button
                    onClick={goNext}
                    className="bg-[#f4a61f] hover:bg-[#d89419] text-black font-bold px-12 py-3 rounded-full"
                    disabled={!formData.titulo.trim()}
                    data-testid="button-avancar"
                  >
                    AVANÇAR
                  </Button>
                </div>
              </div>
            )}

            {currentStep === "sistema" && (
              <div className="w-full max-w-[900px] space-y-6">
                <h1 className="text-white text-3xl font-bold" data-testid="text-sistema">
                  Em qual sistema está ocorrendo 🔍
                </h1>
                <Select value={formData.sistema} onValueChange={(value) => updateField("sistema", value)}>
                  <SelectTrigger className="w-full bg-white text-black rounded-full px-6 py-6" data-testid="select-sistema">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    {sistemas.map((sistema) => (
                      <SelectItem key={sistema} value={sistema}>
                        {sistema}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="flex justify-center mt-8">
                  <Button
                    onClick={goNext}
                    className="bg-[#f4a61f] hover:bg-[#d89419] text-black font-bold px-12 py-3 rounded-full"
                    disabled={!formData.sistema}
                    data-testid="button-avancar"
                  >
                    AVANÇAR
                  </Button>
                </div>
              </div>
            )}

            {currentStep === "naoConsegue" && (
              <div className="w-full max-w-[900px] space-y-6">
                <h1 className="text-white text-3xl font-bold" data-testid="text-nao-consegue">
                  Descreva o que o usuário deveria conseguir fazer e não consegue 🔍
                </h1>
                <Textarea
                  placeholder="Descreva"
                  value={formData.naoConsegue}
                  onChange={(e) => updateField("naoConsegue", e.target.value)}
                  className="w-full min-h-[150px] bg-white text-black rounded-lg p-4"
                  data-testid="input-nao-consegue"
                />
                <div className="flex justify-center mt-8">
                  <Button
                    onClick={goNext}
                    className="bg-[#f4a61f] hover:bg-[#d89419] text-black font-bold px-12 py-3 rounded-full"
                    disabled={!formData.naoConsegue.trim()}
                    data-testid="button-avancar"
                  >
                    AVANÇAR
                  </Button>
                </div>
              </div>
            )}

            {currentStep === "replicar" && (
              <div className="w-full max-w-[900px] space-y-6">
                <h1 className="text-white text-3xl font-bold" data-testid="text-replicar">
                  E como conseguimos chegar até esse erro ou replicá-lo 🔍
                </h1>
                <Textarea
                  placeholder="Descreva"
                  value={formData.replicacao}
                  onChange={(e) => updateField("replicacao", e.target.value)}
                  className="w-full min-h-[150px] bg-white text-black rounded-lg p-4"
                  data-testid="input-replicacao"
                />
                <div className="flex justify-center mt-8">
                  <Button
                    onClick={goNext}
                    className="bg-[#f4a61f] hover:bg-[#d89419] text-black font-bold px-12 py-3 rounded-full"
                    disabled={!formData.replicacao.trim()}
                    data-testid="button-avancar"
                  >
                    AVANÇAR
                  </Button>
                </div>
              </div>
            )}

            {currentStep === "frequencia" && (
              <div className="w-full max-w-[900px] space-y-6">
                <h1 className="text-white text-3xl font-bold" data-testid="text-frequencia">
                  Com qual frequência acontece 🔍
                </h1>
                <Select value={formData.frequencia} onValueChange={(value) => updateField("frequencia", value)}>
                  <SelectTrigger className="w-full bg-white text-black rounded-full px-6 py-6" data-testid="select-frequencia">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    {frequencias.map((freq) => (
                      <SelectItem key={freq} value={freq}>
                        {freq}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="flex justify-center mt-8">
                  <Button
                    onClick={goNext}
                    className="bg-[#f4a61f] hover:bg-[#d89419] text-black font-bold px-12 py-3 rounded-full"
                    disabled={!formData.frequencia}
                    data-testid="button-avancar"
                  >
                    AVANÇAR
                  </Button>
                </div>
              </div>
            )}

            {currentStep === "impedimento" && (
              <div className="w-full max-w-[900px] space-y-6">
                <h1 className="text-white text-3xl font-bold" data-testid="text-impedimento">
                  O erro impede a operação ou há uma solução alternativa disponível 🔍
                </h1>
                <Textarea
                  placeholder="Descreva"
                  value={formData.impedimento}
                  onChange={(e) => updateField("impedimento", e.target.value)}
                  className="w-full min-h-[150px] bg-white text-black rounded-lg p-4"
                  data-testid="input-impedimento"
                />
                <div className="flex justify-center mt-8">
                  <Button
                    onClick={goNext}
                    className="bg-[#f4a61f] hover:bg-[#d89419] text-black font-bold px-12 py-3 rounded-full"
                    disabled={!formData.impedimento.trim()}
                    data-testid="button-avancar"
                  >
                    AVANÇAR
                  </Button>
                </div>
              </div>
            )}

            {currentStep === "criticidade" && (
              <div className="w-full max-w-[900px] space-y-6">
                <h1 className="text-white text-3xl font-bold" data-testid="text-criticidade">
                  Descreva a criticidade desse caso
                </h1>
                <Textarea
                  placeholder="Descreva"
                  value={formData.criticidade}
                  onChange={(e) => updateField("criticidade", e.target.value)}
                  className="w-full min-h-[150px] bg-white text-black rounded-lg p-4"
                  data-testid="input-criticidade"
                />
                <div className="flex justify-center mt-8">
                  <Button
                    onClick={goNext}
                    className="bg-[#f4a61f] hover:bg-[#d89419] text-black font-bold px-12 py-3 rounded-full"
                    disabled={!formData.criticidade.trim()}
                    data-testid="button-avancar"
                  >
                    AVANÇAR
                  </Button>
                </div>
              </div>
            )}

            {currentStep === "evidencias" && (
              <div className="w-full max-w-[900px] space-y-6">
                <h1 className="text-white text-3xl font-bold" data-testid="text-evidencias">
                  Deixe algumas evidências ou prints para nos ajudar
                </h1>
                <div className="flex gap-4 items-center justify-center">
                  <div className="w-[120px] h-[120px] bg-white rounded-lg" data-testid="div-upload-preview"></div>
                  <label
                    htmlFor="file-upload"
                    className="w-[120px] h-[120px] border-2 border-dashed border-white rounded-lg flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors"
                    data-testid="label-upload"
                  >
                    <span className="text-white text-4xl">+</span>
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    data-testid="input-file-upload"
                  />
                </div>
                {formData.evidencias.length > 0 && (
                  <div className="text-white text-center">
                    <p>{formData.evidencias.length} arquivo(s) selecionado(s)</p>
                  </div>
                )}
                <div className="flex justify-center mt-8">
                  <Button
                    onClick={goNext}
                    className="bg-[#f4a61f] hover:bg-[#d89419] text-black font-bold px-12 py-3 rounded-full"
                    data-testid="button-avancar"
                  >
                    Avançar
                  </Button>
                </div>
              </div>
            )}

            {currentStep === "solicitante" && (
              <div className="w-full max-w-[900px] space-y-6">
                <h1 className="text-white text-3xl font-bold" data-testid="text-solicitante">
                  Agora para finalizar, quem está solicitando esse chamado
                </h1>
                <Input
                  placeholder="Escreva seu nome e sobrenome"
                  value={`${formData.solicitanteNome} ${formData.solicitanteSobrenome}`.trim()}
                  onChange={(e) => {
                    const fullName = e.target.value;
                    const parts = fullName.split(" ");
                    const nome = parts[0] || "";
                    const sobrenome = parts.slice(1).join(" ") || "";
                    setFormData((prev) => ({
                      ...prev,
                      solicitanteNome: nome,
                      solicitanteSobrenome: sobrenome,
                    }));
                  }}
                  className="w-full bg-white text-black rounded-full px-6 py-6"
                  data-testid="input-solicitante"
                />
                <div className="flex justify-center mt-8">
                  <Button
                    onClick={goNext}
                    className="bg-[#f4a61f] hover:bg-[#d89419] text-black font-bold px-12 py-3 rounded-full"
                    disabled={!formData.solicitanteNome.trim() || !formData.solicitanteSobrenome.trim()}
                    data-testid="button-avancar"
                  >
                    Avançar
                  </Button>
                </div>
              </div>
            )}

            {currentStep === "resumo" && (
              <div className="w-full max-w-[900px] space-y-6">
                <h1 className="text-white text-3xl font-bold text-center mb-8" data-testid="text-resumo">
                  Resumo do Ticket
                </h1>
                <div className="bg-white/10 rounded-lg p-6 space-y-4">
                  <div className="border-b border-white/20 pb-3">
                    <p className="text-white/70 text-sm">Categoria</p>
                    <p className="text-white font-semibold" data-testid="resumo-categoria">
                      Melhoria
                    </p>
                  </div>
                  <div className="border-b border-white/20 pb-3">
                    <p className="text-white/70 text-sm">Problema</p>
                    <p className="text-white" data-testid="resumo-problema">
                      {formData.problemaDescricao}
                    </p>
                    <button
                      onClick={() => goToStep("abertura")}
                      className="text-[#f4a61f] text-sm mt-1 hover:underline"
                      data-testid="button-editar-problema"
                    >
                      Editar
                    </button>
                  </div>
                  <div className="border-b border-white/20 pb-3">
                    <p className="text-white/70 text-sm">Título</p>
                    <p className="text-white" data-testid="resumo-titulo">
                      {formData.titulo}
                    </p>
                    <button
                      onClick={() => goToStep("titulo")}
                      className="text-[#f4a61f] text-sm mt-1 hover:underline"
                      data-testid="button-editar-titulo"
                    >
                      Editar
                    </button>
                  </div>
                  <div className="border-b border-white/20 pb-3">
                    <p className="text-white/70 text-sm">Sistema</p>
                    <p className="text-white" data-testid="resumo-sistema">
                      {formData.sistema}
                    </p>
                    <button
                      onClick={() => goToStep("sistema")}
                      className="text-[#f4a61f] text-sm mt-1 hover:underline"
                      data-testid="button-editar-sistema"
                    >
                      Editar
                    </button>
                  </div>
                  <div className="border-b border-white/20 pb-3">
                    <p className="text-white/70 text-sm">Não consegue</p>
                    <p className="text-white" data-testid="resumo-nao-consegue">
                      {formData.naoConsegue}
                    </p>
                    <button
                      onClick={() => goToStep("naoConsegue")}
                      className="text-[#f4a61f] text-sm mt-1 hover:underline"
                      data-testid="button-editar-nao-consegue"
                    >
                      Editar
                    </button>
                  </div>
                  <div className="border-b border-white/20 pb-3">
                    <p className="text-white/70 text-sm">Replicação</p>
                    <p className="text-white" data-testid="resumo-replicacao">
                      {formData.replicacao}
                    </p>
                    <button
                      onClick={() => goToStep("replicar")}
                      className="text-[#f4a61f] text-sm mt-1 hover:underline"
                      data-testid="button-editar-replicacao"
                    >
                      Editar
                    </button>
                  </div>
                  <div className="border-b border-white/20 pb-3">
                    <p className="text-white/70 text-sm">Frequência</p>
                    <p className="text-white" data-testid="resumo-frequencia">
                      {formData.frequencia}
                    </p>
                    <button
                      onClick={() => goToStep("frequencia")}
                      className="text-[#f4a61f] text-sm mt-1 hover:underline"
                      data-testid="button-editar-frequencia"
                    >
                      Editar
                    </button>
                  </div>
                  <div className="border-b border-white/20 pb-3">
                    <p className="text-white/70 text-sm">Impedimento</p>
                    <p className="text-white" data-testid="resumo-impedimento">
                      {formData.impedimento}
                    </p>
                    <button
                      onClick={() => goToStep("impedimento")}
                      className="text-[#f4a61f] text-sm mt-1 hover:underline"
                      data-testid="button-editar-impedimento"
                    >
                      Editar
                    </button>
                  </div>
                  <div className="border-b border-white/20 pb-3">
                    <p className="text-white/70 text-sm">Criticidade</p>
                    <p className="text-white" data-testid="resumo-criticidade">
                      {formData.criticidade}
                    </p>
                    <button
                      onClick={() => goToStep("criticidade")}
                      className="text-[#f4a61f] text-sm mt-1 hover:underline"
                      data-testid="button-editar-criticidade"
                    >
                      Editar
                    </button>
                  </div>
                  <div className="border-b border-white/20 pb-3">
                    <p className="text-white/70 text-sm">Evidências</p>
                    <p className="text-white" data-testid="resumo-evidencias">
                      {formData.evidencias.length > 0
                        ? `${formData.evidencias.length} arquivo(s)`
                        : "Nenhum arquivo"}
                    </p>
                    <button
                      onClick={() => goToStep("evidencias")}
                      className="text-[#f4a61f] text-sm mt-1 hover:underline"
                      data-testid="button-editar-evidencias"
                    >
                      Editar
                    </button>
                  </div>
                  <div>
                    <p className="text-white/70 text-sm">Solicitante</p>
                    <p className="text-white" data-testid="resumo-solicitante">
                      {formData.solicitanteNome} {formData.solicitanteSobrenome}
                    </p>
                    <button
                      onClick={() => goToStep("solicitante")}
                      className="text-[#f4a61f] text-sm mt-1 hover:underline"
                      data-testid="button-editar-solicitante"
                    >
                      Editar
                    </button>
                  </div>
                </div>
                <div className="flex justify-center gap-4 mt-8">
                  <Button
                    onClick={handleSubmit}
                    disabled={createTicketMutation.isPending}
                    className="bg-[#f4a61f] hover:bg-[#d89419] text-black font-bold px-12 py-3 rounded-full"
                    data-testid="button-enviar"
                  >
                    {createTicketMutation.isPending ? "Enviando..." : "Enviar Ticket"}
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
