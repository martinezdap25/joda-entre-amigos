import { CardData } from "@/lib/types";

// REGLA: estas cartas NO tienen jugador de turno — afectan a todo el grupo.
// No generan CUMPLIÓ/TOMÓ individual. Solo botón SIGUIENTE.

export const todosCards: CardData[] = [
  // ── SEÑALAMIENTOS (grupo apunta a alguien) ──────────────────
  { id: "t01", text: "Todos señalen al más probable de desaparecer en una cita" },
  { id: "t02", text: "Todos señalen al que tiene peor gusto musical del grupo" },
  { id: "t03", text: "El grupo vota: ¿quién es el más drama queen?" },
  { id: "t04", text: "Todos señalen al que peor baila. Esa persona tiene que demostrarlo" },
  { id: "t05", text: "Todos señalen al más tóxico/a en relaciones" },
  { id: "t06", text: "El grupo decide quién sería el peor sobreviviente del apocalipsis" },
  { id: "t07", text: "Todos señalen al más probable de terminar en la cárcel (broma)" },
  { id: "t08", text: "Todos señalen al que más se victimiza del grupo" },
  { id: "t09", text: "El grupo vota: ¿quién es el más terco/a?" },
  { id: "t10", text: "Todos señalen al más probable de llorar primero en una peli sad" },
  { id: "t11", text: "El grupo decide quién es el mejor y el peor dando consejos" },
  { id: "t12", text: "Todos señalen al que más cambia de opinión" },
  { id: "t13", text: "Todos señalen al más probable de hacerse viral por algo ridículo" },
  { id: "t14", text: "Todos señalen al que más miente del grupo" },
  { id: "t15", text: "El grupo decide quién tiene la risa más fea (con demostración)" },
  { id: "t16", text: "Todos señalen al más tacaño/a del grupo" },
  { id: "t17", text: "Todos señalen al más impuntual del grupo" },
  { id: "t18", text: "Todos señalen al que peor piropeá" },
  { id: "t19", text: "El grupo vota: ¿quién del grupo exagera más cuando cuenta una historia?" },
  { id: "t20", text: "Todos señalen a quien del grupo tiene más cara de inocente cuando está planeando algo turbio" },
  { id: "t21", text: "Todos señalen al que del grupo sería el primero en contar un secreto del grupo bajo presión" },
  { id: "t22", text: "Todos señalen a quien del grupo creen que tiene más éxito seduciendo sin que se note" },

  // ── TOMAN LOS QUE… (se identifican solos) ──────────────────
  { id: "t23", text: "Todos los que hayan mandado un mensaje y se arrepintieron, tomen" },
  { id: "t24", text: "Todos los que hayan llorado por una serie o película, tomen" },
  { id: "t25", text: "Todos los que hayan fingido estar ocupados para no salir, tomen" },
  { id: "t26", text: "Todos los que hayan googleado sus propios síntomas y pensado lo peor, tomen" },
  { id: "t27", text: "Todos los que tienen más de 1000 fotos en el celular, tomen" },
  { id: "t28", text: "Todos los que alguna vez se hicieron los dormidos para evitar algo, tomen" },
  { id: "t29", text: "Todos los que han re-leído una conversación más de 3 veces, tomen" },
  { id: "t30", text: "Todos los que hayan pasado vergüenza esta semana, tomen" },
  { id: "t31", text: "Todos los que no recuerdan algo de su última borrachera, tomen doble" },
  { id: "t32", text: "Todos los que alguna vez dijeron 'ya estoy llegando' estando en la cama, tomen" },
  { id: "t33", text: "Todos los que hayan mandado un mensaje a la persona equivocada, tomen" },
  { id: "t34", text: "Todos los que hayan dicho 'nunca más tomo' y tomaron al día siguiente, tomen" },
  { id: "t35", text: "Todos los que alguna vez se rieron en un momento inapropiado, tomen" },
  { id: "t36", text: "Todos los que se hayan caído en público este año, tomen" },
  { id: "t37", text: "Todos los que tuvieron o tienen un crush con alguien del grupo presente, tomen (no tienen que decir con quién)" },
  { id: "t38", text: "Todos los que alguna vez enviaron algo comprometedor al número equivocado, tomen doble" },
  { id: "t39", text: "Todos los que alguna vez grabaron una conversación sin que la otra persona supiera, tomen" },
  { id: "t40", text: "Todos los que alguna vez se fueron a dormir sin avisar en una conversación, tomen" },
  { id: "t41", text: "Todos los que alguna vez le mintieron al médico sobre sus hábitos, tomen" },

  // ── REGLAS DE RONDA (vienen de AMIGOS — afectan a todos) ───
  { id: "t42", text: "Por las próximas 2 rondas nadie puede decir 'sí'. El que falle toma doble" },
  { id: "t43", text: "Por las próximas 2 rondas nadie puede decir 'no'. El que falle toma doble" },
  { id: "t44", text: "Por 1 ronda nadie puede decir nombres propios. El que falle toma" },
  { id: "t45", text: "Ronda de caos: todos deben hablar sin parar durante 10 segundos al mismo tiempo. El primero que frene toma", duration: 10 }, // ⏱️
  { id: "t46", text: "Por 1 ronda todos deben hablar en preguntas. El que use una frase normal, toma" },
  { id: "t47", text: "Ronda grupal: todos deben aplaudir al mismo ritmo durante 15 segundos. El que se descoordine toma", duration: 15 }, // ⏱️
  { id: "t48", text: "CAOS TOTAL: todos votan quién debe tomar triple. No hay defensa posible" },

  // ── VERSUS GRUPAL ───────────────────────────────────────────
  { id: "t49", text: "VERSUS GRUPAL: todos eligen un número del 1 al 20 y lo dicen a la vez. El que más se aleje del promedio toma triple" },
  { id: "t50", text: "Todos señalen al más probable de ser famoso algún día. Esa persona tiene que dar un discurso de agradecimiento en 20 segundos" },
];
