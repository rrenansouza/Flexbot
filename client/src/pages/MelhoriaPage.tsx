import { motion } from "framer-motion";
import { Link, useLocation } from "wouter";
import { FaBug, FaChartLine, FaInfoCircle } from "react-icons/fa";
import logoImage from "@assets/Gemini_Generated_Image_r1r30mr1r30mr1r3 1 (1)_1759432339653.png";
import footerLogo from "@assets/Gemini_Generated_Image_zi2slpzi2slpzi2s 1 1.png";

export const MelhoriaPage = (): JSX.Element => {
  const [, setLocation] = useLocation();
  
  const navigationItems = [
    { label: "Home", path: "/" },
    { label: "Suporte", path: "/" },
    { label: "Chamados", path: "/" },
  ];

  const otherCategories = [
    { title: "Projeto", icon: <FaChartLine className="w-[60px] h-[60px]" />, path: "/projeto" },
    { title: "Chamado", icon: <FaInfoCircle className="w-[60px] h-[60px]" />, path: "/chamado" },
    { title: "Bug", icon: <FaBug className="w-[60px] h-[60px]" />, path: "/bug" },
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
                O QUE É UMA MELHORIA?
              </h1>
              <p className="text-white font-light text-base md:text-lg leading-[1.7] mb-8" data-testid="text-description">
                Melhoria é uma sugestão ou proposta para otimizar processos, funcionalidades ou experiência do usuário, visando aumentar eficiência e qualidade.
              </p>
              <button
                className="glow-btn"
                data-testid="button-abrir-ticket"
              >
                Abrir ticket
              </button>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-[400px] h-[300px] bg-[#c41e3a] rounded-[12px]" data-testid="div-box-vermelho"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20 lg:py-24 px-4 md:px-8 lg:px-16">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-start">
            <div className="flex justify-center lg:justify-start">
              <div className="w-full max-w-[400px] h-[350px] bg-[#d9d9d9] rounded-[12px]" data-testid="div-box-cinza-1"></div>
            </div>
            <div>
              <ul className="space-y-4 text-[#141b3a] font-normal text-base md:text-lg leading-[1.7]">
                <li className="flex items-start gap-3" data-testid="list-item-1">
                  <span className="mt-1">•</span>
                  <span>Descreva claramente qual funcionalidade ou processo você deseja melhorar.</span>
                </li>
                <li className="flex items-start gap-3" data-testid="list-item-2">
                  <span className="mt-1">•</span>
                  <span>Explique os benefícios esperados e como a melhoria impactará positivamente os usuários.</span>
                </li>
                <li className="flex items-start gap-3" data-testid="list-item-3">
                  <span className="mt-1">•</span>
                  <span>Forneça exemplos ou referências que ilustrem sua sugestão de forma prática.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20 lg:py-24 px-4 md:px-8 lg:px-16">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-start">
            <div>
              <p className="text-[#141b3a] font-normal text-base md:text-lg leading-[1.7] mb-6" data-testid="text-detalhes">
                Seja específico sobre o problema atual e como a melhoria proposta resolve ou otimiza. Por exemplo:
              </p>
              <p className="text-[#141b3a] font-bold text-base md:text-lg leading-[1.7]" data-testid="text-exemplo">
                "Adicionar um filtro de data no relatório reduziria o tempo de busca em 50% e melhoraria a experiência".
              </p>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-[400px] h-[250px] bg-[#d9d9d9] rounded-[12px]" data-testid="div-box-cinza-2"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#9e090f] py-16 md:py-20 lg:py-24 px-4 md:px-8 lg:px-16">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="font-bold text-white text-3xl md:text-4xl lg:text-5xl text-center mb-12" data-testid="text-outras-categorias">
            VEJA AS OUTRAS CATEGORIAS
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {otherCategories.map((category, index) => (
              <div
                key={`category-${index}`}
                className="glow-card cursor-pointer"
                onClick={() => setLocation(category.path)}
                data-testid={`card-categoria-${category.title.toLowerCase()}`}
              >
                <div className="text-[#0e0e0e]">
                  {category.icon}
                </div>
                <h3 className="font-bold text-lg md:text-xl text-center mt-4 text-[#0e0e0e]">
                  {category.title}
                </h3>
              </div>
            ))}
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
