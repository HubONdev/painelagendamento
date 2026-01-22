import { LastConversion } from "@/components/LastConversion";
import { OperatorRanking } from "@/components/OperatorRanking";
import { ActivityLog } from "@/components/ActivityLog";
import { useEffect, useState } from "react";
import logoPpm from "@/assets/logo-ppm.png";

const Index = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-screen w-screen bg-background relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
      {/* Background Effects - Orange themed */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-primary/8 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-accent/8 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1.5s' }} />
      </div>

      {/* Subtle Grid */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Header - Clean, minimal */}
      <header className="relative z-10 flex items-center justify-between px-8 py-3 border-b border-border/20">
        <div className="flex items-center gap-6">
          <img src={logoPpm} alt="Pronto pra Morar" className="h-10 object-contain" />
          <div className="w-px h-8 bg-border/30" />
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-success animate-pulse" />
            <span className="text-sm font-medium text-muted-foreground">
              Painel de Operações
            </span>
          </div>
          <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
            Agendamento & Indicação
          </span>
        </div>
        <div className="text-right">
          <p className="text-2xl font-black font-mono text-foreground">
            {currentTime.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
          </p>
          <p className="text-xs text-muted-foreground">
            {currentTime.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
          </p>
        </div>
      </header>

      {/* Main Content - 60/40 Split */}
      <main className="relative z-10 flex h-[calc(100%-65px)]">
        {/* Left Side - 60% - Last Conversion */}
        <section className="w-[60%] border-r border-border/20">
          <LastConversion />
        </section>

        {/* Right Side - 40% - Ranking + Log */}
        <section className="w-[40%] flex flex-col">
          {/* Top - Ranking */}
          <div className="h-1/2 border-b border-border/20">
            <OperatorRanking />
          </div>
          
          {/* Bottom - Activity Log */}
          <div className="h-1/2">
            <ActivityLog />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
