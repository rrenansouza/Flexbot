import { motion } from "framer-motion";
import { Link } from "wouter";
import logoImage from "@assets/Gemini_Generated_Image_r1r30mr1r30mr1r3 1 (1)_1759432339653.png";

export const BugPage = (): JSX.Element => {
  const navigationItems = [
    { label: "Home", path: "/" },
    { label: "Suporte", path: "/" },
    { label: "Chamados", path: "/" },
  ];

  return (
    <div className="bg-white w-full min-h-screen [font-family:'Poppins',Helvetica]">
      <header className="bg-[#9e090f] w-full py-6 px-4 md:px-8 lg:px-16 pt-[10px] pb-[10px]">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <Link href="/">
            <img
              src={logoImage}
              alt="redeFlex"
              className="h-8 md:h-10 w-auto cursor-pointer"
              data-testid="logo-redeflex"
            />
          </Link>
          <nav className="flex flex-wrap gap-6 md:gap-8 lg:gap-12 justify-center">
            {navigationItems.map((item, index) => (
              <Link key={`nav-${index}`} href={item.path}>
                <motion.div
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
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <section className="bg-[#9e090f] py-16 md:py-20 lg:py-24 px-4 md:px-8 lg:px-16">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
            <div>
              <h1 className="font-bold text-white text-4xl md:text-5xl lg:text-6xl leading-[1.2] mb-6" data-testid="text-title">
                O QUE É UM BUG?
              </h1>
              <p className="text-white font-light text-base md:text-lg lg:text-xl leading-[1.8]" data-testid="text-description">
                ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. it has survived not only five centuries. ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. it has survived not only five centuries
              </p>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-[400px] h-[300px] bg-[#f5ad11] rounded-[40px] flex items-center justify-center relative" data-testid="div-bug-illustration">
                <div className="text-8xl">🐞</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20 lg:py-24 px-4 md:px-8 lg:px-16">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
            <div className="flex justify-center lg:justify-start">
              <div className="w-[200px] h-[200px] bg-[#6366f1] rounded-[20px] flex items-center justify-center" data-testid="div-icon">
                <div className="text-7xl">📋</div>
              </div>
            </div>
            <div>
              <h2 className="font-bold text-[#141b3a] text-3xl md:text-4xl lg:text-5xl leading-[1.2] mb-6" data-testid="text-subtitle">
                COMO INSTRUIR A ABERTURA DO CHAMADO
              </h2>
              <p className="text-[#141b3a] font-light text-base md:text-lg lg:text-xl leading-[1.8] mb-8" data-testid="text-instructions">
                ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. it has survived not only five centuries. ever since the 1500s
              </p>
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ y: 2, boxShadow: "0px 2px 8px rgba(0,0,0,0.3)" }}
                className="cursor-pointer px-10 py-4 bg-[#f5ad11] text-white font-semibold text-base rounded-lg shadow-[0px_6px_0px_0px_#d69810,0px_8px_15px_rgba(0,0,0,0.3)] hover:shadow-[0px_4px_0px_0px_#d69810,0px_6px_12px_rgba(0,0,0,0.3)] transition-all duration-200"
                data-testid="button-abrir-chamado"
              >
                Abrir chamado
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#9e090f] py-16 md:py-20 lg:py-24 px-4 md:px-8 lg:px-16">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="font-bold text-white text-3xl md:text-4xl lg:text-5xl text-center mb-12" data-testid="text-outras-categorias">
            VEJA OUTRAS CATEGORIAS
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[1, 2, 3].map((item) => (
              <motion.div
                key={`category-${item}`}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0px 10px 20px rgba(0,0,0,0.3)",
                }}
                className="h-[200px] bg-[#d9d9d9] rounded-[20px] cursor-pointer"
                data-testid={`card-categoria-${item}`}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
