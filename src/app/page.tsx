"use client";

import { useRef, useState, useEffect, useCallback, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Brain, Users, Sparkles, Heart,
  Instagram, Calendar, Monitor, Lock,
  Menu, X, ChevronLeft, ChevronRight,
  MessageCircle, CalendarDays, RotateCcw,
} from "lucide-react";
import { PhotoSlot } from "@/components/site/PhotoSlot";
import { BLUR_HERO, BLUR_SOBRE } from "@/lib/blur-placeholder";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// ⚠️  SUBSTITUA pelo número real antes de publicar
const WHATSAPP_URL = "https://wa.me/5511999999999";

const CIDADE = "São Paulo, SP";

/* ── Depoimentos — substitua pelos textos reais das pacientes ── */
const DEPOIMENTOS = [
  {
    text: "Depois de meses tentando lidar sozinha com a ansiedade, encontrei um espaço onde me sinto realmente ouvida. A Camila tem uma escuta genuína que me fez sentir acolhida desde a primeira sessão.",
    name: "Ana L.",
    contexto: "Ansiedade · Atendimento online",
  },
  {
    text: "O processo terapêutico mudou minha forma de enxergar meus relacionamentos. Aprendi a me comunicar melhor e a respeitar os meus próprios limites. Recomendo de coração.",
    name: "Mariana S.",
    contexto: "Vínculos familiares · Atendimento presencial",
  },
  {
    text: "Estava em um momento muito difícil depois de uma perda. A Camila me ajudou a atravessar o luto com mais leveza. Sou imensamente grata por esse cuidado.",
    name: "Patrícia R.",
    contexto: "Luto · Atendimento online",
  },
];

/* ── FAQ — perguntas mais frequentes ── */
const FAQS = [
  {
    q: "Como é a primeira sessão?",
    a: "A primeira sessão é uma conversa de acolhimento. Você fala um pouco sobre sua situação, seus objetivos e o que te trouxe à terapia. Não há nada certo ou errado — é um espaço seguro para você se sentir à vontade no seu próprio ritmo.",
  },
  {
    q: "O atendimento online funciona igual ao presencial?",
    a: "Sim. A Terapia Cognitivo-Comportamental online tem eficácia comprovada equivalente ao presencial. Muitas pessoas relatam mais conforto por estar em seu próprio ambiente. O que muda é apenas o meio — o cuidado e a presença são os mesmos.",
  },
  {
    q: "Quanto tempo leva para ver resultados?",
    a: "Cada processo é único. Algumas pessoas percebem mudanças significativas em poucas semanas; outras trabalham questões mais profundas ao longo de meses. O que importa é o seu ritmo — não existe prazo certo para se cuidar.",
  },
  {
    q: "E se eu não me sentir confortável?",
    a: "Sua segurança é prioridade. Se em algum momento você sentir que o processo não está funcionando, podemos conversar abertamente sobre isso. A relação terapêutica precisa ser um espaço de confiança — e construímos isso juntas.",
  },
  {
    q: "As sessões são sigilosas?",
    a: "Absolutamente. O sigilo é um princípio ético fundamental da psicologia, garantido pelo Código de Ética Profissional do CFP. Tudo que é compartilhado nas sessões é estritamente confidencial.",
  },
  {
    q: "Qual o valor das sessões?",
    a: "Os valores são informados diretamente pelo WhatsApp, de forma personalizada e sem compromisso. Entre em contato — será um prazer conversar com você.",
  },
];

/**
 * Caminhos das fotos — preencha quando tiver os arquivos em /public.
 *
 * Especificações recomendadas pelo Visual Layout Agent:
 *   hero  → foto vertical, 3:4, 840×1120px @2x, formato WebP
 *           Camila sentada, levemente inclinada, olhando para câmera
 *           Fundo: parede neutra clara, iluminação natural difusa
 *           Roupa: tom neutro frio (azul-cinza, off-white) — combina com a paleta
 *
 *   sobre → foto de detalhe/ambiente, 3:2, 760×520px @2x, formato WebP
 *           Detalhe de mesa, caderno, mãos — transmite cuidado e presença
 *           Mesma paleta de luz da foto hero para coerência visual
 */
const PHOTOS = {
  hero:  "/camila-sobre.jpg" as string | null,
  sobre: "/camila-hero.jpg" as string | null,
};

const NAV_ITEMS = ["sobre", "abordagem", "consultas", "contato"] as const;

const INSTAGRAM_REELS = [
  "DUsinOOjrge",
  "DUqdcxnDlFo",
  "DUlq3JhD2Rz",
  "DUS8wGVDlqp",
  "DUbT0HkjkPN",
];

const TOPICS = [
  { title: "Ansiedade e Depressão",  desc: "Tratamento especializado usando técnicas baseadas em evidências científicas que trazem clareza e equilíbrio de volta à sua vida.",    iconKey: "brain",    videoSrc: "/videos/ansiedade.mp4"      },
  { title: "Vínculos Familiares",     desc: "Fortalecimento de relacionamentos e resolução de conflitos através de comunicação assertiva e empática.",                              iconKey: "users",    videoSrc: "/videos/relacionamento.mp4" },
  { title: "Autoestima e Rejeição",   desc: "Desenvolvimento da autoconfiança e superação de padrões autodestrutivos com acolhimento genuíno.",                                     iconKey: "sparkles", videoSrc: "/videos/autoestima.mp4"     },
  { title: "Luto e Apoio Emocional",  desc: "Acompanhamento especializado no processo de luto e perdas significativas com sensibilidade e presença.",                              iconKey: "heart",    videoSrc: "/videos/luto.mp4"           },
];

