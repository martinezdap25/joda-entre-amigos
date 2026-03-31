/**
 * audioManager — singleton para música de fondo y efectos de sonido.
 * Los volúmenes se persisten en localStorage.
 */

const MUSIC_VOL_KEY = "joda_music_vol";
const SFX_VOL_KEY   = "joda_sfx_vol";

class AudioManager {
  private bgAudio: HTMLAudioElement | null = null;
  private _musicVol = 0.3;
  private _sfxVol   = 0.6;
  private resumeHandler: (() => void) | null = null;

  constructor() {
    if (typeof window === "undefined") return;
    const savedMusic = localStorage.getItem(MUSIC_VOL_KEY);
    const savedSfx   = localStorage.getItem(SFX_VOL_KEY);
    if (savedMusic !== null) this._musicVol = parseFloat(savedMusic);
    if (savedSfx   !== null) this._sfxVol   = parseFloat(savedSfx);
  }

  get musicVol() { return this._musicVol; }
  get sfxVol()   { return this._sfxVol; }

  /* ── Música de fondo ─────────────────────────────── */

  playBg(src: string) {
    if (typeof window === "undefined") return;
    // Ya está sonando el mismo archivo — no hacer nada
    if (this.bgAudio && !this.bgAudio.paused && this.bgAudio.src.endsWith(src)) return;
    this._clearBg();
    const audio = new Audio(src);
    audio.loop   = true;
    audio.volume = this._musicVol;
    // Asignamos ANTES de play() para que el guard del .catch() funcione
    // aunque stopBg() sea llamado entre play() y la resolución del promise
    this.bgAudio = audio;
    audio.play().catch(() => {
      // Si stopBg() fue llamado antes de que este microtask corriera,
      // bgAudio ya no es este audio — no registrar el listener huérfano
      if (this.bgAudio !== audio) return;
      const resume = () => {
        if (this.bgAudio === audio) audio.play().catch(() => {});
      };
      this.resumeHandler = resume;
      document.addEventListener("click",      resume, { once: true });
      document.addEventListener("touchstart", resume, { once: true });
    });
  }

  stopBg() {
    this._clearBg();
  }

  private _clearBg() {
    // Limpia listeners pendientes de autoplay
    if (this.resumeHandler) {
      document.removeEventListener("click",      this.resumeHandler);
      document.removeEventListener("touchstart", this.resumeHandler);
      this.resumeHandler = null;
    }
    if (this.bgAudio) {
      this.bgAudio.pause();
      this.bgAudio = null;
    }
  }

  setMusicVol(vol: number) {
    this._musicVol = vol;
    if (this.bgAudio) this.bgAudio.volume = vol;
    localStorage.setItem(MUSIC_VOL_KEY, String(vol));
  }

  /* ── Efectos de sonido ───────────────────────────── */

  playSfx(src: string) {
    if (typeof window === "undefined" || this._sfxVol === 0) return;
    const audio = new Audio(src);
    audio.volume = this._sfxVol;
    audio.play().catch(() => {});
  }

  setSfxVol(vol: number) {
    this._sfxVol = vol;
    localStorage.setItem(SFX_VOL_KEY, String(vol));
  }
}

export const audioManager = new AudioManager();
