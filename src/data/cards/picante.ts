import { CardData } from "@/lib/types";

// PICANTE: acciones incómodas con carga sexual. Solo formato "hacé X o tomá",
// no preguntas. Las preguntas tipo "¿alguna vez...?" van a CONFESION.

export const picanteCards: CardData[] = [
  { id: "p01", text: "{player}, decí con quién del grupo tendrías algo sin pensarlo mucho" },
  { id: "p08", text: "{player}, mirá a {randomPlayer} como si te lo quisieras levantar por 10 segundos", duration: 10 },
  { id: "p13", text: "{player}, hacé tu mejor cara de calentura. El grupo puntúa del 1 al 10" },
  { id: "p15", text: "{player}, decí quién del grupo te genera más morbo" },
  { id: "p21", text: "{player}, decí algo que te excite pero que te dé vergüenza admitir" },
  { id: "p30", text: "{player}, mirá a {randomPlayer} y decile algo que usarías para seducirlo/a" },
  { id: "p35", text: "{player}, elegí a alguien para hacer contacto visual incómodo por 15 segundos", duration: 15 },
  { id: "p37", text: "{player}, hacé un sonido que represente tu momento más hot" },
  { id: "p41", text: "{player}, el grupo decide si sos más lento/a o intenso/a en la cama" },
  { id: "p42", text: "{player} vs {randomPlayer} — contacto visual intenso sin reírse. El primero que se quiebre toma triple" },
  { id: "p43", text: "{player}, acercate a {randomPlayer} y susurrale algo provocador al oído" },
  { id: "p46", text: "{player}, el grupo vota si sos más fantasía o realidad. El que quede como 'fantasía' reparte 2 tragos" },
  { id: "p49", text: "{player}, decí algo que harías con alguien del grupo si no hubiera consecuencias" },
];
