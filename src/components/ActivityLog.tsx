import { Activity, CheckCircle2, Clock } from "lucide-react";
import { useEffect, useState } from "react";

interface LogEntry {
  id: number;
  action: string;
  operator: string;
  time: string;
  pipeline: string;
}

const mockLogs: LogEntry[] = [
  { id: 1, action: "Consulta Agendada", operator: "Ana Paula", time: "14:32", pipeline: "Indicação" },
  { id: 2, action: "Lead Qualificado", operator: "Carlos", time: "14:28", pipeline: "Captação" },
  { id: 3, action: "Retorno Confirmado", operator: "Mariana", time: "14:25", pipeline: "Reativação" },
  { id: 4, action: "Exame Marcado", operator: "Pedro", time: "14:21", pipeline: "Indicação" },
  { id: 5, action: "Consulta Agendada", operator: "Julia", time: "14:18", pipeline: "Premium" },
  { id: 6, action: "Lead Qualificado", operator: "Ana Paula", time: "14:15", pipeline: "Captação" },
  { id: 7, action: "Consulta Agendada", operator: "Carlos", time: "14:10", pipeline: "Indicação" },
  { id: 8, action: "Retorno Confirmado", operator: "Mariana", time: "14:05", pipeline: "Premium" },
];

export function ActivityLog() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div 
      className={`h-full flex flex-col p-6 transition-all duration-700 delay-300 ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
      }`}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
          <Activity className="w-5 h-5 text-primary" />
        </div>
        <h2 className="text-xl font-bold text-foreground">Histórico</h2>
      </div>

      {/* Log List */}
      <div className="flex-1 overflow-y-auto space-y-2 pr-2">
        {mockLogs.map((log, index) => (
          <div
            key={log.id}
            className="glass rounded-xl p-4 animate-fade-in group hover:bg-card/80 transition-colors"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <div className="flex items-start gap-3">
              {/* Icon */}
              <div className="w-8 h-8 rounded-lg bg-success/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <CheckCircle2 className="w-4 h-4 text-success" />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground text-sm truncate">
                  {log.action}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-muted-foreground">
                    {log.operator}
                  </span>
                  <span className="text-xs text-muted-foreground/50">•</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                    {log.pipeline}
                  </span>
                </div>
              </div>

              {/* Time */}
              <div className="flex items-center gap-1.5 text-muted-foreground flex-shrink-0">
                <Clock className="w-3.5 h-3.5" />
                <span className="text-sm font-mono">{log.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
