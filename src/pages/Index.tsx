import { LastConversion } from "@/components/LastConversion";
import { OperatorRanking } from "@/components/OperatorRanking";
import { ActivityLog } from "@/components/ActivityLog";
import { useEffect, useState } from "react";

const Index = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-radial from-primary/3 to-transparent rounded-full" />
      </div>

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-8 py-4 border-b border-border/30">
        <div className="flex items-center gap-4">
          <div className="w-3 h-3 rounded-full bg-success animate-pulse" />
          <h1 className="text-xl font-bold text-foreground tracking-tight">
            Painel de Operações
          </h1>
          <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
            Agendamento & Indicação
          </span>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-right">
            <p className="text-3xl font-black font-mono text-foreground">
              {currentTime.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
            </p>
            <p className="text-sm text-muted-foreground">
              {currentTime.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
            </p>
          </div>
        </div>
      </header>

      {/* Main Content - 60/40 Split */}
      <main className="relative z-10 flex h-[calc(100vh-73px)]">
        {/* Left Side - 60% - Last Conversion */}
        <section className="w-[60%] border-r border-border/30">
          <LastConversion />
        </section>

        {/* Right Side - 40% - Ranking + Log */}
        <section className="w-[40%] flex flex-col">
          {/* Top - Ranking - 50% */}
          <div className="h-1/2 border-b border-border/30">
            <OperatorRanking />
          </div>
          
          {/* Bottom - Activity Log - 50% */}
          <div className="h-1/2">
            <ActivityLog />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
