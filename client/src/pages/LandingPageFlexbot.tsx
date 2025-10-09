import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaChartLine, FaInfoCircle, FaBug } from "react-icons/fa";
import { FaArrowTrendUp } from "react-icons/fa6";
import { useLocation } from "wouter";
import logoImage from "@assets/Gemini_Generated_Image_r1r30mr1r30mr1r3 1 (1)_1759432339653.png";
import image18 from "@assets/image 18.png";
import image17 from "@assets/image 17_1759502936347.png";
import footerLogo from "@assets/Gemini_Generated_Image_zi2slpzi2slpzi2s 1 1.png";
import heroVideo from "@assets/gif-hero-homepage_1760023051566.mp4";

export const LandingPageFlexbot = (): JSX.Element => {
  const [activeStep, setActiveStep] = useState(0);
  const [, setLocation] = useLocation();

  const navigationItems = [
    { label: "Home" },
    { label: "Suporte" },
    { label: "Chamados" },
  ];

  const processSteps = [
    { number: "1", title: "Abertura de ocorrência" },
    { number: "2", title: "Contextualização" },
    { number: "3", title: "Atendimento direcionado" },
    { number: "4", title: "Acompanhamento e interações" },
  ];

  const serviceCards = [
    { title: "Projeto", icon: <FaChartLine className="w-[70px] h-[70px] mb-4" />, path: "/projeto" },
    { title: "Chamado", icon: <FaInfoCircle className="w-[70px] h-[70px] mb-4" />, path: "/chamado" },
    { title: "Bug", icon: <FaBug className="w-[70px] h-[70px] mb-4" />, path: "/bug" },
    { title: "Melhoria", icon: <FaArrowTrendUp className="w-[70px] h-[70px] mb-4" />, path: "/melhoria" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 5);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const scrollToContent = () => {
    const contentSection = document.querySelector('#content-section');
    if (contentSection) {
      contentSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white w-full min-h-screen [font-family:'Poppins',Helvetica]">
      <header className="bg-[#9e090f] w-full py-6 px-4 md:px-8 lg:px-16 pt-[10px] pb-[10px]">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <img
            src={logoImage}
            alt="redeFlex"
            className="h-8 md:h-10 w-auto"
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
                onClick={() => {
                  if (item.label === "Chamados") {
                    setLocation("/kanban");
                  }
                }}
                data-testid={`nav-${item.label.toLowerCase()}`}
              >
                {item.label}
              </motion.div>
            ))}
          </nav>
        </div>
      </header>

      {/* Hero Section com Vídeo */}
      <section className="relative h-[75vh] md:h-[78vh] lg:h-[80vh] overflow-hidden">
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
        <div className="absolute inset-0 bg-black/25" />

        {/* Conteúdo sobreposto */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 text-center gap-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-bold text-white text-5xl md:text-6xl lg:text-7xl leading-[1.2] drop-shadow-lg"
            data-testid="hero-title"
          >
            FlexIA
          </motion.h1>
          
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glow-btn"
            onClick={scrollToContent}
            data-testid="button-saber-mais"
          >
            Saber mais
          </motion.button>
        </div>
      </section>

      <section id="content-section" className="bg-[#f2f2f2] py-16 md:py-20 lg:py-24 px-4 md:px-8 lg:px-16 mt-16 md:mt-20">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="font-semibold text-[#141b3a] text-3xl md:text-5xl lg:text-6xl leading-[1.2] mb-8">
              Gerencie seus tickets com agilidade e eficiência junto ao FlexIA
            </h2>
            <p className="text-[#141b3a] font-light text-lg md:text-xl lg:text-2xl leading-[1.7] max-w-4xl mx-auto mb-8">
              Com a inteligência artificial do FlexIA, a compreensão e o direcionamento dos seus chamados, projetos, bugs e melhorias tornam-se muito mais assertivos. Explore nossas categorias de abertura de tickets e descubra como facilitar suas solicitações de forma simples e eficaz.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12 md:mb-16">
            {serviceCards.map((card, index) => (
              <div
                key={`card-${index}`}
                className="glow-card"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  setLocation(card.path);
                }}
                data-testid={`card-servico-${card.title.toLowerCase()}`}
              >
                {card.icon}
                <h3 className="font-bold text-lg md:text-xl text-center mt-4">
                  {card.title}
                </h3>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              className="glow-btn"
              data-testid="button-saber-mais-servicos"
            >
              Saber mais
            </button>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 lg:py-24 px-4 md:px-8 lg:px-16 mt-16 md:mt-20">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="font-semibold text-[#141b3a] text-3xl md:text-5xl lg:text-6xl leading-[1.2] mb-8">
                Aprenda com cenários reais e soluções eficazes
              </h2>
              <p className="text-[#141b3a] font-light text-lg md:text-xl lg:text-2xl leading-[1.7] mb-8">
                O portfólio do FlexIA reúne uma coleção completa de resoluções reais aplicadas em diferentes sistemas e categorias. Aqui, você encontra documentações detalhadas com prints, evidências e orientações passo a passo que mostram como cada desafio foi solucionado. Mais do que um repositório, este espaço é uma base de conhecimento dinâmica, criada para aprimorar o entendimento e a autonomia dos usuários. Explore os casos, entenda as estratégias adotadas e descubra como a inteligência do FlexIA pode transformar a forma como você soluciona problemas.
              </p>
              <button
                className="glow-btn"
                data-testid="button-acessar-portfolio"
              >
                Acessar portfolio
              </button>
            </div>
            <div className="order-1 lg:order-2 flex justify-center">
              <img
                className="w-full max-w-[700px] h-auto object-cover"
                alt="Image"
                src={image18}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="hero-animated py-16 md:py-20 lg:py-24 px-4 md:px-8 lg:px-16 mt-16 md:mt-20">
        <span className="orb orb--amber"></span>
        <span className="orb orb--gold"></span>
        <span className="orb orb--navy"></span>
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
            <div className="flex justify-center">
              <img
                className="w-full max-w-[400px] h-auto object-contain"
                alt="Image"
                src={image17}
              />
            </div>
            <div>
              <h2 className="font-semibold text-[#141b3a] text-3xl md:text-5xl lg:text-6xl leading-[1.2] mb-8">
                Inove com a gente: sua ideia pode ser a próxima melhoria do FlexIA
              </h2>
              <p className="text-[#141b3a] font-light text-lg md:text-xl lg:text-2xl leading-[1.7] mb-8">
                Queremos ouvir você! Envie sugestões de funcionalidades, ajustes ou melhorias que possam tornar nossos processos de tickets ainda mais ágeis e intuitivos. No FlexIA, cada insight conta para impulsionar a inovação e aprimorar continuamente a ferramenta.
              </p>
              <button
                className="glow-btn"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  setLocation("/contribuicao");
                }}
                data-testid="button-contribuir-agora"
              >
                Contribuir agora
              </button>
            </div>
          </div>
        </div>
      </section>

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
