import { Crown, TrendingUp, Medal } from "lucide-react";
import { useEffect, useState } from "react";

interface Operator {
  id: number;
  name: string;
  conversions: number;
  avatar: string;
}

const mockOperators: Operator[] = [
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
        icon: <Crown className="w-5 h-5" />,
        textColor: "text-gradient-gold",
      };
    case 2:
      return {
        bg: "bg-gradient-silver",
        glow: "",
        icon: <Medal className="w-5 h-5" />,
        textColor: "text-foreground/80",
      };
    case 3:
      return {
        bg: "bg-gradient-bronze",
        glow: "",
        icon: <Medal className="w-5 h-5" />,
        textColor: "text-foreground/70",
      };
    default:
      return {
        bg: "bg-muted",
        glow: "",
        icon: null,
        textColor: "text-muted-foreground",
      };
  }
}

export function OperatorRanking() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const maxConversions = mockOperators[0]?.conversions || 1;

  return (
    <div 
      className={`h-full flex flex-col p-6 transition-all duration-700 delay-200 ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
      }`}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-gold flex items-center justify-center">
          <TrendingUp className="w-5 h-5 text-primary-foreground" />
        </div>
        <h2 className="text-xl font-bold text-foreground">Ranking</h2>
      </div>

      {/* Rankings List */}
      <div className="flex-1 space-y-3 overflow-hidden">
        {mockOperators.map((operator, index) => {
          const position = index + 1;
          const styles = getRankStyles(position);
          const progressWidth = (operator.conversions / maxConversions) * 100;

          return (
            <div
              key={operator.id}
              className={`glass rounded-2xl p-4 relative overflow-hidden animate-scale-in ${
                position === 1 ? 'ring-2 ring-accent/30' : ''
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Progress Bar Background */}
              <div 
                className="absolute inset-0 bg-primary/5 transition-all duration-1000"
                style={{ width: `${progressWidth}%` }}
              />

              <div className="relative z-10 flex items-center gap-4">
                {/* Position Badge */}
                <div 
                  className={`w-10 h-10 rounded-xl ${styles.bg} flex items-center justify-center text-primary-foreground font-bold text-lg ${styles.glow}`}
                >
                  {position <= 3 ? styles.icon : position}
                </div>

                {/* Avatar */}
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                  <span className="text-sm font-bold text-muted-foreground">
                    {operator.avatar}
                  </span>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className={`font-bold truncate ${position === 1 ? 'text-lg' : 'text-base'} ${styles.textColor}`}>
                    {operator.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {operator.conversions} conversões
                  </p>
                </div>

                {/* Score */}
                <div className={`text-2xl font-black font-mono ${styles.textColor}`}>
                  {operator.conversions}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
