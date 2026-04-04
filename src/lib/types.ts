export type CardCategory =
  | "RETO"
  | "CONFESION"
  | "TODOS"
  | "AMIGOS"
  | "PICANTE"
  | "BASTA"
  | "VERSUS"
  | "ADIVINA";

export interface CardData {
  id: string;
  text: string;
  points?: number;         // puntos que da esta carta; si no se define, usa el default de la categoría
  duration?: number;       // segundos para el timer (⏱️), undefined = sin timer
  description?: string;    // texto aclaratorio opcional, se muestra en gris pequeño
  spoiler?: boolean;       // si true, description se muestra oculta hasta que se mantenga presionado
  cardSubtype?: "save_half" | "partner" | "solo"; // subtipo especial con lógica propia
  minPlayers?: number;     // cantidad mínima de jugadores para que esta carta entre al mazo
  colorOptions?: string[]; // colores posibles para reemplazar {randomColor} al generar el mazo
  monthOptions?: string[]; // meses posibles para reemplazar {randomMonth} al generar el mazo
  image?: string;          // ruta de imagen opcional (ej: "/poses/pose1.jpg")
  poseCount?: 1 | 2 | 3;  // cantidad de jugadores requeridos para la pose
}

export interface GameCard extends CardData {
  category: CardCategory;
}

export interface CategoryConfig {
  label: string;
  emoji: string;
  color: string;
  bgGlow: string;
  tailwindColor: string;
  points: number; // cuántos puntos (copas/medallas) da esta categoría
  isGroupCard: boolean; // sin turno individual, sin scoring
}

export interface PlayerScore {
  name: string;
  medals: number;  // 🏅 cumplió el reto
  drinks: number;  // 🍷 tomó
}

export type GameScreen = "setup" | "playing" | "finished";

export interface GameState {
  players: string[];
  deck: GameCard[];
  cardIndex: number;
  turnIndex: number;
  screen: GameScreen;
}
