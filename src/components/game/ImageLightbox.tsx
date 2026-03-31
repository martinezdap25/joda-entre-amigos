"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ZoomIn, X } from "lucide-react";

interface ImageLightboxProps {
  src: string;
  alt?: string;
}

export function ImageLightbox({ src, alt = "pose" }: ImageLightboxProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Thumbnail borroso */}
      <button
        onClick={() => setOpen(true)}
        className="mt-5 w-full max-w-[280px] h-[110px] rounded-xl overflow-hidden border border-[#C9A84C]/30 relative focus:outline-none active:scale-[0.98] transition-transform"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover blur-[3px] scale-110"
          onError={(e) => {
            (e.currentTarget.parentElement as HTMLElement).style.display = "none";
          }}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/45" />
        {/* Línea ornamental superior */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, #C9A84C, transparent)", opacity: 0.4 }}
        />
        {/* Ícono + label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5">
          <ZoomIn size={26} className="text-[#F0D98A] drop-shadow" />
          <span className="font-display text-[10px] tracking-[0.22em] text-[#F0D98A]/80 uppercase">
            Ver pose
          </span>
        </div>
        {/* Línea ornamental inferior */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, #C9A84C, transparent)", opacity: 0.25 }}
        />
      </button>

      {/* Modal fullscreen */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 px-6"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Imagen */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={alt}
                className="max-w-[90vw] max-h-[78vh] rounded-2xl object-contain border border-[#C9A84C]/20"
                style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.7), 0 0 0 1px #C9A84C11" }}
              />

              {/* Botón cerrar */}
              <button
                onClick={() => setOpen(false)}
                className="absolute -top-3.5 -right-3.5 w-9 h-9 rounded-full bg-[#18120a] border border-[#C9A84C]/50 flex items-center justify-center text-[#F0D98A] hover:bg-[#2a1f00] hover:border-[#C9A84C]/80 transition-colors"
              >
                <X size={16} />
              </button>

              {/* Label debajo */}
              <p className="font-display text-[10px] tracking-[0.25em] text-[#C9A84C]/40 uppercase text-center mt-3">
                Tocá afuera para cerrar
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
