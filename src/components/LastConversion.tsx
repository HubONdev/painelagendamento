import { User, GitBranch, Clock, Flame } from "lucide-react";
import { useEffect, useState } from "react";

export type PipelineType = 'agendamento' | 'indicacao';

export interface ConversionData {
  title: string;
  responsible: string;
  pipeline: string;
  pipelineType: PipelineType;
  time: string;
}

interface LastConversionProps {
  data?: ConversionData;
}

const defaultConversion: ConversionData = {
  title: "Consulta Agendada - Dr. Roberto Silva",
  responsible: "Ana Paula Santos",
  pipeline: "Indicação Premium",
  pipelineType: "indicacao",
  time: "14:32",
};

export function LastConversion({ data = defaultConversion }: LastConversionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [animateEntry, setAnimateEntry] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    if (data) {
      setAnimateEntry(true);
      const timer = setTimeout(() => setAnimateEntry(false), 800);
      return () => clearTimeout(timer);
    }
  }, [data?.title, data?.time]);

  const isAgendamento = data.pipelineType === 'agendamento';
  const pipelineGradient = isAgendamento ? 'bg-gradient-agendamento' : 'bg-gradient-indicacao';
  const pipelineGlow = isAgendamento ? 'glow-agendamento' : 'glow-indicacao';

  return (
    <div 
      className={`h-full flex flex-col p-8 transition-all duration-700 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Header - Clean */}
      <div className="flex items-center gap-4 mb-6">
        <div className={`w-12 h-12 rounded-xl ${pipelineGradient} flex items-center justify-center animate-float ${pipelineGlow}`}>
          <Flame className="w-6 h-6 text-primary-foreground" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-muted-foreground uppercase tracking-widest">
            Última Conversão
          </h2>
          <div className="flex items-center gap-2 mt-0.5">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span className="text-success text-xs font-medium">Ao vivo</span>
          </div>
        </div>
      </div>

      {/* Main Content - Fluid, no container within container */}
      <div className={`flex-1 flex flex-col justify-center relative ${animateEntry ? 'animate-new-entry' : ''}`}>
        {/* Background Glow Effect */}
        <div className="absolute inset-0 pointer-events-none">
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full blur-3xl opacity-20 ${pipelineGradient}`} />
        </div>

        {/* Title - Prominent */}
        <h1 className="text-5xl xl:text-6xl 2xl:text-7xl font-black leading-tight mb-12 text-gradient-primary relative z-10">
          {data.title}
        </h1>

        {/* Info Row - Inline, clean */}
        <div className="flex items-center gap-12 relative z-10">
          {/* Responsible */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
              <User className="w-6 h-6 text-primary" />
            </div>
            <div>
              <span className="text-muted-foreground text-sm uppercase tracking-wider block">
                Responsável
              </span>
              <p className="text-2xl xl:text-3xl font-bold text-foreground">
                {data.responsible}
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="w-px h-16 bg-border/50" />

          {/* Pipeline */}
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl ${pipelineGradient} flex items-center justify-center`}>
              <GitBranch className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <span className="text-muted-foreground text-sm uppercase tracking-wider block">
                Esteira
              </span>
              <p className="text-2xl xl:text-3xl font-bold text-foreground">
                {data.pipeline}
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="w-px h-16 bg-border/50" />

          {/* Time */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-success/20 flex items-center justify-center">
              <Clock className="w-6 h-6 text-success" />
            </div>
            <div>
              <span className="text-muted-foreground text-sm uppercase tracking-wider block">
                Horário
              </span>
              <p className="text-2xl xl:text-3xl font-bold font-mono text-foreground">
                {data.time}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
