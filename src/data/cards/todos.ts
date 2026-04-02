import { CardData } from "@/lib/types";

// REGLA: estas cartas NO tienen jugador de turno — afectan a todo el grupo.
// No generan CUMPLIÓ/TOMÓ individual. Solo botón SIGUIENTE.

export const todosCards: CardData[] = [

  // ── TOMAN TODOS LOS QUE... ───────────────────────────────────
  { id: "t01", text: "Toman todos los que alguna vez hicieron un trío" },
  { id: "t02", text: "Toman todos los que están en pareja actualmente" },
  { id: "t03", text: "Toman todos los que han tenido un one night stand" },
  { id: "t04", text: "Toman todos los que han usado juguetes sexuales" },
  { id: "t05", text: "Toman todos los que alguna vez mandaron fotos o videos subidos de tono" },
  { id: "t06", text: "Toman todos los que trabajan actualmente" },
  { id: "t07", text: "Toman todos los que van o fueron a la universidad" },
  { id: "t08", text: "Toman todos los que alguna vez mintieron en una primera cita" },
  { id: "t09", text: "Toman todos los que alguna vez fingieron en la cama" },
  { id: "t10", text: "Toman todos los que alguna vez tuvieron sentimientos por alguien de este grupo" },
  { id: "t11", text: "Toman todos los que alguna vez espiaron el celular de su pareja o ex" },
  { id: "t12", text: "Toman todos los que tienen tatuajes en lugares que no se ven con ropa" },
  { id: "t13", text: "Toman todos los que alguna vez tuvieron sexo en un lugar público" },
  { id: "t14", text: "Toman todos los que todavía hablan con algún ex" },
  { id: "t15", text: "Toman todos los que alguna vez bloquearon a alguien después de tener algo" },
  { id: "t16", text: "Toman todos los que tienen más de 3 ex" },
  { id: "t17", text: "Toman todos los que alguna vez besaron a alguien del mismo sexo" },
  { id: "t18", text: "Toman todos los que alguna vez se excitaron pensando en alguien de este grupo" },
  { id: "t19", text: "Toman todos los que alguna vez tuvieron sexo el mismo día que conocieron a alguien" },
  { id: "t20", text: "Toman todos los que alguna vez lloraron después de sexo" },
  { id: "t21", text: "Toman todos los que alguna vez tuvieron un aventura o chamuyo con alguien comprometido" },
  { id: "t22", text: "Toman todos los que alguna vez se levantaron a alguien de un velorio, boda o entierro" },
  { id: "t23", text: "Toman todos los que actualmente tienen conversaciones secretas en el celu que nunca mostrarían" },
  { id: "t24", text: "Toman todos los que alguna vez tuvieron sexo con alguien del trabajo o estudio" },
  { id: "t25", text: "Toman todos los que alguna vez perdieron un amigo/a por enamorarse de la misma persona" },

  // ── ¿QUIÉN ES MÁS PROBABLE QUE...? ─────────────────────────
  { id: "t26", text: "¿Quién es más probable que haya tenido el mayor número de parejas? El grupo decide. Esa persona toma doble" },
  { id: "t27", text: "¿Quién es más probable que sea mejor en la cama de lo que aparenta? El grupo vota. Esa persona toma doble" },
  { id: "t28", text: "¿Quién es más probable que tenga el historial de búsqueda más comprometedor? Esa persona toma triple" },
  { id: "t29", text: "¿Quién es más probable que sea infiel si pudiera sin consecuencias? El grupo vota. Esa persona toma doble" },
  { id: "t30", text: "¿Quién es más probable que haya mandado nudes? El más señalado toma doble" },
  { id: "t31", text: "¿Quién es más probable que acabe solo/a para siempre? Esa persona reparte 3 tragos como quiera" },
  { id: "t32", text: "¿Quién es más probable que llore primero esta noche? Esa persona toma doble ahora para adelantarse" },
  { id: "t33", text: "¿Quién es más probable que haya tenido el peor ex? El más señalado cuenta la historia o toma triple" },

  // ── RONDAS GRUPALES ─────────────────────────────────────────
  { id: "t34", text: "Ronda de números: todos dicen en voz alta con cuántas personas han tenido sexo. El número más bajo toma triple" },
  { id: "t35", text: "Todos muestran la última foto de su galería sin elegirla. El que no quiera mostrarla toma triple" },
  { id: "t36", text: "Ronda sincera: todos dicen la peor mentira que dijeron para conquistar a alguien" },
  { id: "t37", text: "Todos dicen algo que nunca contarían en una primera cita. El que se niegue toma triple" },
  { id: "t38", text: "Todos dicen qué harían con 24 horas de anonimato total. El más aburrido según el grupo toma doble" },
  { id: "t39", text: "El grupo vota quién tiene la vida más interesante de todos. Esa persona reparte 3 tragos como quiera" },
  { id: "t40", text: "Ronda de elogios: todos dicen algo genuinamente lindo sobre la persona a su derecha, sin ironía. El que falle toma doble" },
  { id: "t41", text: "Todos toman si alguna vez pensaron en alguien de este grupo en un momento íntimo. No hay que decir quién" },
  { id: "t42", text: "Todos dicen en una palabra cómo son en la cama. El grupo vota quién mintió más evidente. Esa persona toma triple" },
  { id: "t43", text: "El grupo vota quién del grupo cambió más para bien y quién para mal. El de peor cambio toma triple" },
  { id: "t44", text: "Todos toman si alguna vez tuvieron un sueño sexual con alguien de este grupo esta semana... o este mes" },
  { id: "t45", text: "Ronda de caos: todos deben hablar sin parar durante 10 segundos al mismo tiempo. El primero que frene toma", duration: 10 }, // ⏱️
  { id: "t46", text: "El grupo vota quién tiene más vida sexual activa. Esa persona confiesa la ultima vez que lo hizo o toma triple" },
  { id: "t47", text: "Ronda grupal: todos deben aplaudir al mismo ritmo durante 15 segundos. El que se descoordine toma", duration: 15 }, // ⏱️
  { id: "t48", text: "CAOS TOTAL: todos votan en silencio quién debe tomar triple. Se revelan los votos al mismo tiempo. Sin defensa posible" },
  { id: "t49", text: "VERSUS GRUPAL: todos eligen un número del 1 al 20 y lo dicen a la vez. El que más se aleje del promedio toma triple" },
  { id: "t50", text: "El grupo vota quién tiene el mejor y el peor estilo de todos. El de mejor estilo reparte 2 tragos, el de peor toma 2" },

];
