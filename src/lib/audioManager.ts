/**
 * audioManager — singleton para musica de fondo y efectos de sonido.
 * Los volumenes se persisten en localStorage.
 */

const MUSIC_VOL_KEY = "joda_music_vol";
const SFX_VOL_KEY   = "joda_sfx_vol";

class AudioManager {
  private bgAudio: HTMLAudioElement | null = null;
  private sfxAudio: HTMLAudioElement | null = null;
  private tickAudio: HTMLAudioElement | null = null;
  private audioCtx: AudioContext | null = null;
  private _musicVol = 0.3;
  private _sfxVol   = 0.6;
  private resumeHandler: (() => void) | null = null;

  private getCtx(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.audioCtx) this.audioCtx = new AudioContext();
    return this.audioCtx;
  }

  constructor() {
    if (typeof window === 'undefined') return;
    const savedMusic = localStorage.getItem(MUSIC_VOL_KEY);
    const savedSfx   = localStorage.getItem(SFX_VOL_KEY);
    if (savedMusic !== null) this._musicVol = parseFloat(savedMusic);
    if (savedSfx   !== null) this._sfxVol   = parseFloat(savedSfx);
  }

  get musicVol() { return this._musicVol; }
  get sfxVol()   { return this._sfxVol; }

  playBg(src: string) {
    if (typeof window === 'undefined') return;
    this._clearBg();
    const audio = new Audio(src);
    audio.loop   = true;
    audio.volume = this._musicVol;
    this.bgAudio = audio;
    audio.play().catch(() => {
      if (this.bgAudio !== audio) return;
      const resume = () => {
        if (this.bgAudio === audio) audio.play().catch(() => {});
      };
      this.resumeHandler = resume;
      document.addEventListener('click',      resume, { once: true });
      document.addEventListener('touchstart', resume, { once: true });
    });
  }

  stopBg() {
    this._clearBg();
  }

  private _clearBg() {
    if (this.resumeHandler) {
      document.removeEventListener('click',      this.resumeHandler);
      document.removeEventListener('touchstart', this.resumeHandler);
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

  playSfx(src: string, volumeScale = 1) {
    if (typeof window === 'undefined' || this._sfxVol === 0) return;
    if (this.sfxAudio) {
      this.sfxAudio.pause();
      this.sfxAudio.currentTime = 0;
    }
    const audio = new Audio(src);
    audio.volume = Math.min(1, this._sfxVol * volumeScale);
    audio.play().catch(() => {});
    this.sfxAudio = audio;
    audio.addEventListener('ended', () => { this.sfxAudio = null; }, { once: true });
  }

  setSfxVol(vol: number) {
    this._sfxVol = vol;
    localStorage.setItem(SFX_VOL_KEY, String(vol));
  }

  playTimerTick(urgent = false) {
    if (typeof window === 'undefined' || this._sfxVol === 0) return;
    // Cortar el tick anterior antes de disparar el nuevo
    if (this.tickAudio) {
      this.tickAudio.pause();
      this.tickAudio.currentTime = 0;
      this.tickAudio = null;
    }
    const audio = new Audio("/sounds/clock_10_fx.mp3");
    audio.volume = Math.min(1, this._sfxVol * (urgent ? 1.8 : 1.4));
    audio.play().catch(() => {});
    this.tickAudio = audio;
    // Limpiar referencia al terminar
    audio.addEventListener("ended", () => { this.tickAudio = null; }, { once: true });
  }

  stopTimerTick() {
    if (this.tickAudio) {
      this.tickAudio.pause();
      this.tickAudio.currentTime = 0;
      this.tickAudio = null;
    }
  }

  playTypingClick() {
    if (this._sfxVol === 0) return;
    const ctx = this.getCtx();
    if (!ctx) return;
    if (ctx.state === 'suspended') ctx.resume();
    const now = ctx.currentTime;
    const vol = this._sfxVol * 0.25;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1200, now);
    gain.gain.setValueAtTime(vol, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.03);
    osc.start(now);
    osc.stop(now + 0.035);
  }
}

export const audioManager = new AudioManager();
