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
    if (this.bgAudio) { this.bgAudio.pause(); this.bgAudio = null; }
    const audio = new Audio(src);
    audio.loop   = true;
    audio.volume = this._musicVol;
    audio.play().catch(() => {
      // Autoplay bloqueado — arrancar en la primera interacción del usuario
      const resume = () => { audio.play().catch(() => {}); };
      document.addEventListener("click",      resume, { once: true });
      document.addEventListener("touchstart", resume, { once: true });
    });
    this.bgAudio = audio;
  }

  stopBg() {
    if (!this.bgAudio) return;
    this.bgAudio.pause();
    this.bgAudio = null;
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
