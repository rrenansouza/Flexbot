import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export const LandingPageFlexbot = (): JSX.Element => {
  const navigationItems = [
    { label: "Home", position: "left-[407px]" },
    { label: "Suporte", position: "left-[689px]" },
    { label: "Chamados", position: "left-[981px]" },
  ];

  const processSteps = [
    { number: "1", title: "Abertura de ocorrência", top: "top-[433px]" },
    { number: "2", title: "Contextualização", top: "top-[528px]" },
    { number: "3", title: "Atendimento direcionado", top: "top-[624px]" },
    { number: "4", title: "Acompanhamento e interações", top: "top-[721px]" },
  ];

  const serviceCards = [
    { title: "Projeto", left: "left-[104px]", icon: null },
    { title: "Chamado", left: "left-[417px]", icon: "/figmaAssets/info.png" },
    { title: "Bug", left: "left-[730px]", icon: "/figmaAssets/bug.png" },
    { title: "Melhoria", left: "left-[1043px]", icon: null },
  ];

  return (
    <div className="bg-white w-full min-w-[1440px] min-h-[3683px] relative overflow-x-hidden">
      <div className="absolute top-[3064px] left-0 w-[598px] h-[619px] rounded-[0px_363px_0px_0px] bg-[linear-gradient(270deg,rgba(255,255,255,1)_18%,rgba(158,9,15,1)_52%)]" />

      <div className="absolute top-[759px] left-0 w-[1440px] h-[531px] bg-[#f2f2f2]" />

      <div className="absolute top-[131px] left-0 w-[1440px] h-[930px] bg-[#9e090f] rounded-[0px_0px_0px_287px]" />

      {processSteps.map((step, index) => (
        <div
          key={`step-${index}`}
          className={`absolute ${step.top} left-[1108px] [font-family:'Poppins',Helvetica] font-medium text-white text-base tracking-[0] leading-10 whitespace-nowrap`}
        >
          {step.title}
        </div>
      ))}

      <div className="absolute top-0 left-0 w-[1440px] h-[131px] bg-[#f2f2f2]" />

      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button className="absolute top-[541px] left-[148px] w-[195px] h-[55px] bg-[#f5ad11] rounded-[10px] h-auto hover:bg-[#d69810] hover:shadow-lg transition-all duration-300">
          <span className="[font-family:'Poppins',Helvetica] font-bold text-neutral-50 text-lg tracking-[0] leading-10">
            Saber mais
          </span>
        </Button>
      </motion.div>

      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button className="absolute top-[1723px] left-[558px] w-[323px] h-[70px] bg-[#af0000] rounded-[10px] h-auto hover:bg-[#8a0000] hover:shadow-lg transition-all duration-300">
          <span className="[font-family:'Poppins',Helvetica] font-bold text-neutral-50 text-xl tracking-[0] leading-10">
            Saber mais
          </span>
        </Button>
      </motion.div>

      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button className="absolute top-[2728px] left-[558px] w-[323px] h-[70px] bg-[#f5ad11] rounded-[10px] h-auto hover:bg-[#d69810] hover:shadow-lg transition-all duration-300">
          <span className="[font-family:'Poppins',Helvetica] font-bold text-neutral-50 text-xl tracking-[0] leading-10">
            Acessar portfolio
          </span>
        </Button>
      </motion.div>

      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button className="absolute top-[3506px] left-[872px] w-[323px] h-[70px] bg-[#f5ad11] rounded-[10px] h-auto hover:bg-[#d69810] hover:shadow-lg transition-all duration-300">
          <span className="[font-family:'Poppins',Helvetica] font-bold text-neutral-50 text-xl tracking-[0] leading-10">
            Contribuir agora
          </span>
        </Button>
      </motion.div>

      <h1 className="absolute top-[167px] left-[84px] w-[1161px] [font-family:'Poppins',Helvetica] font-semibold text-white text-[64px] tracking-[0] leading-[62px]">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry.
      </h1>

      <h2 className="top-[1118px] left-[209px] absolute w-[1022px] [font-family:'Poppins',Helvetica] font-semibold text-[#141b3a] text-6xl text-center tracking-[0] leading-[62px]">
        Lorem Ipsum is simply dummy text of the printing and typeset
      </h2>

      <h2 className="top-[1984px] left-[57px] absolute w-[1022px] [font-family:'Poppins',Helvetica] font-semibold text-[#141b3a] text-6xl text-center tracking-[0] leading-[62px]">
        Lorem Ipsum is simply dummy text of the printing and typeset
      </h2>

      <h2 className="absolute top-[3064px] left-[731px] w-[606px] [font-family:'Poppins',Helvetica] font-semibold text-[#141b3a] text-6xl tracking-[0] leading-[62px]">
        Lorem Ipsum is simply dummy
      </h2>

      <p className="absolute top-[2144px] left-[104px] w-[673px] [font-family:'Poppins',Helvetica] font-light text-[#141b3a] text-[32px] tracking-[0] leading-10">
        ever since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </p>

      <p className="top-[1321px] left-[250px] w-[939px] text-[#141b3a] absolute [font-family:'Poppins',Helvetica] font-light text-[32px] tracking-[0] leading-10">
        ever since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen
      </p>

      <p className="top-[3213px] left-[731px] w-[673px] text-[#141b3a] absolute [font-family:'Poppins',Helvetica] font-light text-[32px] tracking-[0] leading-10">
        ever since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries
      </p>

      <div className="absolute top-[611px] left-[517px] w-[452px] h-[450px] rounded-[100px_100px_0px_0px] bg-[linear-gradient(180deg,rgba(248,253,255,1)_70%,rgba(158,9,15,1)_97%)]" />

      <motion.img
        className="absolute top-[389px] left-[451px] w-[538px] h-[629px] object-cover"
        alt="Image"
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

      <div className="absolute top-[424px] left-[1043px] w-[52px] h-[54px] bg-[#d9d9d9] rounded-[10px]" />

      {serviceCards.map((card, index) => (
        <motion.div
          key={`card-${index}`}
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0px 10px 20px rgba(0,0,0,0.3)",
          }}
          whileTap={{ scale: 0.95 }}
          className={`absolute top-[1447px] ${card.left} cursor-pointer`}
        >
          <Card
            className="w-[293px] h-[207px] bg-[#f5ad11] rounded-[10px] shadow-[0px_4px_4px_#00000040] border-0 hover:bg-[#d69810] transition-all duration-300"
          >
            <CardContent className="flex flex-col items-center justify-center h-full p-0">
              {card.icon && (
                <motion.img
                  className="w-[90px] h-[90px] mb-4"
                  alt={card.title}
                  src={card.icon}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                />
              )}
              <h3 className="[font-family:'Poppins',Helvetica] font-semibold text-black text-2xl text-center tracking-[0] leading-[62px]">
                {card.title}
              </h3>
            </CardContent>
          </Card>
        </motion.div>
      ))}

      <img
        className="absolute top-[2149px] left-[834px] w-[528px] h-[486px] object-cover"
        alt="Image"
        src="/figmaAssets/image-4.png"
      />

      <img
        className="absolute top-[41px] left-[23px] w-[195px] h-12 object-cover"
        alt="Image"
        src="/figmaAssets/image-7.png"
      />

      <img
        className="absolute top-[800px] left-[647px] w-[124px] h-[49px] object-cover"
        alt="Image"
        src="/figmaAssets/image-7.png"
      />

      <nav className="absolute top-[45px]">
        {navigationItems.map((item, index) => (
          <motion.div
            key={`nav-${index}`}
            className={`absolute ${item.position} [font-family:'Poppins',Helvetica] font-semibold text-[#111423] text-xl tracking-[0] leading-10 whitespace-nowrap cursor-pointer`}
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

      <img
        className="absolute top-[3101px] left-[84px] w-[549px] h-[545px]"
        alt="Image"
        src="/figmaAssets/image-6.png"
      />

      <p className="top-[382px] left-[84px] w-[673px] text-neutral-50 absolute [font-family:'Poppins',Helvetica] font-light text-[32px] tracking-[0] leading-10">
        ever since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make
      </p>

      <img
        className="absolute top-[478px] left-[1065px] w-[11px] h-[369px]"
        alt="Arrow"
        src="/figmaAssets/arrow-1.svg"
      />

      <div className="absolute top-[521px] left-[1043px] w-[52px] h-[54px] bg-[#d9d9d9] rounded-[10px]" />

      <div className="absolute top-[714px] left-[1043px] w-[52px] h-[55px] bg-[#d9d9d9] rounded-[10px]" />

      <div className="absolute top-[617px] left-[1043px] w-[52px] h-[55px] bg-[#d9d9d9] rounded-[10px]" />

      <div className="absolute top-[816px] left-[1108px] [font-family:'Poppins',Helvetica] font-medium text-white text-base tracking-[0] leading-10 whitespace-nowrap">
        Resolução e publicação
      </div>

      {processSteps.map((step, index) => (
        <div
          key={`step-number-${index}`}
          className={`absolute ${step.top} left-[1062px] [font-family:'Poppins',Helvetica] font-bold text-[#9e090f] text-2xl tracking-[0] leading-10 whitespace-nowrap`}
        >
          {step.number}
        </div>
      ))}
    </div>
  );
};
