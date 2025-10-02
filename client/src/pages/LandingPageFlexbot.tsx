import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { FaChartLine, FaInfoCircle, FaBug, FaCheck } from "react-icons/fa";
import { FaArrowTrendUp } from "react-icons/fa6";
import heroImage from "@assets/Hero Section (3)_1759430343953.png";

export const LandingPageFlexbot = (): JSX.Element => {
  const [activeStep, setActiveStep] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  const navigationItems = [
    { label: "Home" },
    { label: "Suporte" },
    { label: "Chamados" },
  ];

  const heroSlides = [
    { 
      title: "PROJETOS",
      image: "/figmaAssets/hero-projetos.png",
      text: "containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem. containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem."
    },
    { 
      title: "MELHORIAS",
      image: "/figmaAssets/hero-melhorias.png",
      text: "containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem. containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem."
    },
    { 
      title: "BUG",
      image: "/figmaAssets/hero-bug.png",
      text: "containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem. containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem."
    },
    { 
      title: "CHAMADOS",
      image: "/figmaAssets/hero-chamados.png",
      text: "containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem. containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem."
    },
  ];

  const processSteps = [
    { number: "1", title: "Abertura de ocorrência" },
    { number: "2", title: "Contextualização" },
    { number: "3", title: "Atendimento direcionado" },
    { number: "4", title: "Acompanhamento e interações" },
  ];

  const serviceCards = [
    { title: "Projeto", icon: <FaChartLine className="w-[70px] h-[70px] mb-4" /> },
    { title: "Chamado", icon: <FaInfoCircle className="w-[70px] h-[70px] mb-4" /> },
    { title: "Bug", icon: <FaBug className="w-[70px] h-[70px] mb-4" /> },
    { title: "Melhoria", icon: <FaArrowTrendUp className="w-[70px] h-[70px] mb-4" /> },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 5);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white w-full min-h-screen [font-family:'Poppins',Helvetica]">
      <header className="bg-[#9e090f] w-full py-6 px-4 md:px-8 lg:px-16 pt-[10px] pb-[10px]">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-white text-2xl md:text-3xl font-light tracking-tight" data-testid="logo-redeflex">
            redeFlex
          </h1>
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

      <section className="bg-[#999999] h-screen">
        <div className="h-full">
          <div className="flex items-center justify-center h-full" data-testid="div-2">
            <img
              className="w-full h-full object-cover"
              alt="Hero Section - Chamados"
              src={heroImage}
            />
          </div>
        </div>
      </section>

      <section className="bg-[#666666] py-12 md:py-16 px-4 md:px-8 lg:px-16 mt-[0px] mb-[0px] ml-[0px] mr-[0px] pt-[0px] pb-[0px] pl-[64px] pr-[64px]">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center justify-center h-[120px]" data-testid="div-3">
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black">DIV 3</h3>
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
              <motion.div
                key={`card-${index}`}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0px 10px 20px rgba(0,0,0,0.3)",
                }}
                whileTap={{ scale: 0.95 }}
                className="cursor-pointer"
              >
                <Card
                  className="h-[180px] md:h-[200px] bg-[#f5ad11] rounded-[10px] shadow-[0px_4px_4px_#00000040] border-2 border-transparent hover:border-[#9e090f] hover:bg-[#d69810] transition-all duration-300"
                >
                  <CardContent className="flex flex-col items-center justify-center h-full p-4">
                    {card.icon}
                    <h3 className="font-semibold text-black text-lg md:text-xl text-center">
                      {card.title}
                    </h3>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <Button 
                className="bg-[#af0000] rounded-[10px] px-8 py-3 text-sm font-medium text-neutral-50 border-2 border-transparent hover:border-[#f5ad11] hover:bg-[#8a0000] hover:shadow-lg transition-all duration-300"
              >
                Saber mais
              </Button>
            </motion.div>
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
              <motion.div 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
                className="inline-block"
              >
                <Button 
                  className="bg-[#f5ad11] rounded-[10px] px-8 py-3 text-sm font-medium text-neutral-50 border-2 border-transparent hover:border-[#9e090f] hover:bg-[#d69810] hover:shadow-lg transition-all duration-300"
                >
                  Acessar portfolio
                </Button>
              </motion.div>
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
              <motion.div 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
                className="inline-block"
              >
                <Button 
                  className="bg-[#f5ad11] rounded-[10px] px-8 py-3 text-sm font-medium text-neutral-50 border-2 border-transparent hover:border-[#9e090f] hover:bg-[#d69810] hover:shadow-lg transition-all duration-300"
                >
                  Contribuir agora
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