const STEPS = [
  {
    n: "01",
    icon: <MessageCircle className="w-6 h-6" />,
    title: "Primeiro Contato",
    desc: "Entre em contato pelo WhatsApp. Vamos conversar sobre suas necessidades e esclarecer dúvidas com todo acolhimento.",
  },
  {
    n: "02",
    icon: <CalendarDays className="w-6 h-6" />,
    title: "Primeira Conversa",
    desc: "Marcamos nossa primeira sessão para nos conhecermos melhor. Você pode falar abertamente sobre sua situação.",
  },
  {
    n: "03",
    icon: <RotateCcw className="w-6 h-6" />,
    title: "Sessões Regulares",
    desc: "Iniciamos o processo terapêutico com sessões adaptadas ao seu ritmo, sempre com sigilo e respeito.",
  },
];

/**
 * Acessível: o container anuncia o texto completo, os spans individuais
 * são escondidos de screen readers (evita leitura letra-a-letra).
 */
function SplitChars({ text, className }: { text: string; className?: string }) {
  return (
    <span aria-label={text}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          aria-hidden="true"
          className={`split-char inline-block ${className ?? ""}`}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}

const TOPIC_ICONS: Record<string, { sm: ReactNode; lg: ReactNode }> = {
  brain:    { sm: <Brain    className="w-6 h-6" />, lg: <Brain    className="w-28 h-28" /> },
  users:    { sm: <Users    className="w-6 h-6" />, lg: <Users    className="w-28 h-28" /> },
  sparkles: { sm: <Sparkles className="w-6 h-6" />, lg: <Sparkles className="w-28 h-28" /> },
  heart:    { sm: <Heart    className="w-6 h-6" />, lg: <Heart    className="w-28 h-28" /> },
};

export default function CamilaPage() {
  const root = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [slide, setSlide] = useState(0);
  const [perPage, setPerPage] = useState(3);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [videosMuted, setVideosMuted] = useState(true);

  const unmuteAll = useCallback(() => {
    document.querySelectorAll<HTMLVideoElement>(".abordagem-video video").forEach((v) => { v.muted = false; });
    setVideosMuted(false);
  }, []);

  // Responsivo: itens por página no carrossel
  useEffect(() => {
    const update = () =>
      setPerPage(window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // IntersectionObserver para detectar seção ativa no nav
  useEffect(() => {
    const sections = NAV_ITEMS.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const maxSlide = Math.ceil(INSTAGRAM_REELS.length / perPage) - 1;

  const scrollTo = useCallback((id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // ── GSAP: cursor (só desktop + no-preference) ─────────────────────
  useGSAP(
    () => {
      const cursor = cursorRef.current;
      if (!cursor) return;

      gsap.matchMedia().add(
        "(pointer: fine) and (prefers-reduced-motion: no-preference)",
        () => {
          const xTo = gsap.quickTo(cursor, "x", { duration: 0.5, ease: "power3.out" });
          const yTo = gsap.quickTo(cursor, "y", { duration: 0.5, ease: "power3.out" });

          const onMove = (e: MouseEvent) => {
            xTo(e.clientX);
            yTo(e.clientY);
            gsap.to(cursor, { opacity: 1, duration: 0.3 });
          };

          const interactives = document.querySelectorAll<HTMLElement>("a, button");
          const enterFn = () =>
            gsap.to(cursor, { scale: 2.5, backgroundColor: "rgba(74,108,154,0.15)", duration: 0.3 });
          const leaveFn = () =>
            gsap.to(cursor, { scale: 1, backgroundColor: "rgba(74,108,154,0.08)", duration: 0.3 });

          window.addEventListener("mousemove", onMove);
          interactives.forEach((el) => {
            el.addEventListener("mouseenter", enterFn);
            el.addEventListener("mouseleave", leaveFn);
          });

          return () => {
            window.removeEventListener("mousemove", onMove);
            interactives.forEach((el) => {
              el.removeEventListener("mouseenter", enterFn);
              el.removeEventListener("mouseleave", leaveFn);
            });
          };
        }
      );
    },
    { scope: root }
  );

  // ── GSAP: animações de scroll ─────────────────────────────────────
  useGSAP(
    () => {
      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {

        // Hero: entrada sequenciada
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.from(".hero-badge", { y: 20, opacity: 0, duration: 0.6 })
          .from(".hero-chars .split-char", { y: 80, opacity: 0, stagger: 0.04, duration: 0.7 }, "-=0.2")
          .from(".hero-sub",  { y: 30, opacity: 0, duration: 0.7 }, "-=0.3")
          .from(".hero-ctas", { y: 20, opacity: 0, duration: 0.6 }, "-=0.3")
          .from(".hero-photo", { x: 60, opacity: 0, duration: 1, ease: "power2.out" }, 0.1)
          .from(".hero-float-1", { scale: 0, opacity: 0, duration: 0.8 }, "-=0.5")
          .from(".hero-float-2", { scale: 0, opacity: 0, duration: 0.8 }, "-=0.6")
          .from(".hero-tag", { scale: 0, opacity: 0, stagger: 0.12, duration: 0.6, ease: "back.out(1.7)" }, "-=0.5");

        // Sobre: parallax + reveal
        gsap.to(".sobre-bg-layer", {
          yPercent: -20,
          ease: "none",
          scrollTrigger: { trigger: "#sobre", start: "top bottom", end: "bottom top", scrub: true },
        });
        gsap.from(".sobre-text-block", {
          y: 50, opacity: 0, stagger: 0.15, duration: 0.9, ease: "power2.out",
          scrollTrigger: { trigger: "#sobre", start: "top 70%", toggleActions: "play none none reverse" },
        });
        gsap.from(".sobre-card", {
          x: 40, opacity: 0, duration: 0.8, ease: "power2.out",
          scrollTrigger: { trigger: ".sobre-card", start: "top 80%", toggleActions: "play none none reverse" },
        });

        // Abordagem: scroll pinned — troca de tema + cor de fundo
        const topicEls = gsap.utils.toArray<HTMLElement>(".abordagem-topic");
        const dotEls   = gsap.utils.toArray<HTMLElement>(".abordagem-dot");
        const topicBgs = ["#eef2f7", "#edf3ee", "#f4f0f8", "#f5f2ed"];
        const totalTopics = topicEls.length;

        if (totalTopics) {
          gsap.set(topicEls.slice(1), { opacity: 0, y: 40 });

          const videoEls = gsap.utils.toArray<HTMLElement>(".abordagem-video");
          (videoEls[0]?.querySelector("video") as HTMLVideoElement)?.play().catch(() => {});

          let current = 0;

          const goTo = (idx: number) => {
            if (idx === current) return;
            const prev = current;
            current = idx;

            // Prev some completamente, só então o próximo aparece
            gsap.to(topicEls[prev], {
              opacity: 0, y: prev < idx ? -40 : 40, duration: 0.3, ease: "power2.in",
              onComplete: () => {
                gsap.fromTo(topicEls[idx],
                  { opacity: 0, y: idx > prev ? 40 : -40 },
                  { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
                );
              },
            });
            videoEls[prev].querySelector("video")?.pause();
            gsap.to(videoEls[prev], { opacity: 0, pointerEvents: "none", duration: 0.3 });
            gsap.to(videoEls[idx], { opacity: 1, pointerEvents: "auto", duration: 0.45, delay: 0.3,
              onComplete: () => { if (current === idx) (videoEls[idx].querySelector("video") as HTMLVideoElement)?.play().catch(() => {}); },
            });

            gsap.to("body", { backgroundColor: topicBgs[idx], duration: 0.55 });
            dotEls.forEach((dot, i) => gsap.to(dot, { width: i === idx ? 24 : 8, backgroundColor: i === idx ? "#4a6c9a" : "rgba(74,108,154,0.25)", duration: 0.3 }));
          };

          ScrollTrigger.create({
            trigger: ".abordagem-pin",
            pin: true,
            start: "top top",
            end: "+=300%",
            onUpdate: (self) => goTo(Math.min(Math.floor(self.progress * 4), 3)),
            onLeave:      () => gsap.to("body", { backgroundColor: "#ffffff", duration: 0.5 }),
            onEnterBack:  () => gsap.to("body", { backgroundColor: topicBgs[current], duration: 0.5 }),
          });
        }

        // Consultas: cards sobem com stagger
        gsap.from(".step-item", {
          y: 50, opacity: 0, stagger: 0.18, duration: 0.9, ease: "power2.out",
          scrollTrigger: { trigger: ".consultas-steps", start: "top 72%", toggleActions: "play none none reverse" },
        });
        // Linha conectora revela da esquerda para direita
        gsap.from(".consult-connector", {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: { trigger: ".consultas-steps", start: "top 65%", toggleActions: "play none none reverse" },
        });

        // Quote: chars + author em timeline (sem delay hardcoded)
        const quoteTl = gsap.timeline({
          scrollTrigger: { trigger: ".quote-section", start: "top 70%", toggleActions: "play none none reverse" },
        });
        quoteTl
          .from(".quote-chars .split-char", { y: 40, opacity: 0, stagger: 0.02, duration: 0.6, ease: "power3.out" })
          .from(".quote-author", { y: 20, opacity: 0, duration: 0.7, ease: "power2.out" }, "-=0.1");

        // Reveal genérico
        gsap.utils.toArray<HTMLElement>(".reveal-up").forEach((el) => {
          gsap.from(el, {
            y: 40, opacity: 0, duration: 0.8, ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 80%", toggleActions: "play none none reverse" },
          });
        });

        // Transição de cor de fundo entre seções
        const bgMap: { trigger: string; color: string; back: string }[] = [
          { trigger: "#sobre",     color: "#f5f2ed", back: "#ffffff" },
          { trigger: "#consultas", color: "#ffffff", back: "#eef2f7" },
        ];
        bgMap.forEach(({ trigger, color, back }) => {
          ScrollTrigger.create({
            trigger,
            start: "top 50%",
            end: "bottom 50%",
            onEnter:     () => gsap.to("body", { backgroundColor: color, duration: 0.6 }),
            onLeaveBack: () => gsap.to("body", { backgroundColor: back,  duration: 0.6 }),
          });
        });
      });
    },
    { scope: root }
  );

  // Hover nos cards de tema — respeita prefers-reduced-motion
  const prefersReduced = useCallback(() =>
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches, []);

  const handleCardEnter = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReduced()) return;
    const circle = e.currentTarget.querySelector(".card-circle");
    gsap.to(circle, { scale: 1, opacity: 1, duration: 0.5, ease: "power2.out" });
  }, [prefersReduced]);

  const handleCardLeave = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReduced()) return;
    const circle = e.currentTarget.querySelector(".card-circle");
    gsap.to(circle, { scale: 0, opacity: 0, duration: 0.4, ease: "power2.in" });
  }, [prefersReduced]);

  return (
    <div ref={root} className="min-h-screen font-sans overflow-x-hidden">

      {/* Cursor customizado — hidden em touch via pointer:coarse no CSS */}
      <div
        ref={cursorRef}
        className="cursor-follower fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999] opacity-0 -translate-x-1/2 -translate-y-1/2"
        style={{ backgroundColor: "rgba(74,108,154,0.08)", border: "1px solid rgba(74,108,154,0.25)" }}
        aria-hidden="true"
      />

      {/* WhatsApp FAB */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Fale conosco pelo WhatsApp"
        className="fixed bottom-6 right-6 z-[100] w-14 h-14 bg-green-700 hover:bg-green-800 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400 focus-visible:ring-offset-2"
      >
        <WhatsAppIcon className="w-7 h-7 text-white" />
      </a>

      {/* ── Header ── */}
      <header className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md z-50 border-b border-brand-beige/20">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <span className="font-serif text-xl text-brand-blue font-semibold tracking-wide">
            Camila Magalhães
          </span>

          <nav aria-label="Navegação principal" className="hidden md:flex items-center space-x-10">
            {NAV_ITEMS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => scrollTo(s)}
                className={`text-sm font-medium capitalize transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/40 focus-visible:ring-offset-2 rounded px-1 ${
                  activeSection === s
                    ? "text-brand-blue"
                    : "text-brand-gray hover:text-brand-blue"
                }`}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
                {/* Underline ativo */}
                {activeSection === s && (
                  <span className="block h-px bg-brand-beige mt-0.5 rounded-full" aria-hidden="true" />
                )}
              </button>
            ))}
          </nav>

          <button
            type="button"
            className="md:hidden p-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/40"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {menuOpen ? <X className="w-5 h-5 text-brand-blue" /> : <Menu className="w-5 h-5 text-brand-blue" />}
          </button>
        </div>

        {menuOpen && (
          <div
            id="mobile-menu"
            role="navigation"
            aria-label="Menu mobile"
            className="md:hidden bg-white border-t border-brand-beige/20 px-6 py-4 flex flex-col gap-1"
          >
            {NAV_ITEMS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => scrollTo(s)}
                className={`text-left capitalize text-sm font-medium py-2.5 px-3 rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/40 ${
                  activeSection === s
                    ? "text-brand-blue bg-brand-blue/5"
                    : "text-brand-gray hover:text-brand-blue hover:bg-brand-blue/5"
                }`}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* ── HERO ── */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section className="min-h-screen flex items-center relative overflow-hidden bg-white pt-20" aria-label="Apresentação">
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full opacity-[0.06]"
            style={{ background: "radial-gradient(circle, #4a6c9a 0%, transparent 70%)" }} />
          <div className="absolute -bottom-16 -left-16 w-[400px] h-[400px] rounded-full opacity-[0.05]"
            style={{ background: "radial-gradient(circle, #c8a97e 0%, transparent 70%)" }} />
        </div>

        <div className="container mx-auto px-6 py-16 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">

            {/* Texto */}
            <div>
              <div className="hero-badge inline-flex items-center gap-2 bg-brand-blue/8 border border-brand-blue/15 rounded-full px-4 py-1.5 mb-8">
                <div className="w-1.5 h-1.5 bg-brand-beige rounded-full" aria-hidden="true" />
                <span className="text-brand-blue text-xs font-medium tracking-widest uppercase">
                  Psicóloga Clínica · CRP 06/220072
                </span>
              </div>

              <h1 className="font-serif text-[clamp(3rem,8vw,5.5rem)] text-brand-blue leading-[0.95] tracking-tight mb-6">
                <span className="hero-chars block overflow-hidden pb-[0.15em]">
                  <SplitChars text="Camila" />
                </span>
                <span className="hero-chars block overflow-hidden pb-[0.15em] text-brand-darkblue">
                  <SplitChars text="Magalhães" />
                </span>
              </h1>

              <p className="hero-sub text-lg text-brand-gray leading-relaxed font-light max-w-md mb-6">
                Um espaço seguro para quem quer se entender melhor,
                superar a ansiedade e construir relações mais saudáveis.
              </p>

              <div className="hero-ctas flex flex-col sm:flex-row gap-4">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-brand-darkblue hover:bg-brand-blue text-white font-medium px-8 py-3.5 rounded-full transition-colors duration-300 text-sm shadow-lg shadow-brand-blue/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
                >
                  Conversar sobre atendimento
                </a>
                <button
                  type="button"
                  onClick={() => scrollTo("sobre")}
                  className="inline-flex items-center justify-center gap-2 border border-brand-blue/30 text-brand-blue hover:bg-brand-blue/5 font-medium px-8 py-3.5 rounded-full text-sm transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/40 focus-visible:ring-offset-2"
                >
                  Conhecer mais
                </button>
              </div>
            </div>

            {/* Foto */}
            <div className="hero-photo relative flex justify-center lg:justify-end">
              <div className="relative">
                {/* Foto hero — trocar PHOTOS.hero quando tiver o arquivo */}
                <div className="relative w-[300px] md:w-[420px] h-[420px] md:h-[560px] rounded-[2.5rem] overflow-hidden shadow-2xl">
                  <PhotoSlot
                    src={PHOTOS.hero}
                    alt="Camila Magalhães, Psicóloga Clínica"
                    fill
                    sizes="(max-width: 768px) 300px, (max-width: 1024px) 420px, 420px"
                    priority
                    blurDataURL={BLUR_HERO}
                    label={"Foto vertical da Camila\n840 × 1120 px · WebP"}
                    className="object-right object-center"
                  />
                  {/* Overlay gradiente no rodapé — aparece sobre a foto real também */}
                  <div
                    className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none z-10"
                    style={{ background: "linear-gradient(to top, rgba(45,74,115,0.12), transparent)" }}
                    aria-hidden="true"
                  />
                </div>

                {/* Floating cards — visíveis só em telas maiores */}
                <div className="hero-float-1 hidden lg:block absolute -left-8 top-16 bg-white rounded-2xl shadow-xl px-5 py-4 border border-brand-beige/20 w-44" aria-hidden="true">
                  <p className="text-brand-blue font-serif text-sm font-semibold mb-1">TCC</p>
                  <p className="text-brand-gray text-xs font-light leading-snug">Terapia Cognitivo-Comportamental</p>
                </div>

                <div className="hero-float-2 hidden lg:block absolute -right-6 bottom-20 bg-brand-darkblue rounded-2xl shadow-xl px-5 py-4 w-40" aria-hidden="true">
                  <p className="text-brand-beige font-serif text-sm font-semibold mb-1">Online</p>
                  <p className="text-white/80 text-xs font-light leading-snug">Atendimento de onde você estiver</p>
                </div>

                {/* Floating topic pills — coluna vertical, visível só em telas maiores */}
                <div className="hidden lg:flex flex-col gap-2 absolute -left-5 bottom-16" aria-hidden="true">
                  {["Ansiedade", "Autoestima", "Relacionamentos", "Luto"].map((tag) => (
                    <span key={tag} className="hero-tag flex items-center bg-white text-brand-blue text-xs font-medium px-3 py-1.5 rounded-full shadow-lg border border-brand-blue/15 whitespace-nowrap">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full border-2 border-dashed border-brand-beige/30" aria-hidden="true" />
                <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-brand-beige/10 blur-md" aria-hidden="true" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* ── SOBRE ── */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section id="sobre" className="py-28 relative overflow-hidden" style={{ backgroundColor: "#f5f2ed" }}>
        <div className="sobre-bg-layer absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{ background: "radial-gradient(ellipse 60% 50% at 80% 50%, #4a6c9a 0%, transparent 100%)" }}
          aria-hidden="true"
        />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-[1fr_380px] gap-16 items-start">

              <div>
                <p className="sobre-text-block text-brand-gray text-xs tracking-[0.25em] uppercase font-medium mb-4">
                  Sobre mim
                </p>
                <h2 className="sobre-text-block font-serif text-[clamp(2.5rem,5vw,4rem)] text-brand-blue leading-tight mb-10">
                  Cuidar de quem<br /><em>cuida de si</em>
                </h2>

                {[
                  <>Sou <strong className="text-brand-blue font-semibold">Camila Magalhães</strong>, Psicóloga Clínica. Minha atuação é fundamentada na <strong className="text-brand-blue font-semibold">Terapia Cognitivo-Comportamental (TCC)</strong> — uma abordagem baseada em evidências que compreende a relação entre pensamentos, emoções e comportamentos.</>,
                  <>Acredito em um atendimento humanizado, acolhedor e empático. Valorizo a <em>escuta ativa</em> e o respeito à singularidade de cada história. Meu compromisso é construir uma relação terapêutica segura e colaborativa, baseada no diálogo e na confiança.</>,
                  <>Através desse processo, é possível <strong className="text-brand-blue font-semibold">ressignificar vivências</strong> e construir novas possibilidades de olhar para si mesmo com mais clareza, autonomia e equilíbrio.</>,
                  <>Se você sente que é hora de cuidar de si — estou aqui para caminhar com você nesse processo.</>,
                ].map((text, i) => (
                  <p key={i} className="sobre-text-block text-brand-gray leading-relaxed font-light text-lg mb-6 last:mb-0">
                    {text}
                  </p>
                ))}
              </div>

              <aside className="sobre-card lg:sticky lg:top-28 space-y-4" aria-label="Informações profissionais">

                {/* Foto + card sobrepostos */}
                <div className="relative w-full h-[600px] rounded-3xl overflow-hidden shadow-lg">

                  {/* Foto */}
                  <PhotoSlot
                    src={PHOTOS.sobre}
                    alt="Camila Magalhães, Psicóloga Clínica"
                    fill
                    sizes="(max-width: 1024px) 100vw, 380px"
                    blurDataURL={BLUR_SOBRE}
                    label={"Foto da Camila\n380 × 600 px · WebP"}
                    className="[transform:scaleX(-1)] object-[center_60%]"
                  />

                  {/* Gradiente sobre a foto */}
                  <div
                    className="absolute inset-x-0 bottom-0 h-3/5 pointer-events-none"
                    style={{ background: "linear-gradient(to top, rgba(45,74,115,0.97) 30%, rgba(45,74,115,0.6) 65%, transparent 100%)" }}
                    aria-hidden="true"
                  />

                  {/* Card filho */}
                  <div className="absolute bottom-0 inset-x-0 p-6 z-10">
                    <h3 className="font-serif text-xl text-white font-semibold mb-0.5">Camila Magalhães</h3>
                    <p className="text-white/60 text-xs font-light mb-1 tracking-wide">Psicóloga Clínica · CRP 06/220072</p>
                    <p className="text-white/50 text-xs font-light mb-5">{CIDADE}</p>

                    <ul className="space-y-2.5 mb-6" aria-label="Especialidades">
                      {["Terapia Cognitivo-Comportamental (TCC)", "Especialista em Ansiedade e Depressão", "Atendimento Online e Presencial"].map((item) => (
                        <li key={item} className="flex items-center gap-2.5">
                          <div className="w-1 h-1 rounded-full bg-brand-beige flex-shrink-0" aria-hidden="true" />
                          <span className="text-white/80 text-sm font-light">{item}</span>
                        </li>
                      ))}
                    </ul>

                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-sm text-white font-medium py-3 rounded-2xl text-sm transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                    >
                      <WhatsAppIcon className="w-4 h-4" aria-hidden="true" />
                      Falar comigo
                    </a>
                  </div>
                </div>
              </aside>

            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* ── ABORDAGEM ── */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section id="abordagem" className="relative pt-20" style={{ backgroundColor: "#eef2f7" }}>

        {/* Container pinado pelo GSAP */}
        <div className="abordagem-pin h-screen flex flex-col justify-center overflow-hidden">
          <div className="container mx-auto px-6 max-w-6xl w-full">

            {/* Header */}
            <div className="text-center mb-10">
              <p className="text-brand-gray text-xs tracking-[0.25em] uppercase font-medium mb-3">Abordagem</p>
              <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] text-brand-blue leading-tight">
                Temas que posso<br /><em>te ajudar</em>
              </h2>
            </div>

            {/* Grid: texto + vídeo */}
            <div className="grid md:grid-cols-[minmax(0,600px)_auto] gap-6 items-center justify-center">

              {/* Tópicos sobrepostos (GSAP troca entre eles) */}
              <div className="relative" style={{ minHeight: 280 }}>
                {TOPICS.map(({ title, desc, iconKey }, idx) => {
                  const icons = TOPIC_ICONS[iconKey];
                  return (
                    <div
                      key={title}
                      className="abordagem-topic absolute inset-0 flex flex-col justify-center"
                      aria-hidden={idx !== 0}
                      style={{ opacity: idx === 0 ? 1 : 0, transform: idx === 0 ? "none" : "translateY(40px)" }}
                    >
                      <div className="flex items-center gap-3 mb-5">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center text-white flex-shrink-0"
                          style={{ background: "linear-gradient(135deg, #4a6c9a, #2d4a73)" }}
                          aria-hidden="true"
                        >
                          {icons.sm}
                        </div>
                        <p className="text-brand-gray text-xs tracking-[0.2em] uppercase font-medium">
                          Tema {String(idx + 1).padStart(2, "0")} / {String(TOPICS.length).padStart(2, "0")}
                        </p>
                      </div>
                      <h3 className="font-serif text-[clamp(1.8rem,3.5vw,2.8rem)] text-brand-blue font-semibold leading-tight mb-4">
                        {title}
                      </h3>
                      <div className="w-10 h-px mb-4" style={{ backgroundColor: "#c8a97e" }} aria-hidden="true" />
                      <p className="text-brand-gray leading-relaxed max-w-sm">{desc}</p>
                    </div>
                  );
                })}
              </div>

              {/* Mockup de celular */}
              <div className="relative flex-shrink-0" aria-hidden="false">
                {/* Corpo do phone */}
                <div
                  className="relative rounded-[2.8rem] bg-white p-[10px]"
                  style={{
                    width: 220,
                    boxShadow: "0 0 0 1.5px #d1d1d6, inset 0 0 0 1px rgba(0,0,0,0.04), 0 30px 60px rgba(0,0,0,0.2)",
                  }}
                >
                  {/* Botão power (direita) */}
                  <div className="absolute -right-[3px] top-24 w-[3px] h-12 bg-gray-400 rounded-r-sm" aria-hidden="true" />
                  {/* Botões volume (esquerda) */}
                  <div className="absolute -left-[3px] top-20 w-[3px] h-7 bg-gray-400 rounded-l-sm" aria-hidden="true" />
                  <div className="absolute -left-[3px] top-32 w-[3px] h-7 bg-gray-400 rounded-l-sm" aria-hidden="true" />
                  {/* Silêncio (esquerda) */}
                  <div className="absolute -left-[3px] top-14 w-[3px] h-5 bg-gray-400 rounded-l-sm" aria-hidden="true" />

                  {/* Tela */}
                  <div className="relative overflow-hidden rounded-[2.2rem] bg-black" style={{ aspectRatio: "9/16" }}>
                    {/* Dynamic island */}
                    <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-14 h-4 bg-black rounded-full z-30 flex items-center justify-center gap-1.5" aria-hidden="true">
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-800" />
                      <div className="w-2 h-2 rounded-full bg-gray-800" />
                    </div>

                    {/* Vídeos */}
                    {TOPICS.map(({ title, videoSrc }, idx) => (
                      <div
                        key={title}
                        className="abordagem-video absolute inset-0"
                        style={{ opacity: idx === 0 ? 1 : 0, pointerEvents: idx === 0 ? "auto" : "none" }}
                      >
                        <video
                          src={videoSrc}
                          className="w-full h-full object-cover"
                          controls
                          muted
                          loop
                          playsInline
                          preload="auto"
                        />
                      </div>
                    ))}

                    {/* Botão ativar som */}
                    {videosMuted && (
                      <button
                        onClick={unmuteAll}
                        className="absolute bottom-14 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-black/60 hover:bg-black/80 text-white text-xs font-medium px-3 py-2 rounded-full backdrop-blur-sm transition-colors"
                        aria-label="Ativar som"
                      >
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
                        </svg>
                        Ativar som
                      </button>
                    )}

                    {/* Home indicator */}
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-20 h-1 bg-white/25 rounded-full z-30" aria-hidden="true" />
                  </div>
                </div>
              </div>

            </div>

            {/* Dots de progresso */}
            <div className="flex justify-center gap-2 mt-10" aria-hidden="true">
              {TOPICS.map((_, idx) => (
                <div
                  key={idx}
                  className="abordagem-dot h-1.5 rounded-full"
                  style={{
                    width: idx === 0 ? 24 : 8,
                    backgroundColor: idx === 0 ? "#4a6c9a" : "rgba(74,108,154,0.25)",
                  }}
                />
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* ── CONSULTAS ── */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section id="consultas" className="py-28 bg-white relative overflow-hidden">
        {/* Subtle top/bottom edge lines */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-beige/30 to-transparent" aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-beige/30 to-transparent" aria-hidden="true" />

        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">

            <div className="text-center mb-20 reveal-up">
              <p className="text-brand-gray text-xs tracking-[0.25em] uppercase font-medium mb-4">Processo</p>
              <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] text-brand-blue leading-tight">
                Como funciona<br /><em>a consulta</em>
              </h2>
            </div>

            {/* Connector line (desktop) — animated via GSAP scaleX */}
            <div className="relative">
              <div
                className="consult-connector hidden md:block absolute top-[3.25rem] left-[calc(16.66%+2rem)] right-[calc(16.66%+2rem)] h-px bg-brand-beige/35"
                aria-hidden="true"
              />

              <ol className="consultas-steps grid md:grid-cols-3 gap-6" aria-label="Etapas do processo terapêutico">
                {STEPS.map(({ n, icon, title, desc }) => (
                  <li key={n} className="step-item">
                    <div className="group h-full bg-white border border-brand-beige/25 rounded-3xl p-8 relative overflow-hidden transition-all duration-500 hover:border-brand-blue/20 hover:shadow-xl hover:shadow-brand-blue/5 hover:-translate-y-1.5">

                      {/* Decorative large number */}
                      <span
                        className="absolute -right-1 -top-3 font-serif text-[6.5rem] leading-none font-bold text-brand-blue/[0.05] select-none pointer-events-none"
                        aria-hidden="true"
                      >
                        {n}
                      </span>

                      {/* Icon circle */}
                      <div
                        className="relative z-10 w-[3.25rem] h-[3.25rem] rounded-2xl bg-gradient-to-br from-brand-blue to-brand-darkblue flex items-center justify-center text-white mb-6 shadow-md shadow-brand-blue/20 group-hover:shadow-lg group-hover:shadow-brand-blue/30 transition-shadow duration-300"
                        aria-hidden="true"
                      >
                        {icon}
                      </div>

                      {/* Step label */}
                      <p className="relative z-10 text-brand-gray/50 text-[0.65rem] tracking-[0.25em] font-medium uppercase mb-2">
                        Etapa {n}
                      </p>

                      {/* Title */}
                      <h3 className="relative z-10 font-serif text-xl text-brand-blue font-semibold mb-3 tracking-wide">
                        {title}
                      </h3>

                      {/* Divider */}
                      <div className="relative z-10 w-8 h-px bg-brand-beige mb-4" aria-hidden="true" />

                      {/* Description */}
                      <p className="relative z-10 text-brand-gray font-light leading-relaxed text-[0.9rem]">
                        {desc}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* ── QUOTE ── */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section className="quote-section py-28 bg-brand-darkblue relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-10" aria-hidden="true">
          <div className="absolute top-0 left-1/4 w-px h-full bg-brand-beige" />
          <div className="absolute top-0 right-1/4 w-px h-full bg-brand-beige" />
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="max-w-3xl mx-auto">
            <p className="text-brand-beige/40 font-serif text-7xl leading-none mb-4 select-none" aria-hidden="true">"</p>
            <blockquote>
              <p className="quote-chars font-serif text-[clamp(1.5rem,3vw,2.25rem)] text-white leading-snug font-light tracking-wide">
                <SplitChars text="Ressignificar é aprender a olhar" />
                <br />
                <SplitChars text="para si com mais gentileza." />
              </p>
              <footer className="quote-author mt-8">
                <cite className="text-white/75 text-sm font-light tracking-widest uppercase not-italic">
                  Camila Magalhães
                </cite>
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* ── INSTAGRAM ── */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section className="py-28 bg-brand-light relative" aria-label="Conteúdos no Instagram">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 reveal-up">
            <p className="text-brand-gray text-xs tracking-[0.25em] uppercase font-medium mb-4">Instagram</p>
            <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] text-brand-blue leading-tight mb-4">
              Conteúdos sobre<br /><em>saúde mental</em>
            </h2>
          </div>

          <div className="relative max-w-6xl mx-auto">
            <button
              type="button"
              onClick={() => setSlide((s) => Math.max(0, s - 1))}
              disabled={slide === 0}
              className="absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-md border border-brand-beige/30 flex items-center justify-center text-brand-blue disabled:opacity-30 hover:bg-brand-light transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/40"
              aria-label="Post anterior"
            >
              <ChevronLeft className="w-5 h-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => setSlide((s) => Math.min(maxSlide, s + 1))}
              disabled={slide === maxSlide}
              className="absolute -right-4 md:-right-12 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-md border border-brand-beige/30 flex items-center justify-center text-brand-blue disabled:opacity-30 hover:bg-brand-light transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/40"
              aria-label="Próximo post"
            >
              <ChevronRight className="w-5 h-5" aria-hidden="true" />
            </button>

            <div className="overflow-hidden" role="region" aria-label="Carrossel de posts do Instagram" aria-live="polite">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${slide * 100}%)` }}
              >
                {Array.from({ length: Math.ceil(INSTAGRAM_REELS.length / perPage) }).map((_, pageIdx) => (
                  <div key={pageIdx} className="flex-shrink-0 w-full flex gap-4" aria-hidden={pageIdx !== slide}>
                    {INSTAGRAM_REELS.slice(pageIdx * perPage, pageIdx * perPage + perPage).map((reel) => (
                      <div key={reel} className="flex-1 flex justify-center px-2">
                        <iframe
                          title={`Post do Instagram — reel ${reel}`}
                          src={`https://www.instagram.com/reel/${reel}/embed/captioned/?cr=1&v=14`}
                          allowFullScreen
                          height="600"
                          scrolling="no"
                          className="w-full max-w-[400px] bg-white rounded-xl border border-gray-200"
                          style={{ minWidth: 280 }}
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Dots do carrossel */}
            <div role="tablist" aria-label="Navegação do carrossel" className="flex justify-center gap-2 mt-8">
              {Array.from({ length: maxSlide + 1 }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={i === slide}
                  aria-label={`Grupo ${i + 1} de ${maxSlide + 1}`}
                  onClick={() => setSlide(i)}
                  className={`rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/40 ${
                    i === slide ? "w-6 h-2 bg-brand-blue" : "w-2 h-2 bg-brand-beige/50 hover:bg-brand-beige"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="text-center mt-10 reveal-up">
            <a
              href="https://www.instagram.com/psicamilamagalhaes/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-brand-blue hover:text-brand-darkblue transition-colors font-medium text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/40 rounded"
            >
              <Instagram className="w-4 h-4" aria-hidden="true" />
              @psicamilamagalhaes
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* ── DEPOIMENTOS ── */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section className="py-28 relative overflow-hidden" style={{ backgroundColor: "#f5f2ed" }}>
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">

            <div className="text-center mb-16 reveal-up">
              <p className="text-brand-gray text-xs tracking-[0.25em] uppercase font-medium mb-4">Depoimentos</p>
              <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] text-brand-blue leading-tight">
                O que dizem<br /><em>as pacientes</em>
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {DEPOIMENTOS.map(({ text, name, contexto }) => (
                <div key={name} className="reveal-up bg-white rounded-3xl p-8 border border-brand-beige/20 flex flex-col">
                  <p className="font-serif text-4xl text-brand-beige/60 leading-none mb-4 select-none" aria-hidden="true">"</p>
                  <p className="text-brand-gray leading-relaxed font-light text-sm flex-1 mb-6">{text}</p>
                  <div>
                    <p className="text-brand-blue font-semibold text-sm">{name}</p>
                    <p className="text-brand-gray/60 text-xs font-light mt-0.5">{contexto}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* ── FAQ ── */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section className="py-28 bg-white relative">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto">

            <div className="text-center mb-16 reveal-up">
              <p className="text-brand-gray text-xs tracking-[0.25em] uppercase font-medium mb-4">Dúvidas</p>
              <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] text-brand-blue leading-tight">
                Perguntas<br /><em>frequentes</em>
              </h2>
            </div>

            <dl className="space-y-3">
              {FAQS.map(({ q, a }, idx) => (
                <div key={q} className="reveal-up border border-brand-beige/25 rounded-2xl overflow-hidden">
                  <dt>
                    <button
                      type="button"
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/40 focus-visible:ring-inset"
                      aria-expanded={openFaq === idx}
                    >
                      <span className="font-serif text-brand-blue font-semibold">{q}</span>
                      <span
                        className="flex-shrink-0 w-6 h-6 rounded-full border border-brand-blue/20 flex items-center justify-center transition-transform duration-300"
                        style={{ transform: openFaq === idx ? "rotate(180deg)" : "rotate(0deg)" }}
                        aria-hidden="true"
                      >
                        <ChevronRight className="w-3 h-3 text-brand-blue -rotate-90" />
                      </span>
                    </button>
                  </dt>
                  {openFaq === idx && (
                    <dd className="px-6 pb-5">
                      <p className="text-brand-gray font-light leading-relaxed text-sm">{a}</p>
                    </dd>
                  )}
                </div>
              ))}
            </dl>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* ── CONTATO ── */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section id="contato" className="py-28 bg-white relative overflow-hidden">
        <div
          className="absolute right-0 top-0 w-1/2 h-full opacity-[0.03] pointer-events-none"
          style={{ background: "radial-gradient(ellipse 80% 80% at 100% 50%, #4a6c9a 0%, transparent 100%)" }}
          aria-hidden="true"
        />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-lg mx-auto text-center">
            <div className="reveal-up">
              <p className="text-brand-gray text-xs tracking-[0.25em] uppercase font-medium mb-4">Contato</p>
              <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] text-brand-blue leading-tight mb-4">
                Agende sua sessão
              </h2>
              <p className="text-brand-gray font-light text-lg leading-relaxed mb-2">
                Estou aqui para te <em>acolher</em> em sua jornada.<br />
                Entre em contato — vamos começar juntas.
              </p>
              <p className="text-brand-gray/50 text-sm font-light mb-10">{CIDADE} · Online & Presencial</p>
            </div>

            <div className="reveal-up">
              {/* CTA principal — tamanho adequado, não full-width */}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-green-700 hover:bg-green-800 text-white font-medium px-10 py-4 rounded-2xl transition-colors duration-300 shadow-lg shadow-green-700/20 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
              >
                <WhatsAppIcon className="w-5 h-5" aria-hidden="true" />
                Chamar no WhatsApp
              </a>

              {/* Informações de atendimento */}
              <div className="grid grid-cols-3 gap-4 mt-10">
                {[
                  { icon: <Calendar className="w-5 h-5" />, text: "50 minutos" },
                  { icon: <Monitor className="w-5 h-5" />, text: "Online & Presencial" },
                  { icon: <Lock className="w-5 h-5" />,    text: "Sigilo garantido" },
                ].map(({ icon, text }) => (
                  <div key={text} className="flex flex-col items-center gap-2 p-4 bg-brand-light rounded-2xl border border-brand-beige/20">
                    <div className="text-brand-blue/60" aria-hidden="true">{icon}</div>
                    <span className="text-brand-gray text-xs font-light text-center">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* ── FOOTER ── */}
      {/* ══════════════════════════════════════════════════════════ */}
      <footer className="bg-gradient-to-br from-brand-blue to-brand-darkblue py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none" aria-hidden="true">
          <div className="absolute top-8 left-16 w-40 h-40 border border-brand-beige rounded-full" />
          <div className="absolute bottom-8 right-20 w-24 h-24 border border-brand-beige rounded-full" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="font-serif text-2xl text-brand-beige font-semibold mb-1">Camila Magalhães</h2>
              <p className="text-white/80 text-sm font-light">Psicóloga Clínica · CRP 06/220072</p>
              <p className="text-white/50 text-xs font-light mt-0.5">{CIDADE}</p>
            </div>
            <nav aria-label="Redes sociais" className="flex gap-4">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors border border-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-beige/60"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon className="w-5 h-5 text-brand-beige" aria-hidden="true" />
              </a>
              <a
                href="https://www.instagram.com/psicamilamagalhaes/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors border border-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-beige/60"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-brand-beige" aria-hidden="true" />
              </a>
            </nav>
          </div>

          <div className="border-t border-white/10 mt-10 pt-8 flex flex-col md:flex-row items-center justify-between gap-2">
            <p className="text-white/70 text-xs font-light">
              © {new Date().getFullYear()} Camila Magalhães. Todos os direitos reservados.
            </p>
            <p className="text-white/50 text-xs font-light">
              Psicóloga inscrita no CFP — CRP 06/220072
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}

function WhatsAppIcon({ className, "aria-hidden": ariaHidden }: { className?: string; "aria-hidden"?: boolean | "true" | "false" }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden={ariaHidden}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
    </svg>
  );
}
