import { motion } from "framer-motion";
import { Link, useLocation } from "wouter";
import { FaChartLine, FaInfoCircle } from "react-icons/fa";
import { FaArrowTrendUp } from "react-icons/fa6";
import logoImage from "@assets/Gemini_Generated_Image_r1r30mr1r30mr1r3 1 (1)_1759432339653.png";
import footerLogo from "@assets/Gemini_Generated_Image_zi2slpzi2slpzi2s 1 1.png";
import bugImage from "@assets/Gemini_Generated_Image_s0o4o4s0o4o4s0o4 1_1759514036038.png";
import instructionsImage from "@assets/image_1759516963667.png";

export const BugPage = (): JSX.Element => {
  const [, setLocation] = useLocation();
  
  const navigationItems = [
    { label: "Home", path: "/" },
    { label: "Suporte", path: "/" },
    { label: "Chamados", path: "/" },
  ];

  const otherCategories = [
    { title: "Projeto", icon: <FaChartLine className="w-[60px] h-[60px]" />, path: "/projeto" },
    { title: "Chamado", icon: <FaInfoCircle className="w-[60px] h-[60px]" />, path: "/chamado" },
    { title: "Melhoria", icon: <FaArrowTrendUp className="w-[60px] h-[60px]" />, path: "/melhoria" },
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

      <section className="bg-[#9e090f] min-h-screen flex items-center px-4 md:px-8 lg:px-16">
        <div className="max-w-[1400px] mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
            <div>
              <h1 className="font-bold text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-[1.2] mb-3 sm:mb-4 md:mb-6" data-testid="text-title">
                O QUE É UM BUG?
              </h1>
              <p className="text-white font-light text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl leading-[1.6] mb-3 sm:mb-4 md:mb-6" data-testid="text-description">
                Bug é uma falha técnica em um sistema, software ou aplicação. Ele pode ser visível (como uma tela que não carrega) ou invisível (um cálculo errado em segundo plano).
              </p>
              <p className="text-white font-light text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl leading-[1.6] mb-2" data-testid="text-exemplos-title">
                Exemplos de bugs:
              </p>
              <ul className="text-white font-light text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl leading-[1.6] mb-4 sm:mb-6 md:mb-8 space-y-1 sm:space-y-2" data-testid="text-exemplos-list">
                <li>Erros de interface: botão que não funciona.</li>
                <li>Erros de processamento: sistema grava dados incorretos.</li>
                <li>Erros críticos: sistema trava ou derruba todos os usuários.</li>
              </ul>
              <button
                className="glow-btn"
                data-testid="button-abrir-ticket"
              >
                Abrir ticket
              </button>
            </div>
            <div className="flex justify-center lg:justify-end mt-6 lg:mt-0">
              <div className="w-full flex items-center justify-center" data-testid="div-box-vermelho">
                <img src={bugImage} alt="Bug illustration" className="w-[200px] h-[200px] sm:w-[260px] sm:h-[260px] md:w-[320px] md:h-[320px] lg:w-[380px] lg:h-[380px] xl:w-[450px] xl:h-[450px] object-contain" data-testid="img-bug-hero" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white min-h-screen flex items-center px-4 md:px-8 lg:px-16">
        <div className="max-w-[1400px] mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
            <div className="flex justify-center lg:justify-start mt-6 lg:mt-0">
              <div className="w-full flex items-center justify-center" data-testid="div-box-cinza-1">
                <img src={instructionsImage} alt="Instruções para abertura do ticket" className="w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] md:w-[440px] md:h-[440px] lg:w-[520px] lg:h-[520px] xl:w-[600px] xl:h-[600px] object-contain" />
              </div>
            </div>
            <div>
              <h2 className="font-bold text-[#141b3a] text-base sm:text-lg md:text-xl lg:text-2xl leading-[1.2] mb-1.5 sm:mb-2 md:mb-3" data-testid="text-registro-bug">
                Registro de Bug
              </h2>
              <p className="text-[#141b3a] font-normal text-[9px] sm:text-[10px] md:text-xs lg:text-sm leading-[1.4] mb-1.5 sm:mb-2 md:mb-2.5" data-testid="text-intro">
                Ao abrir um ticket de Bug, é essencial fornecer informações completas e detalhadas. Quanto mais clara for a descrição, mais rápida e assertiva será a solução aplicada.
              </p>
              
              <h3 className="font-bold text-[#141b3a] text-xs sm:text-sm md:text-base lg:text-lg leading-[1.2] mb-1" data-testid="text-passos">
                Passos para registro
              </h3>
              <ul className="space-y-0.5 sm:space-y-1 text-[#141b3a] font-normal text-[9px] sm:text-[10px] md:text-xs lg:text-sm leading-[1.4] mb-1.5 sm:mb-2 md:mb-2.5">
                <li className="flex items-start gap-1.5" data-testid="list-item-1">
                  <span className="mt-0.5">•</span>
                  <span>Informe em qual sistema, tela ou funcionalidade ocorreu o problema.</span>
                </li>
                <li className="flex items-start gap-1.5" data-testid="list-item-2">
                  <span className="mt-0.5">•</span>
                  <span>Explique o passo a passo que levou ao erro (isso ajuda na reprodução do bug).</span>
                </li>
                <li className="flex items-start gap-1.5" data-testid="list-item-3">
                  <span className="mt-0.5">•</span>
                  <span>Especifique o impacto: impede totalmente o uso? É intermitente? Afeta mais de um usuário?</span>
                </li>
              </ul>

              <h3 className="font-bold text-[#141b3a] text-xs sm:text-sm md:text-base lg:text-lg leading-[1.2] mb-1" data-testid="text-detalhamento">
                Detalhamento do problema
              </h3>
              <p className="text-[#141b3a] font-normal text-[9px] sm:text-[10px] md:text-xs lg:text-sm leading-[1.4] mb-1.5 sm:mb-2 md:mb-2.5" data-testid="text-detalhamento-desc">
                Descreva muito bem o problema com o máximo de detalhes possíveis. Sempre tenha em mente que, na abertura de um ticket, é como se estivesse explicando para um funcionário no primeiro dia de trabalho. Quanto mais didático for o relato, mais assertiva será a atuação no chamado.
              </p>

              <h3 className="font-bold text-[#141b3a] text-xs sm:text-sm md:text-base lg:text-lg leading-[1.2] mb-1" data-testid="text-criticidade">
                Criticidade do ticket
              </h3>
              <p className="text-[#141b3a] font-normal text-[9px] sm:text-[10px] md:text-xs lg:text-sm leading-[1.4] mb-1.5 sm:mb-2 md:mb-2.5" data-testid="text-criticidade-desc">
                Disserte sobre a criticidade do problema. Evite utilizar apenas o termo "Urgente". Explique o que realmente afeta na rotina e quais usuários estão sendo impactados.
              </p>

              <h3 className="font-bold text-[#141b3a] text-xs sm:text-sm md:text-base lg:text-lg leading-[1.2] mb-1" data-testid="text-evidencias">
                Evidências
              </h3>
              <p className="text-[#141b3a] font-normal text-[9px] sm:text-[10px] md:text-xs lg:text-sm leading-[1.4]" data-testid="text-evidencias-desc">
                Sempre que possível, traga prints de tela, mensagens de erro ou outras evidências que ajudem a enriquecer as informações fornecidas. Isso agiliza a análise e a resolução.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white min-h-screen flex items-center px-4 md:px-8 lg:px-16">
        <div className="max-w-[1400px] mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
            <div>
              <p className="text-[#141b3a] font-normal text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl leading-[1.6] mb-3 sm:mb-4 md:mb-6" data-testid="text-detalhes">
                Relate com detalhes a sequência de ações que provocou o erro. Evite termos vagos como:
              </p>
              <p className="text-[#141b3a] font-bold text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl leading-[1.6]" data-testid="text-exemplo">
                "não abre" e descreva o contexto exato (ex.: "Ao clicar em Salvar, a tela fecha sem gravar os dados").
              </p>
            </div>
            <div className="flex justify-center lg:justify-end mt-6 lg:mt-0">
              <div className="w-full flex items-center justify-center" data-testid="div-box-cinza-2">
                <img src={bugImage} alt="Bug illustration" className="w-[200px] h-[200px] sm:w-[260px] sm:h-[260px] md:w-[320px] md:h-[320px] lg:w-[380px] lg:h-[380px] xl:w-[450px] xl:h-[450px] object-contain" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#9e090f] min-h-screen flex items-center px-4 md:px-8 lg:px-16">
        <div className="max-w-[1400px] mx-auto w-full">
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
