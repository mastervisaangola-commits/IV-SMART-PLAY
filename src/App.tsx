/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Download, 
  Tv, 
  Smartphone, 
  Zap, 
  Users, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft,
  Plus,
  Minus,
  Clock,
  Infinity,
  ShieldCheck,
  Star,
  Film,
  Clapperboard,
  BookOpen
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Components ---

const CountdownTimer = ({ dark = false }: { dark?: boolean }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 12,
    minutes: 45,
    seconds: 30
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const format = (n: number) => n.toString().padStart(2, '0');

  return (
    <div className={`flex items-center gap-2 sm:gap-4 ${dark ? 'text-white' : 'text-secondary'}`}>
      {[
        { label: 'DIAS', value: timeLeft.days },
        { label: 'HORAS', value: timeLeft.hours },
        { label: 'MIN', value: timeLeft.minutes },
        { label: 'SEG', value: timeLeft.seconds }
      ].map((item, i) => (
        <React.Fragment key={item.label}>
          <div className="flex flex-col items-center">
            <div className={`w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center rounded-xl text-xl sm:text-2xl font-bold shadow-sm ${dark ? 'bg-white/10 border border-white/20' : 'bg-white border border-black/5'}`}>
              {format(item.value)}
            </div>
            <span className="text-[10px] sm:text-xs mt-1 font-semibold opacity-60 tracking-wider">{item.label}</span>
          </div>
          {i < 3 && <span className="text-xl sm:text-2xl font-bold opacity-30 mt-[-20px]">:</span>}
        </React.Fragment>
      ))}
    </div>
  );
};

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-black/5">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left hover:text-primary transition-colors"
      >
        <span className="text-lg font-semibold">{question}</span>
        {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-secondary/70 leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const BenefitCard = ({ icon: Icon, title, description }: { icon: any, title: string, description?: string }) => (
  <div className="bg-white p-6 rounded-2xl border border-black/5 shadow-sm hover:shadow-md transition-all group">
    <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
      <Icon className="w-6 h-6 text-primary group-hover:text-white" />
    </div>
    <div className="flex items-start gap-2">
      <CheckCircle2 className="w-4 h-4 text-primary mt-1 shrink-0" />
      <h3 className="font-bold text-sm sm:text-base leading-tight">{title}</h3>
    </div>
  </div>
);

// --- Main App ---

export default function App() {
  const [isStickyVisible, setIsStickyVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsStickyVisible(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Bar */}
      <div className="bg-primary text-white py-2 px-4 text-center text-xs sm:text-sm font-bold tracking-wide flex items-center justify-center gap-2">
        <span>🔥 Promoção por tempo limitado!</span>
        <div className="hidden sm:flex items-center gap-1 opacity-80">
          <Clock className="w-3 h-3" />
          <span>00d : 12h : 45m : 30s</span>
        </div>
      </div>

      {/* Header */}
      <header className="py-6 px-6 flex justify-center">
        <div className="flex items-center gap-2">
          <Play className="w-8 h-8 text-primary fill-primary" />
          <span className="text-2xl font-extrabold tracking-tighter">Smartplay</span>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-6 pt-12 pb-20 max-w-4xl mx-auto w-full flex flex-col items-center text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center"
        >
          <div className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-bold mb-6">
            Acesso Vitalício
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] mb-6">
            Filmes, Séries e <br />
            <span className="text-primary">Entretenimento Digital</span>
          </h1>
          <p className="text-lg text-secondary/70 mb-8 max-w-lg leading-relaxed">
            Assista e <strong>baixe</strong> tudo o que você gosta, <strong>sem mensalidades</strong>, pagando apenas uma vez.
          </p>

          <div className="flex flex-wrap justify-center items-center gap-4 mb-10">
            <div className="bg-white p-4 rounded-2xl border border-black/5 shadow-sm">
              <span className="text-xs text-secondary/40 line-through block">12.500 Kz</span>
              <span className="text-3xl font-black text-secondary">5.500 Kz</span>
              <span className="text-[10px] uppercase font-bold text-secondary/40 block mt-1">Pagamento único</span>
            </div>
            <div className="bg-primary/5 border border-primary/20 px-4 py-2 rounded-xl text-primary font-bold text-sm">
              Acesso Vitalício
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="https://mentora.ao/produto/fd9f8d4f-df04-4516-9388-13ffa45b8c73"
              target="_blank"
              rel="noopener noreferrer"
              className="red-gradient text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
            >
              <Zap className="w-5 h-5 fill-white" />
              Garantir Meu Acesso
            </a>
            <a 
              href="https://mentora.ao/produto/fd9f8d4f-df04-4516-9388-13ffa45b8c73"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white border border-black/10 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-black/5 transition-colors flex items-center justify-center gap-2"
            >
              Ver Como Funciona
              <ChevronRight className="w-5 h-5" />
            </a>
          </div>
        </motion.div>
      </section>

      {/* Countdown Section */}
      <section className="bg-white py-16 px-6 border-y border-black/5">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-secondary/40 mb-6">Promoção termina em:</span>
          <CountdownTimer />
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
            Por que escolher o <span className="text-primary">SmartPlay</span>?
          </h2>
          <p className="text-secondary/60">Tudo o que você precisa para seu entretenimento em um só lugar</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <BenefitCard icon={Infinity} title="Acesso vitalício sem mensalidades" />
          <BenefitCard icon={Star} title="Filmes e séries sempre atualizados" />
          <BenefitCard icon={Download} title="Baixe filmes e séries para assistir offline" />
          <BenefitCard icon={Tv} title="Funciona no celular e na TV" />
          <BenefitCard icon={Zap} title="Interface simples e rápida" />
          <BenefitCard icon={Users} title="Ideal para toda a família" />
          <BenefitCard icon={ShieldCheck} title="Excelente custo-benefício" />
          <BenefitCard icon={CheckCircle2} title="Sem contratos ou assinaturas" />
        </div>
      </section>

      {/* Platforms Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
            Todas as <span className="text-primary">Plataformas</span> num Só Lugar
          </h2>
          <p className="text-secondary/60">Acesso completo aos melhores serviços de streaming do mundo</p>
        </div>

        <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-[3rem] p-8 sm:p-12 border border-white/20 shadow-2xl">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {[
              { name: "Netflix", color: "bg-black" },
              { name: "HBO Max", color: "bg-purple-900" },
              { name: "Prime Video", color: "bg-blue-900" },
              { name: "Disney+", color: "bg-blue-950" },
              { name: "Crunchyroll", color: "bg-orange-500" },
              { name: "Movistar+", color: "bg-blue-500" },
              { name: "Apple TV", color: "bg-black" },
              { name: "Filmin", color: "bg-secondary" }
            ].map((p, i) => (
              <div key={i} className="flex flex-col items-center gap-3 group">
                <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-3xl ${p.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                  <span className="text-white font-black text-xs sm:text-sm text-center px-2">{p.name}</span>
                </div>
                <span className="text-sm font-bold opacity-60">{p.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
              O que você vai encontrar no <span className="text-primary">SmartPlay</span>
            </h2>
            <p className="text-secondary/60">Uma biblioteca completa de entretenimento ao seu alcance</p>
          </div>

          <div className="grid sm:grid-cols-3 gap-8">
            {[
              { icon: Film, title: "Filmes Lançamentos", desc: "Os últimos sucessos do cinema direto na sua tela." },
              { icon: Clapperboard, title: "Séries Populares", desc: "As séries mais comentadas do momento completas." },
              { icon: BookOpen, title: "Conteúdo Infantil", desc: "Desenhos e animações para divertir as crianças." }
            ].map((f, i) => (
              <div key={i} className="text-center p-8 rounded-3xl bg-[#F5F5F5] border border-black/5">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <f.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                <p className="text-secondary/60 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto w-full red-gradient rounded-[3rem] p-12 sm:p-20 text-center text-white shadow-2xl shadow-primary/30 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-10 left-10 w-20 h-20 border-4 border-white rounded-full"></div>
            <div className="absolute bottom-10 right-10 w-40 h-40 border-4 border-white rounded-full"></div>
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-black mb-6 relative z-10">
            Garanta agora seu acesso vitalício
          </h2>
          <p className="text-xl opacity-80 mb-10 max-w-2xl mx-auto relative z-10">
            Aproveite a promoção por tempo limitado e nunca mais pague mensalidades de streaming.
          </p>
          <a 
            href="https://mentora.ao/produto/fd9f8d4f-df04-4516-9388-13ffa45b8c73"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-primary px-10 py-5 rounded-2xl font-black text-xl shadow-xl hover:scale-105 transition-transform relative z-10"
          >
            Quero Acessar Agora
          </a>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-6 max-w-3xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold mb-4">Perguntas Frequentes</h2>
        </div>
        <div className="flex flex-col">
          <FAQItem 
            question="O acesso é realmente vitalício?" 
            answer="Sim, o SmartPlay oferece um modelo de pagamento único. Uma vez adquirido, você terá acesso permanente a toda a biblioteca de conteúdo e futuras atualizações sem nunca precisar pagar uma mensalidade."
          />
          <FAQItem 
            question="Funciona em qualquer dispositivo?" 
            answer="Sim! O SmartPlay é compatível com Smart TVs (Android TV, Samsung, LG), Celulares (Android e iOS), Tablets, Computadores e TV Boxes. Você pode levar seu entretenimento para onde quiser."
          />
          <FAQItem 
            question="Preciso pagar mensalidade?" 
            answer="Não. Esse é o nosso grande diferencial. Você faz um investimento único de 5.500 Kz e esquece as faturas mensais. É entretenimento ilimitado com custo zero recorrente."
          />
          <FAQItem 
            question="O conteúdo é atualizado?" 
            answer="Sim, nossa biblioteca é atualizada diariamente com os últimos lançamentos do cinema e novos episódios das séries mais populares do mundo."
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-black/5 text-center">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Play className="w-6 h-6 text-primary fill-primary" />
          <span className="text-xl font-extrabold tracking-tighter">Smartplay</span>
        </div>
        <p className="text-secondary/40 text-sm">
          © 2026 SmartPlay. Todos os direitos reservados.
        </p>
      </footer>

      {/* Sticky CTA */}
      <AnimatePresence>
        {isStickyVisible && (
          <motion.div 
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-6 left-6 right-6 z-50 sm:hidden"
          >
            <a 
              href="https://mentora.ao/produto/fd9f8d4f-df04-4516-9388-13ffa45b8c73"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full red-gradient text-white py-4 rounded-2xl font-bold shadow-2xl flex items-center justify-center gap-2"
            >
              <Zap className="w-5 h-5 fill-white" />
              Quero Acessar Agora - 5.500 Kz
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
