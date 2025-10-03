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
            <h2 className="font-semibold text-[#141b3a] text-2xl md:text-4xl lg:text-5xl leading-[1.3] mb-6">
              Lorem Ipsum is simply dummy text of the printing and typeset
            </h2>
            <p className="text-[#141b3a] font-light text-base md:text-lg lg:text-xl leading-[1.8] max-w-4xl mx-auto">
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
              <h2 className="font-semibold text-[#141b3a] text-2xl md:text-4xl lg:text-5xl leading-[1.3] mb-6">
                Lorem Ipsum is simply dummy text of the printing and typeset
              </h2>
              <p className="text-[#141b3a] font-light text-base md:text-lg lg:text-xl leading-[1.8] mb-8">
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
                className="w-full max-w-[550px] h-auto object-cover"
                alt="Image"
                src="/figmaAssets/image-4.png"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 lg:py-24 px-4 md:px-8 lg:px-16 mt-16 md:mt-20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[250px] md:w-[400px] lg:w-[550px] h-[350px] md:h-[500px] lg:h-[600px] rounded-tr-[120px] md:rounded-tr-[200px] lg:rounded-tr-[300px] bg-[linear-gradient(270deg,rgba(255,255,255,1)_18%,rgba(158,9,15,1)_52%)]" />
        
        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
            <div className="flex justify-center">
              <img
                className="w-full max-w-[450px] h-auto"
                alt="Image"
                src="/figmaAssets/image-6.png"
              />
            </div>
            <div>
              <h2 className="font-semibold text-[#141b3a] text-2xl md:text-4xl lg:text-5xl leading-[1.3] mb-6">
                Lorem Ipsum is simply dummy
              </h2>
              <p className="text-[#141b3a] font-light text-base md:text-lg lg:text-xl leading-[1.8] mb-8">
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
    </div>
  );
};
