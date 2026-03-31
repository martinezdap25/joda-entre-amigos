/**
 * sounds.ts — Web Audio API sound engine
 * Todos los sonidos se generan programáticamente, sin archivos externos.
 */

let ctx: AudioContext | null = null;

// Mute state — persiste en localStorage
const MUTE_KEY = "joda-muted";
let muted: boolean =
  typeof window !== "undefined" && localStorage.getItem(MUTE_KEY) === "true";

export function isMuted(): boolean {
  return muted;
}

export function toggleMute(): boolean {
  muted = !muted;
  if (typeof window !== "undefined") {
    localStorage.setItem(MUTE_KEY, String(muted));
  }
  return muted;
}

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) ctx = new AudioContext();
  if (ctx.state === "suspended") ctx.resume();
  return ctx;
}

// ── Helpers ─────────────────────────────────────────────────────────────────

function playTone(
  freq: number,
  duration: number,
  volume: number,
  type: OscillatorType = "sine",
  startAt = 0,
  freqEnd?: number
) {
  const c = getCtx();
  if (!c || muted) return;

  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.connect(gain);
  gain.connect(c.destination);

  osc.type = type;
  const t = c.currentTime + startAt;

  osc.frequency.setValueAtTime(freq, t);
  if (freqEnd !== undefined) {
    osc.frequency.exponentialRampToValueAtTime(freqEnd, t + duration);
  }

  gain.gain.setValueAtTime(volume, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + duration);

  osc.start(t);
  osc.stop(t + duration + 0.01);
}

// ── Sonidos públicos ─────────────────────────────────────────────────────────

/** Swipe de carta nueva */
export function playCardReveal() {
  playTone(180, 0.1, 0.12, "triangle", 0, 550);
}

/** CUMPLIÓ / CLAVARON / botón positivo */
export function playSuccess() {
  playTone(261, 0.1, 0.15, "sine", 0);      // C4
  playTone(329, 0.1, 0.15, "sine", 0.1);    // E4
  playTone(392, 0.14, 0.18, "sine", 0.2);   // G4
}

/** TOMÓ / NO CLAVARON / botón negativo */
export function playFail() {
  playTone(220, 0.18, 0.14, "sawtooth", 0, 160); // A3 → descenso
  playTone(160, 0.22, 0.10, "sawtooth", 0.18, 110);
}

/** Timer arranca */
export function playTimerStart() {
  playTone(600, 0.12, 0.12, "sine", 0);
}

/** Tick normal (cada segundo) */
export function playTimerTick() {
  playTone(900, 0.04, 0.06, "sine");
}

/** Tick urgente (últimos 3 segundos) */
export function playTimerUrgent() {
  playTone(1300, 0.05, 0.22, "square");
}

/** Timer agotado — alarma */
export function playTimerDone() {
  for (let i = 0; i < 4; i++) {
    playTone(i % 2 === 0 ? 880 : 440, 0.12, 0.25, "square", i * 0.13);
  }
}

/** BASTA — press para reiniciar el hot-potato */
export function playBastaPress() {
  playTone(200, 0.09, 0.18, "sawtooth", 0, 70);
}
