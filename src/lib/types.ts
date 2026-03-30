export type CardCategory =
  | "RETO"
  | "CONFESION"
  | "ELIGE"
  | "TODOS"
  | "AMIGOS"
  | "PICANTE";

export interface CardData {
  id: string;
  text: string;
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
}

export type GameScreen = "setup" | "playing" | "finished";

export interface GameState {
  players: string[];
  deck: GameCard[];
  cardIndex: number;
  turnIndex: number;
  screen: GameScreen;
}
