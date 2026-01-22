import { Crown, TrendingUp, Medal } from "lucide-react";
import { useEffect, useState } from "react";

export interface Operator {
  id: number;
  name: string;
  conversions: number;
  avatar: string;
}

interface OperatorRankingProps {
  operators?: Operator[];
}

const defaultOperators: Operator[] = [
  { id: 1, name: "Ana Paula Santos", conversions: 47, avatar: "AS" },
  { id: 2, name: "Carlos Oliveira", conversions: 42, avatar: "CO" },
  { id: 3, name: "Mariana Costa", conversions: 38, avatar: "MC" },
  { id: 4, name: "Pedro Henrique", conversions: 31, avatar: "PH" },
  { id: 5, name: "Julia Fernandes", conversions: 28, avatar: "JF" },
];

function getRankStyles(position: number) {
  switch (position) {
    case 1:
      return {
        bg: "bg-gradient-gold",
        glow: "glow-gold",
        icon: <Crown className="w-4 h-4" />,
        textColor: "text-gradient-gold",
        scale: "scale-105",
      };
    case 2:
      return {
        bg: "bg-gradient-silver",
        glow: "",
        icon: <Medal className="w-4 h-4" />,
        textColor: "text-foreground/80",
        scale: "",
      };
    case 3:
      return {
        bg: "bg-gradient-bronze",
        glow: "",
        icon: <Medal className="w-4 h-4" />,
        textColor: "text-foreground/70",
        scale: "",
      };
    default:
      return {
        bg: "bg-muted",
        glow: "",
        icon: null,
        textColor: "text-muted-foreground",
        scale: "",
      };
  }
}

export function OperatorRanking({ operators = defaultOperators }: OperatorRankingProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const maxConversions = operators[0]?.conversions || 1;

  return (
    <div 
      className={`h-full flex flex-col p-6 transition-all duration-700 delay-200 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-9 h-9 rounded-lg bg-gradient-primary flex items-center justify-center">
          <TrendingUp className="w-4 h-4 text-primary-foreground" />
        </div>
        <h2 className="text-lg font-bold text-foreground">Ranking do Dia</h2>
      </div>

      {/* Rankings - No scroll, all visible */}
      <div className="flex-1 flex flex-col justify-between">
        {operators.slice(0, 5).map((operator, index) => {
          const position = index + 1;
          const styles = getRankStyles(position);
          const progressWidth = (operator.conversions / maxConversions) * 100;

          return (
            <div
              key={operator.id}
              className={`relative flex items-center gap-3 py-2 ${styles.scale}`}
            >
              {/* Progress Bar - Behind */}
              <div 
                className="absolute left-0 top-0 bottom-0 rounded-lg bg-primary/5 transition-all duration-1000"
                style={{ width: `${progressWidth}%` }}
              />

              {/* Position */}
              <div 
                className={`relative z-10 w-8 h-8 rounded-lg ${styles.bg} flex items-center justify-center text-primary-foreground font-bold text-sm ${styles.glow}`}
              >
                {position <= 3 ? styles.icon : position}
              </div>

              {/* Avatar */}
              <div className="relative z-10 w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                <span className="text-xs font-bold text-muted-foreground">
                  {operator.avatar}
                </span>
              </div>

              {/* Name */}
              <div className="relative z-10 flex-1 min-w-0">
                <p className={`font-semibold truncate text-sm ${styles.textColor}`}>
                  {operator.name}
                </p>
              </div>

              {/* Score */}
              <div className={`relative z-10 text-xl font-black font-mono ${styles.textColor}`}>
                {operator.conversions}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
