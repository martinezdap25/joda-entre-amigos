"use client";

interface PlayerChipProps {
  name: string;
  onRemove?: () => void;
  isActive?: boolean;
  index?: number;
  romanStyle?: boolean;
}

export function PlayerChip({
  name,
  onRemove,
  isActive = false,
  index = 0,
  romanStyle = false,
}: PlayerChipProps) {
  if (!romanStyle) {
    return (
      <div
        className={`
          flex items-center gap-2 px-4 py-2.5 rounded-xl font-body text-sm
          backdrop-blur-xl transition-all duration-300 opacity-0 animate-fade-up
          ${
            isActive
              ? "bg-brand-fire/20 border border-brand-fire/30 text-brand-fire"
              : "bg-white/[0.06] border border-white/10 text-white"
          }
        `}
        style={{ animationDelay: `${index * 0.04}s` }}
      >
        <span className="truncate max-w-[120px]">{name}</span>
        {onRemove && (
          <button
            onClick={onRemove}
            className="text-white/30 hover:text-brand-red text-lg leading-none transition-colors duration-200 pl-1"
            aria-label={`Eliminar a ${name}`}
          >
            ×
          </button>
        )}
      </div>
    );
  }
  // Estilo romano/olímpico
  return (
    <div
      className={`
        flex items-center gap-2 px-5 py-2.5 rounded-[1.2rem] font-display text-base tracking-[0.08em]
        border-2 transition-all duration-300 opacity-0 animate-fade-up shadow-[0_2px_16px_rgba(201,168,76,0.10)]
        ${isActive
          ? "bg-gradient-to-r from-[#2a1f00]/70 via-[#1a1200]/80 to-[#0e0c08]/90 border-[#C9A84C] text-[#F0D98A]"
          : "bg-white/[0.03] border-[#C9A84C]/30 text-[#C9A84C]/70"}
      `}
      style={{ animationDelay: `${index * 0.04}s` }}
    >
      {/* Esquinas decorativas */}
      <span className="absolute top-[2px] left-[2px] w-2 h-2 border-t-2 border-l-2 border-[#C9A84C]/60 pointer-events-none" />
      <span className="absolute top-[2px] right-[2px] w-2 h-2 border-t-2 border-r-2 border-[#C9A84C]/60 pointer-events-none" />
      <span className="absolute bottom-[2px] left-[2px] w-2 h-2 border-b-2 border-l-2 border-[#C9A84C]/60 pointer-events-none" />
      <span className="absolute bottom-[2px] right-[2px] w-2 h-2 border-b-2 border-r-2 border-[#C9A84C]/60 pointer-events-none" />
      <span className="truncate max-w-[120px] drop-shadow-gold">{name}</span>
      {onRemove && (
        <button
          onClick={onRemove}
          className="text-[#C9A84C]/40 hover:text-brand-red text-lg leading-none transition-colors duration-200 pl-1"
          aria-label={`Eliminar a ${name}`}
        >
          ×
        </button>
      )}
    </div>
  );
}
