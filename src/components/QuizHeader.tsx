import logoIcon from "@/assets/canino-logo-icon.png";

interface QuizHeaderProps {
  currentStep: number;
  totalSteps: number;
}

export default function QuizHeader({ currentStep, totalSteps }: QuizHeaderProps) {
  const progressPercent = Math.min(100, (currentStep / totalSteps) * 100);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white">
      <div className="flex flex-col items-center pt-3 pb-2">
        <span
          className="text-sm font-semibold tracking-wide mb-1"
          style={{ fontSize: "14px", color: "hsl(220 30% 25%)" }}
        >
          Canino Obediente 360°
        </span>
        <img
          src={logoIcon}
          alt="Canino Obediente 360°"
          className="w-12 h-12 rounded-full object-cover"
          style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}
        />
      </div>
      {/* Progress line */}
      <div className="w-full h-[3px]" style={{ background: "hsl(210 60% 85%)" }}>
        <div
          className="h-full transition-all duration-500 ease-out"
          style={{
            width: `${progressPercent}%`,
            background: "hsl(220 60% 35%)",
          }}
        />
      </div>
    </div>
  );
}
