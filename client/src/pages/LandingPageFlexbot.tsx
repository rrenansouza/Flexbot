import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaChartLine, FaInfoCircle, FaBug } from "react-icons/fa";
import { FaArrowTrendUp } from "react-icons/fa6";
import { useLocation } from "wouter";
import heroImage1 from "@assets/Img_1_herosection (4)_1759496280812.png";
import heroImage2 from "@assets/Img_2_herosection (4)_1759496280811.png";
import heroImage3 from "@assets/Img_3_herosection (3)_1759432774622.png";
import heroImage4 from "@assets/Hero Section (5)_1759431698720.png";
import logoImage from "@assets/Gemini_Generated_Image_r1r30mr1r30mr1r3 1 (1)_1759432339653.png";
import image18 from "@assets/image 18.png";
import image17 from "@assets/image 17_1759502936347.png";
import footerLogo from "@assets/Gemini_Generated_Image_zi2slpzi2slpzi2s 1 1.png";

export const LandingPageFlexbot = (): JSX.Element => {
  const [activeStep, setActiveStep] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [, setLocation] = useLocation();

  const navigationItems = [
    { label: "Home" },
    { label: "Suporte" },
    { label: "Chamados" },
  ];

  const heroImages = [
    heroImage1,
    heroImage2,
    heroImage3,
    heroImage4,
  ];

  const allSlides = [...heroImages, ...heroImages];

  const processSteps = [
    { number: "1", title: "Abertura de ocorrência" },
    { number: "2", title: "Contextualização" },
    { number: "3", title: "Atendimento direcionado" },
    { number: "4", title: "Acompanhamento e interações" },
  ];

  const serviceCards = [
    { title: "Projeto", icon: <FaChartLine className="w-[70px] h-[70px] mb-4" />, path: "/" },
    { title: "Chamado", icon: <FaInfoCircle className="w-[70px] h-[70px] mb-4" />, path: "/" },
    { title: "Bug", icon: <FaBug className="w-[70px] h-[70px] mb-4" />, path: "/bug" },
    { title: "Melhoria", icon: <FaArrowTrendUp className="w-[70px] h-[70px] mb-4" />, path: "/" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 5);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => prev + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (currentSlide === heroImages.length) {
      setTimeout(() => {
        setIsTransitioning(false);
        requestAnimationFrame(() => {
          setCurrentSlide(0);
          requestAnimationFrame(() => {
            setIsTransitioning(true);
          });
        });
      }, 800);
    }
  }, [currentSlide, heroImages.length]);

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
                data-testid={`nav-${item.label.toLowerCase()}`}
              >
                {item.label}
              </motion.div>
            ))}
          </nav>
        </div>
      </header>

      <section className="bg-[#999999] h-[450px] overflow-hidden relative">
        <motion.div
          className="flex h-full"
          animate={{ x: `-${currentSlide * 100}%` }}
          transition={isTransitioning ? { duration: 0.8, ease: "easeInOut" } : { duration: 0 }}
        >
          {allSlides.map((image, index) => (
            <div key={index} className="w-full h-full flex-shrink-0">
              <img
                className="w-full h-full object-cover"
                alt={`Hero Section - Slide ${(index % heroImages.length) + 1}`}
                src={image}
                data-testid={`hero-carousel-image-${index % heroImages.length}`}
              />
            </div>
          ))}
        </motion.div>
      </section>

      <section className="bg-[#9e090f] py-12 md:py-16 px-4 md:px-8 lg:px-16 mt-[0px] mb-[0px] ml-[0px] mr-[0px] pl-[64px] pr-[64px] pt-[30px] pb-[30px]">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center justify-center h-[120px]" data-testid="div-3">
            <button
              className="glow-btn"
              data-testid="button-saber-mais"
            >
              Saber mais
            </button>
          </div>
        </div>
      </section>

      <section className="bg-[#f2f2f2] py-16 md:py-20 lg:py-24 px-4 md:px-8 lg:px-16 mt-16 md:mt-20">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="font-semibold text-[#141b3a] text-3xl md:text-5xl lg:text-6xl leading-[1.2] mb-8">
              Lorem Ipsum is simply dummy text of the printing and typeset
            </h2>
            <p className="text-[#141b3a] font-light text-lg md:text-xl lg:text-2xl leading-[1.7] max-w-4xl mx-auto mb-8">
              ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12 md:mb-16">
            {serviceCards.map((card, index) => (
              <div
                key={`card-${index}`}
                className="glow-card"
                onClick={() => setLocation(card.path)}
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
                Lorem Ipsum is simply dummy text of the printing and typeset
              </h2>
              <p className="text-[#141b3a] font-light text-lg md:text-xl lg:text-2xl leading-[1.7] mb-8">
                ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
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

      <section className="py-16 md:py-20 lg:py-24 px-4 md:px-8 lg:px-16 mt-16 md:mt-20">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
            <div className="flex justify-center">
              <img
                className="w-full max-w-[700px] h-auto object-contain"
                alt="Image"
                src={image17}
              />
            </div>
            <div>
              <h2 className="font-semibold text-[#141b3a] text-3xl md:text-5xl lg:text-6xl leading-[1.2] mb-8">
                Lorem Ipsum is simply dummy
              </h2>
              <p className="text-[#141b3a] font-light text-lg md:text-xl lg:text-2xl leading-[1.7] mb-8">
                ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries
              </p>
              <button
                className="glow-btn"
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
