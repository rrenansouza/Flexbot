import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { FaChartLine, FaInfoCircle, FaBug } from "react-icons/fa";
import { FaArrowTrendUp } from "react-icons/fa6";

export const LandingPageFlexbot = (): JSX.Element => {
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
    { title: "Projeto", icon: <FaChartLine className="w-[90px] h-[90px] mb-4" /> },
    { title: "Chamado", icon: <FaInfoCircle className="w-[90px] h-[90px] mb-4" /> },
    { title: "Bug", icon: <FaBug className="w-[90px] h-[90px] mb-4" /> },
    { title: "Melhoria", icon: <FaArrowTrendUp className="w-[90px] h-[90px] mb-4" /> },
  ];

  return (
    <div className="bg-white w-full min-h-screen [font-family:'Poppins',Helvetica]">
      <header className="bg-[#f2f2f2] w-full py-6 px-4 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <img
            className="w-[150px] md:w-[195px] h-auto mb-4 md:mb-0"
            alt="Logo"
            src="/figmaAssets/image-7.png"
          />
          <nav className="flex flex-wrap gap-4 md:gap-8 lg:gap-12 justify-center">
            {navigationItems.map((item, index) => (
              <motion.div
                key={`nav-${index}`}
                className="font-semibold text-[#111423] text-lg md:text-xl cursor-pointer"
                whileHover={{ 
                  color: "#9e090f",
                  scale: 1.1,
                }}
                transition={{ duration: 0.2 }}
              >
                {item.label}
              </motion.div>
            ))}
          </nav>
        </div>
      </header>

      <section className="bg-[#9e090f] rounded-bl-[100px] md:rounded-bl-[200px] lg:rounded-bl-[287px] py-12 px-4 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-semibold text-white text-3xl md:text-5xl lg:text-[64px] leading-tight mb-6">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </h1>
          <p className="text-neutral-50 font-light text-xl md:text-2xl lg:text-[32px] leading-relaxed mb-8 max-w-3xl">
            ever since the 1500s, when an unknown printer took a galley of type and
            scrambled it to make
          </p>
          <motion.div 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <Button 
              className="bg-[#f5ad11] rounded-[10px] px-8 py-6 text-lg md:text-xl font-bold text-neutral-50 border-2 border-transparent hover:border-[#fff] hover:bg-[#d69810] hover:shadow-lg transition-all duration-300"
            >
              Saber mais
            </Button>
          </motion.div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-12 flex justify-center">
          <div className="relative">
            <div className="w-[280px] md:w-[380px] lg:w-[452px] h-[280px] md:h-[380px] lg:h-[450px] rounded-t-[80px] md:rounded-t-[100px] bg-[linear-gradient(180deg,rgba(248,253,255,1)_70%,rgba(158,9,15,1)_97%)]" />
            <motion.img
              className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-[300px] md:w-[400px] lg:w-[538px] h-auto object-cover"
              alt="Hero Bot"
              src="/figmaAssets/image-3.png"
              animate={{
                y: [0, -20, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </div>

        <div className="max-w-4xl mx-auto mt-16 px-4">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="flex flex-col gap-4">
              {processSteps.map((step, index) => (
                <div key={`step-${index}`} className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#d9d9d9] rounded-[10px] flex items-center justify-center">
                    <span className="font-bold text-[#9e090f] text-xl">{step.number}</span>
                  </div>
                  <span className="font-medium text-white text-sm md:text-base">
                    {step.title}
                  </span>
                </div>
              ))}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#d9d9d9] rounded-[10px]" />
                <span className="font-medium text-white text-sm md:text-base">
                  Resolução e publicação
                </span>
              </div>
            </div>
            <div className="hidden md:block">
              <img
                className="w-3 h-[300px] lg:h-[369px]"
                alt="Arrow"
                src="/figmaAssets/arrow-1.svg"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f2f2f2] py-16 px-4 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto text-center mb-8">
          <img
            className="w-[100px] md:w-[124px] h-auto mx-auto mb-8"
            alt="Logo"
            src="/figmaAssets/image-7.png"
          />
          <h2 className="font-semibold text-[#141b3a] text-3xl md:text-5xl lg:text-6xl leading-tight mb-6">
            Lorem Ipsum is simply dummy text of the printing and typeset
          </h2>
          <p className="text-[#141b3a] font-light text-xl md:text-2xl lg:text-[32px] leading-relaxed max-w-4xl mx-auto">
            ever since the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
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
                className="h-[207px] bg-[#f5ad11] rounded-[10px] shadow-[0px_4px_4px_#00000040] border-2 border-transparent hover:border-[#9e090f] hover:bg-[#d69810] transition-all duration-300"
              >
                <CardContent className="flex flex-col items-center justify-center h-full p-4">
                  {card.icon}
                  <h3 className="font-semibold text-black text-xl md:text-2xl text-center">
                    {card.title}
                  </h3>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto text-center mt-12">
          <motion.div 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <Button 
              className="bg-[#af0000] rounded-[10px] px-12 py-8 text-xl font-bold text-neutral-50 border-2 border-transparent hover:border-[#f5ad11] hover:bg-[#8a0000] hover:shadow-lg transition-all duration-300"
            >
              Saber mais
            </Button>
          </motion.div>
        </div>
      </section>

      <section className="py-16 px-4 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-semibold text-[#141b3a] text-3xl md:text-5xl lg:text-6xl leading-tight mb-6 text-center md:text-left">
            Lorem Ipsum is simply dummy text of the printing and typeset
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-[#141b3a] font-light text-xl md:text-2xl lg:text-[32px] leading-relaxed">
                ever since the 1500s, when an unknown printer took a galley of type and
                scrambled it to make a type specimen book. It has survived not only five
                centuries, but also the leap into electronic typesetting, remaining
                essentially unchanged. It was popularised in the 1960s with the release
                of Letraset sheets containing Lorem Ipsum passages, and more recently
                with desktop publishing software like Aldus PageMaker including versions
                of Lorem Ipsum.
              </p>
            </div>
            <div className="flex justify-center">
              <img
                className="w-full max-w-[528px] h-auto object-cover"
                alt="Image"
                src="/figmaAssets/image-4.png"
              />
            </div>
          </div>
          <div className="text-center mt-12">
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <Button 
                className="bg-[#f5ad11] rounded-[10px] px-12 py-8 text-xl font-bold text-neutral-50 border-2 border-transparent hover:border-[#9e090f] hover:bg-[#d69810] hover:shadow-lg transition-all duration-300"
              >
                Acessar portfolio
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 md:px-8 lg:px-12 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[300px] md:w-[450px] lg:w-[598px] h-[400px] md:h-[500px] lg:h-[619px] rounded-tr-[150px] md:rounded-tr-[250px] lg:rounded-tr-[363px] bg-[linear-gradient(270deg,rgba(255,255,255,1)_18%,rgba(158,9,15,1)_52%)]" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="flex justify-center">
              <img
                className="w-full max-w-[549px] h-auto"
                alt="Image"
                src="/figmaAssets/image-6.png"
              />
            </div>
            <div>
              <h2 className="font-semibold text-[#141b3a] text-3xl md:text-5xl lg:text-6xl leading-tight mb-6">
                Lorem Ipsum is simply dummy
              </h2>
              <p className="text-[#141b3a] font-light text-xl md:text-2xl lg:text-[32px] leading-relaxed mb-8">
                ever since the 1500s, when an unknown printer took a galley of type and
                scrambled it to make a type specimen book. It has survived not only five
                centuries
              </p>
              <motion.div 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
                className="inline-block"
              >
                <Button 
                  className="bg-[#f5ad11] rounded-[10px] px-12 py-8 text-xl font-bold text-neutral-50 border-2 border-transparent hover:border-[#9e090f] hover:bg-[#d69810] hover:shadow-lg transition-all duration-300"
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
