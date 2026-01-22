import { Trophy, User, GitBranch, Clock } from "lucide-react";
import { useEffect, useState } from "react";

interface ConversionData {
  title: string;
  responsible: string;
  pipeline: string;
  time: string;
}

const mockConversion: ConversionData = {
  title: "Consulta Agendada - Dr. Roberto Silva",
  responsible: "Ana Paula Santos",
  pipeline: "Indicação Premium",
  time: "14:32",
};

export function LastConversion() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div 
      className={`h-full flex flex-col p-8 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative">
          <div className="w-16 h-16 rounded-2xl bg-gradient-gold flex items-center justify-center animate-float">
            <Trophy className="w-8 h-8 text-primary-foreground" />
          </div>
          <div className="absolute inset-0 rounded-2xl bg-gradient-gold blur-xl opacity-50 -z-10" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-muted-foreground uppercase tracking-widest">
            Última Conversão
          </h2>
          <div className="flex items-center gap-2 mt-1">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span className="text-success text-sm font-medium">Ao vivo</span>
          </div>
        </div>
      </div>

      {/* Main Card */}
      <div className="flex-1 glass-strong rounded-3xl p-10 relative overflow-hidden animate-glow">
        {/* Background Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-center">
          {/* Title */}
          <h1 className="text-5xl xl:text-6xl 2xl:text-7xl font-black leading-tight mb-10 text-gradient-primary">
            {mockConversion.title}
          </h1>

          {/* Info Grid */}
          <div className="grid grid-cols-3 gap-8">
            {/* Responsible */}
            <div className="glass rounded-2xl p-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <span className="text-muted-foreground text-sm uppercase tracking-wider">
                  Responsável
                </span>
              </div>
              <p className="text-2xl xl:text-3xl font-bold text-foreground">
                {mockConversion.responsible}
              </p>
            </div>

            {/* Pipeline */}
            <div className="glass rounded-2xl p-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                  <GitBranch className="w-5 h-5 text-accent" />
                </div>
                <span className="text-muted-foreground text-sm uppercase tracking-wider">
                  Esteira
                </span>
              </div>
              <p className="text-2xl xl:text-3xl font-bold text-foreground">
                {mockConversion.pipeline}
              </p>
            </div>

            {/* Time */}
            <div className="glass rounded-2xl p-6 animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-success/20 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-success" />
                </div>
                <span className="text-muted-foreground text-sm uppercase tracking-wider">
                  Horário
                </span>
              </div>
              <p className="text-2xl xl:text-3xl font-bold font-mono text-foreground">
                {mockConversion.time}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
