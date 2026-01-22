import { Activity, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import type { PipelineType } from "./LastConversion";

export interface LogEntry {
  id: number;
  action: string;
  operator: string;
  time: string;
  pipeline: string;
  pipelineType: PipelineType;
}

interface ActivityLogProps {
  entries?: LogEntry[];
}

const defaultLogs: LogEntry[] = [
  { id: 1, action: "Consulta Agendada", operator: "Ana Paula", time: "14:32", pipeline: "Indicação", pipelineType: "indicacao" },
  { id: 2, action: "Lead Qualificado", operator: "Carlos", time: "14:28", pipeline: "Agendamento", pipelineType: "agendamento" },
  { id: 3, action: "Retorno Confirmado", operator: "Mariana", time: "14:25", pipeline: "Indicação", pipelineType: "indicacao" },
  { id: 4, action: "Exame Marcado", operator: "Pedro", time: "14:21", pipeline: "Agendamento", pipelineType: "agendamento" },
  { id: 5, action: "Consulta Agendada", operator: "Julia", time: "14:18", pipeline: "Indicação", pipelineType: "indicacao" },
];

export function ActivityLog({ entries = defaultLogs }: ActivityLogProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Limit to exactly 5 entries, no scroll
  const displayEntries = entries.slice(0, 5);

  return (
    <div 
      className={`h-full flex flex-col p-6 transition-all duration-700 delay-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-9 h-9 rounded-lg bg-primary/20 flex items-center justify-center">
          <Activity className="w-4 h-4 text-primary" />
        </div>
        <h2 className="text-lg font-bold text-foreground">Histórico</h2>
      </div>

      {/* Log List - Fixed 5 items, no scroll */}
      <div className="flex-1 flex flex-col justify-between">
        {displayEntries.map((log, index) => {
          const isAgendamento = log.pipelineType === 'agendamento';
          const pipelineColor = isAgendamento 
            ? 'bg-gradient-agendamento text-primary-foreground' 
            : 'bg-gradient-indicacao text-primary-foreground';
          const dotColor = isAgendamento ? 'bg-primary' : 'bg-accent';

          return (
            <div
              key={log.id}
              className="flex items-center gap-3 py-1"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {/* Status Dot */}
              <div className={`w-2 h-2 rounded-full ${dotColor} flex-shrink-0`} />

              {/* Content */}
              <div className="flex-1 min-w-0 flex items-center gap-2">
                <p className="font-medium text-foreground text-sm truncate">
                  {log.action}
                </p>
                <span className="text-muted-foreground text-xs">•</span>
                <span className="text-xs text-muted-foreground truncate">
                  {log.operator}
                </span>
              </div>

              {/* Pipeline Badge */}
              <span className={`text-xs px-2 py-0.5 rounded-full ${pipelineColor} flex-shrink-0`}>
                {log.pipeline}
              </span>

              {/* Time */}
              <div className="flex items-center gap-1 text-muted-foreground flex-shrink-0">
                <Clock className="w-3 h-3" />
                <span className="text-xs font-mono">{log.time}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
