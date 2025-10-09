import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Upload, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import logoImage from "@assets/Gemini_Generated_Image_r1r30mr1r30mr1r3 1 (1)_1759432339653.png";
import footerLogo from "@assets/Gemini_Generated_Image_zi2slpzi2slpzi2s 1 1.png";
import heroVideo from "@assets/gif-contribua-herosection_1760021653327.mp4";

const formSchema = z.object({
  tipo: z.string().min(1, "Selecione um tipo de solicitação"),
  descricao: z.string().min(20, "A descrição deve ter pelo menos 20 caracteres"),
});

type FormData = z.infer<typeof formSchema>;

interface FileUpload {
  file: File;
  id: string;
}

export const ContribuicaoPage = (): JSX.Element => {
  const [, setLocation] = useLocation();
  const [files, setFiles] = useState<FileUpload[]>([]);
  const { toast } = useToast();

  const navigationItems = [
    { label: "Home", path: "/" },
    { label: "Suporte", path: "/" },
    { label: "Chamados", path: "/kanban" },
  ];

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tipo: "",
      descricao: "",
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const validExtensions = ['png', 'jpg', 'jpeg', 'webp', 'gif', 'pdf'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    const validFiles: FileUpload[] = [];
    const errors: string[] = [];

    selectedFiles.forEach((file) => {
      const extension = file.name.split('.').pop()?.toLowerCase();
      
      if (!extension || !validExtensions.includes(extension)) {
        errors.push(`${file.name}: formato não suportado`);
        return;
      }
      
      if (file.size > maxSize) {
        errors.push(`${file.name}: tamanho máximo de 10MB excedido`);
        return;
      }

      validFiles.push({
        file,
        id: Math.random().toString(36).substr(2, 9),
      });
    });

    if (errors.length > 0) {
      toast({
        title: "Erro no upload",
        description: errors.join(', '),
        variant: "destructive",
      });
    }

    if (validFiles.length > 0) {
      setFiles((prev) => [...prev, ...validFiles]);
      console.log('add_attachment', validFiles.map(f => f.file.name));
    }

    // Reset input
    e.target.value = '';
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const onSubmit = (data: FormData) => {
    console.log('submit_contribuicao_success', { ...data, files: files.map(f => f.file.name) });
    
    toast({
      title: "Solicitação enviada!",
      description: "Sua solicitação foi enviada. Obrigado por contribuir com o FlexIA!",
    });

    // Limpar formulário
    form.reset();
    setFiles([]);

    // Redirecionar para home após 1.5s
    setTimeout(() => {
      setLocation("/");
    }, 1500);
  };

  // Log telemetria da hero
  console.log('impression_contribuicao_hero');

  return (
    <div className="bg-white w-full min-h-screen [font-family:'Poppins',Helvetica]">
      {/* Header */}
      <header className="bg-[#9e090f] w-full py-6 px-4 md:px-8 lg:px-16 pt-[10px] pb-[10px]">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <img
            src={logoImage}
            alt="redeFlex"
            className="h-8 md:h-10 w-auto cursor-pointer"
            onClick={() => setLocation("/")}
            data-testid="logo-redeflex"
          />
          <nav className="flex flex-wrap gap-6 md:gap-8 lg:gap-12 justify-center">
            {navigationItems.map((item, index) => (
              <motion.div
                key={`nav-${index}`}
                className="font-semibold text-white text-base md:text-lg cursor-pointer"
                whileHover={{ 
                  opacity: 0.8,
                  scale: 1.05,
                }}
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

      {/* Hero Section com Vídeo */}
      <section className="relative h-[60vh] md:h-[65vh] lg:h-[70vh] overflow-hidden">
        {/* Vídeo de fundo */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          data-testid="hero-video"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>

        {/* Overlay para contraste */}
        <div className="absolute inset-0 bg-black/20" />

        {/* Texto sobreposto */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-bold text-white text-4xl md:text-5xl lg:text-6xl leading-[1.2] mb-4 drop-shadow-lg"
            data-testid="hero-title"
          >
            Sua visão, nossa evolução
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-light text-white text-lg md:text-xl lg:text-2xl leading-[1.5] max-w-3xl drop-shadow-md"
            data-testid="hero-subtitle"
          >
            Sua ideia pode ser a próxima grande melhoria do FlexIA.
          </motion.p>
        </div>
      </section>

      {/* Seção do Formulário */}
      <section className="bg-[#9e090f] py-12 md:py-16 lg:py-20 px-4 md:px-8 lg:px-16">
        <div className="max-w-[800px] mx-auto">
          <h2 className="font-bold text-white text-3xl md:text-4xl lg:text-5xl mb-8 md:mb-12" data-testid="form-title">
            Diga-nos, como pode nos ajudar?
          </h2>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Tipo de Solicitação */}
              <FormField
                control={form.control}
                name="tipo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white text-lg font-semibold">
                      Tipo de solicitação
                    </FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        console.log('select_tipo_solicitacao', value);
                      }}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger 
                          className="bg-white text-black h-12 text-base"
                          data-testid="select-tipo"
                        >
                          <SelectValue placeholder="Selecione um tipo…" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="melhorias" data-testid="option-melhorias">Melhorias</SelectItem>
                        <SelectItem value="ideias" data-testid="option-ideias">Ideias de novas funcionalidades</SelectItem>
                        <SelectItem value="bug" data-testid="option-bug">Bug encontrado</SelectItem>
                        <SelectItem value="outros" data-testid="option-outros">Outros</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-yellow-300" />
                  </FormItem>
                )}
              />

              {/* Descrição */}
              <FormField
                control={form.control}
                name="descricao"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white text-lg font-semibold">
                      Descreva sua solicitação:
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Descreva sua solicitação com detalhes (ex.: o que, por que, benefício esperado)."
                        className="bg-white text-black min-h-[200px] text-base resize-none"
                        {...field}
                        data-testid="textarea-descricao"
                      />
                    </FormControl>
                    <FormMessage className="text-yellow-300" />
                  </FormItem>
                )}
              />

              {/* Upload de Arquivos */}
              <div className="space-y-4">
                <label className="block">
                  <span className="text-white text-lg font-semibold mb-2 block">
                    Anexar arquivos (opcional)
                  </span>
                  <input
                    type="file"
                    multiple
                    accept=".png,.jpg,.jpeg,.webp,.gif,.pdf"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                    data-testid="input-file"
                  />
                  <label
                    htmlFor="file-upload"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#9e090f] rounded-lg cursor-pointer hover:bg-gray-100 transition-colors font-semibold"
                    data-testid="button-anexar"
                  >
                    <Upload className="w-5 h-5" />
                    Anexar arquivos
                  </label>
                  <p className="text-white/80 text-sm mt-2">
                    Formatos: PNG, JPG, WEBP, GIF, PDF. Máx. 10MB/arquivo.
                  </p>
                </label>

                {/* Lista de arquivos */}
                {files.length > 0 && (
                  <div className="space-y-2">
                    {files.map((fileUpload) => (
                      <div
                        key={fileUpload.id}
                        className="flex items-center justify-between bg-white/10 rounded-lg px-4 py-2"
                        data-testid={`file-item-${fileUpload.id}`}
                      >
                        <span className="text-white text-sm truncate flex-1">
                          {fileUpload.file.name}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeFile(fileUpload.id)}
                          className="ml-2 text-white hover:text-red-300 transition-colors"
                          data-testid={`button-remove-file-${fileUpload.id}`}
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Botão Avançar */}
              <div className="flex justify-center pt-4">
                <button
                  type="submit"
                  className="glow-btn px-12"
                  data-testid="button-avancar"
                >
                  Avançar
                </button>
              </div>
            </form>
          </Form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#7a0000] py-4 px-4 md:px-8 lg:px-16">
        <div className="max-w-[1400px] mx-auto flex items-center gap-4">
          <img
            src={footerLogo}
            alt="Logo"
            className="w-[80px] h-[40px] object-contain"
          />
          <p className="text-white text-xs md:text-sm font-light">
            © 2025 Redeflex Comércio e Serviço de Telefonia - CNPJ nº 06.267.421/0001-74 / Av. Miguel Sutil, N° 8600, Sala 314 - Duque de Caxias, Cuiabá – MT, 78048-365
          </p>
        </div>
      </footer>
    </div>
  );
};
