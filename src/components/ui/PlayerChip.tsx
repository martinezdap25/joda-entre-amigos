"use client";

interface PlayerChipProps {
  name: string;
  onRemove?: () => void;
  isActive?: boolean;
  index?: number;
}

export function PlayerChip({
  name,
  onRemove,
  isActive = false,
  index = 0,
}: PlayerChipProps) {
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
          className="text-white/30 hover:text-brand-red text-lg leading-none
                     transition-colors duration-200 pl-1"
          aria-label={`Eliminar a ${name}`}
        >
          ×
        </button>
      )}
    </div>
  );
}
