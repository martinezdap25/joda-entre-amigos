import { CardData } from "@/lib/types";

// REGLA: todas las cartas deben tener al {player} como actor directo.
// El CUMPLIÓ/TOMÓ debe aplicar siempre al jugador de turno.
// ⏱️ = reto con tiempo explícito (preparado para timer futuro)

export const amigosCards: CardData[] = [
  // ── VERSUS ─────────────────────────────────────────────────
  { id: "a01", text: "VERSUS: {player} vs {randomPlayer} — Piedra, papel o tijera al mejor de 3. El que pierda toma doble, el que gane reparte 2 tragos entre el grupo" },
  { id: "a02", text: "VERSUS: {player} vs {randomPlayer} — Duelo de miradas: 30 segundos sin parpadear. El primero que parpadee pierde y toma doble", duration: 30 }, // ⏱️
  { id: "a03", text: "VERSUS: {player} vs {randomPlayer} — Pulseada. El que pierda toma, el que gane elige a alguien del grupo para que tome uno" },
  { id: "a04", text: "VERSUS: {player} vs {randomPlayer} — Cara seria: mirándose a los ojos sin reírse. El primero en quebrarse toma doble" },
  { id: "a05", text: "VERSUS: {player} vs {randomPlayer} — Reacción rápida: ¿quién es el jugador más viejo? El último en tocarlo pierde y toma" },
  { id: "a06", text: "VERSUS: {player} vs {randomPlayer} — Guerra de pulgares. El que pierda toma, el que gane obliga a alguien del grupo a tomar uno" },
  { id: "a07", text: "VERSUS: {player} vs {randomPlayer} — Nombren países alternando sin repetir. El primero que se quede en blanco o repita pierde y toma doble" },
  { id: "a08", text: "VERSUS: {player} vs {randomPlayer} — Aguanten la respiración. El que no aguante más pierde y toma. El grupo hace de árbitro", duration: 60 }, // ⏱️
  { id: "a09", text: "VERSUS: {player} vs {randomPlayer} — Batalla de humor negro. Cada uno lanza su mejor chiste oscuro. El grupo vota. El perdedor toma doble" },
  { id: "a10", text: "VERSUS: {player} vs {randomPlayer} — ¿Quién es más probable que sea infiel? El grupo vota entre los dos sin piedad. El más señalado toma doble" },
  { id: "a11", text: "VERSUS: {player} vs {randomPlayer} — Pose cómica: cada uno hace la pose más ridícula posible. El grupo vota al menos gracioso. El perdedor toma doble" },
  { id: "a12", text: "VERSUS: {player} vs {randomPlayer} — Reacción rápida: el último en quitarse el calzado pierde y toma" },
  { id: "a13", text: "{player} y {randomPlayer}: inventen un saludo con choque de manos y ejecútenlo. Si lo clavan, ganan. Si no les sale, ambos toman", poseCount: 2 },
  { id: "a14", text: "VERSUS: {player} vs {randomPlayer} — ¿A cuál de los dos llamarías para esconder un cuerpo? El grupo vota. El más señalado toma doble" },

  // ── ACCIONES DIRECTAS DEL JUGADOR ──────────────────────────
  { id: "a15", text: "{player}, decile a {randomPlayer} una verdad incómoda en menos de 5 segundos o tomás doble", duration: 5 }, // ⏱️
  { id: "a16", text: "{player}, apoyá la cabeza en el hombro de {randomPlayer} hasta tu próximo turno o tomá doble" },
  { id: "a17", text: "{player} y {randomPlayer}: cada uno dice la peor cualidad del otro. El que dude o se ría toma" },
  { id: "a18", text: "{player}, intercambiá lugar con {randomPlayer} hasta tu próximo turno" },
  { id: "a19", text: "{player}, imita a {randomPlayer}. Si el grupo no lo adivina en 3 intentos, tomás" },
  { id: "a20", text: "{player}, contá una anécdota incómoda con {randomPlayer} en 10 segundos o tomás doble", duration: 10 }, // ⏱️
  { id: "a21", text: "{player}, dale un empujón amistoso a {randomPlayer} o tomá doble" },
  { id: "a22", text: "{player}, susurrale algo incómodo a {randomPlayer}. Si se ríe, toma doble. Si no, tomás vos" },
  { id: "a23", text: "{player}, tocá la cara de {randomPlayer} durante 5 segundos sin reírte. Si fallás, tomás triple", duration: 5 }, // ⏱️
  { id: "a24", text: "{player}, intercambiá un accesorio con {randomPlayer} por 2 rondas o tomá doble" },
  { id: "a25", text: "{player}, hacé contacto visual con {randomPlayer} por 10 segundos. El primero que rompa toma", duration: 10 }, // ⏱️
  { id: "a26", text: "{player}, apoyá tu mano sobre la de {randomPlayer} hasta tu próximo turno. Si la retirás, tomás" },
  { id: "a27", text: "{player}, dale un pico a {randomPlayer} o tomá triple" },
  { id: "a28", text: "{player}, dale un apodo a {randomPlayer} ahora mismo. Si el grupo lo usa hasta el final, salvás un trago" },
  { id: "a29", text: "{player} y {randomPlayer}: digan 3 verdades incómodas alternando. El que se quede sin ideas toma triple" },
  { id: "a30", text: "{player}, decí quién te cae peor del grupo. Esa persona elige si tomás doble o triple" },
  { id: "a31", text: "ROAST: todos tienen 5 segundos para bardear a {player}. Si aguantás sin reírte ni quejarte, salvás. Si no, tomás", duration: 5 }, // ⏱️
  { id: "a32", text: "{player}, decí una verdad incómoda sobre alguien del grupo sin decir el nombre. El grupo adivina. Si lo adivinan, tomás" },

  // ── INTERACCIÓN EMOCIONAL / CONEXIÓN ───────────────────────
  { id: "a33", text: "{player}, abrazá a {randomPlayer} por la espalda y no lo/la soltés por 20 segundos o tomá doble", duration: 20 }, // ⏱️
  { id: "a34", text: "{player}, hacé contacto visual con {randomPlayer} mientras le decís algo genuinamente lindo. Si te reís, tomás" },
  { id: "a35", text: "{player}, contale al grupo el momento más vergonzoso que viviste con {randomPlayer}" },
  { id: "a36", text: "{player}, describí a {randomPlayer} como personaje de película o serie. Si el grupo no adivina, tomás" },
  { id: "a37", text: "{player}, declarale en serio algo que admirás de {randomPlayer}. Sin chiste ni ironía, o tomás doble" },
  { id: "a38", text: "{player}, contá algo que le envidias a {randomPlayer} y nunca le dijiste" },
  { id: "a39", text: "{player}, describí tu peor anécdota con alguien del grupo sin decir el nombre. El grupo adivina" },
  { id: "a40", text: "{player}, decile a {randomPlayer} lo que realmente pensás de su vida amorosa" },
  { id: "a41", text: "{player}, dale un masaje de 15 segundos en la cabeza a {randomPlayer} o tomá doble", duration: 15 }, // ⏱️
  { id: "a42", text: "{player}, contá algo que le perdonaste a alguien del grupo pero que todavía te molesta un poco" },
  { id: "a43", text: "{player}, mirá fijo a {randomPlayer} y mostrá la cara que pone cuando miente" },
  { id: "a44", text: "{player}, contá tu recuerdo favorito con alguien del grupo sin decir quién. El grupo adivina" },
  { id: "a45", text: "{player}, confesá algo que pensás sobre {randomPlayer} y que nunca te animaste a decir" },
  { id: "a46", text: "{player}, abrazá a la persona del grupo con la que tenés la relación más complicada, por 10 segundos", duration: 10 }, // ⏱️
  { id: "a47", text: "{player}, contá algo que alguien del grupo hizo por vos y que nunca le agradeciste bien" },
  { id: "a48", text: "{player}, hacé una imitación de {randomPlayer} contando una historia aburrida. El grupo puntúa del 1 al 10" },
  { id: "a49", text: "{player}, decile al grupo quién creés que es el más hipócrita de todos aquí y por qué. Sin esquivar" },
  { id: "a50", text: "{player}, imitá cómo {randomPlayer} se enoja. Si no lo reconocen en el grupo, tomás triple" },

  // ── POSES ───────────────────────────────────────────────────
  // Fotos en /public/poses/ — poseCount indica cuántos jugadores
  // poseCount 1 → solo {player} | 2 → {player}+{randomPlayer} | 3 → +{randomPlayer2}

  // — 1 jugador —
  { id: "pose01", text: "{player}, replicá esta pose. Si no querés, tomás", image: "/images/poses/pose1p1.jpg", poseCount: 1 },
  { id: "pose02", text: "{player}, replicá esta pose. Si no querés, tomás", image: "/images/poses/pose1p2.jpg", poseCount: 1 },
  { id: "pose03", text: "{player}, replicá esta pose. Si no querés, tomás", image: "/images/poses/pose1p3.jpg", poseCount: 1 },

  // — 2 jugadores —
  { id: "pose04", text: "{player} y {randomPlayer}: repliquen esta pose juntos. Si no quieren, ambos toman", image: "/images/poses/pose2p1.jpeg", poseCount: 2 },
  { id: "pose05", text: "{player} y {randomPlayer}: repliquen esta pose juntos. Si no quieren, ambos toman", image: "/images/poses/pose2p2.jpeg", poseCount: 2 },
  { id: "pose06", text: "{player} y {randomPlayer}: repliquen esta pose juntos. Si no quieren, ambos toman", image: "/images/poses/pose2p3.jpeg", poseCount: 2 },
  { id: "pose07", text: "{player} y {randomPlayer}: repliquen esta pose juntos. Si no quieren, ambos toman", image: "/images/poses/pose2p4.jpg", poseCount: 2 },
  { id: "pose08", text: "{player} y {randomPlayer}: repliquen esta pose juntos. Si no quieren, ambos toman", image: "/images/poses/pose2p5.jpg", poseCount: 2 },

  // — 3 jugadores —
  { id: "pose09", text: "{player}, {randomPlayer} y {randomPlayer2}: repliquen esta pose entre los 3. Si no quieren, todos toman", image: "/images/poses/pose3p1.png", poseCount: 3 },
  { id: "pose10", text: "{player}, {randomPlayer} y {randomPlayer2}: repliquen esta pose entre los 3. Si no quieren, todos toman", image: "/images/poses/pose3p2.jpg", poseCount: 3 },
  { id: "pose11", text: "{player}, {randomPlayer} y {randomPlayer2}: repliquen esta pose entre los 3. Si no quieren, todos toman", image: "/images/poses/pose3p3.jpeg", poseCount: 3 },
];
