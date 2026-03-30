"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: `
    bg-gradient-to-r from-brand-fire via-brand-red to-brand-pink
    text-white
    shadow-[0_8px_30px_rgba(255,23,68,0.35)]
    hover:shadow-[0_10px_40px_rgba(255,23,68,0.5)]
    hover:brightness-110
    active:shadow-[0_4px_15px_rgba(255,23,68,0.3)]
    disabled:from-white/10 disabled:via-white/10 disabled:to-white/10
    disabled:shadow-none disabled:text-white/25
  `,
  secondary: `
    bg-white/5 border-2 border-white/15 text-white
    hover:bg-white/10 hover:border-white/25
    active:bg-white/[0.06]
    disabled:bg-white/[0.03] disabled:border-white/[0.06] disabled:text-white/20
  `,
  ghost: `
    bg-transparent border border-white/10 text-white/60
    hover:bg-white/5 hover:border-white/20 hover:text-white
    active:bg-white/[0.03]
    disabled:text-white/20 disabled:border-white/[0.06]
  `,
  danger: `
    bg-gradient-to-r from-brand-red to-brand-pink
    text-white
    shadow-[0_8px_30px_rgba(255,23,68,0.3)]
    hover:shadow-[0_10px_40px_rgba(255,23,68,0.45)]
    hover:brightness-110
    active:shadow-[0_4px_15px_rgba(255,23,68,0.25)]
    disabled:from-white/10 disabled:to-white/10
    disabled:shadow-none disabled:text-white/25
  `,
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "py-2.5 px-5 text-sm rounded-xl tracking-wide",
  md: "py-4 px-8 text-base rounded-2xl tracking-wider",
  lg: "py-5 px-10 text-xl rounded-2xl tracking-wider",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "lg",
      loading = false,
      fullWidth = false,
      disabled,
      children,
      className = "",
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={`
          relative inline-flex items-center justify-center gap-2.5
          font-display uppercase border-none outline-none
          cursor-pointer transition-all duration-300
          select-none
          ${sizeStyles[size]}
          ${variantStyles[variant]}
          ${fullWidth ? "w-full" : ""}
          ${isDisabled ? "cursor-not-allowed opacity-60" : "hover:scale-[1.02] active:scale-[0.97]"}
          ${className}
        `}
        {...props}
      >
        {/* Loading spinner */}
        {loading && (
          <span
            className="w-4 h-4 border-2 border-white/30 border-t-white
                       rounded-full animate-spin shrink-0"
          />
        )}

        {/* Ripple overlay on press */}
        <span
          className={`
            absolute inset-0 rounded-[inherit] pointer-events-none
            transition-opacity duration-150
            bg-white/10 opacity-0
            active:opacity-100
          `}
        />

        <span className={loading ? "opacity-70" : ""}>{children}</span>
      </button>
    );
  }
);

Button.displayName = "Button";
