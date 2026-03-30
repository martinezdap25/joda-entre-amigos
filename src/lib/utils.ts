import { CardData, GameCard, CardCategory } from "./types";

/**
 * Fisher-Yates shuffle — returns a new shuffled array.
 */
export function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Replace {player} and {randomPlayer} placeholders in card text.
 */
export function processCardText(
  text: string,
  currentPlayer: string,
  allPlayers: string[]
): string {
  let result = text.replace(/{player}/g, currentPlayer);

  const others = allPlayers.filter((p) => p !== currentPlayer);
  if (others.length > 0) {
    const randomOther = others[Math.floor(Math.random() * others.length)];
    result = result.replace(/{randomPlayer}/g, randomOther);
  }

  return result;
}

/**
 * Build the full deck from a category-keyed card map.
 */
export function buildDeck(
  cardMap: Record<CardCategory, CardData[]>
): GameCard[] {
  return Object.entries(cardMap).flatMap(([category, cards]) =>
    cards.map((card) => ({
      ...card,
      category: category as CardCategory,
    }))
  );
}

/**
 * Build an interlaced deck: group cards (TODOS) appear in pairs
 * every 5 player cards, so they feel like "racha grupal" moments.
 */
export function buildInterlacedDeck(
  cardMap: Record<CardCategory, CardData[]>
): GameCard[] {
  const groupCards: GameCard[] = [];
  const playerCards: GameCard[] = [];

  for (const [cat, cards] of Object.entries(cardMap)) {
    const gameCards = cards.map((card) => ({
      ...card,
      category: cat as CardCategory,
    }));
    if (cat === "TODOS") {
      groupCards.push(...gameCards);
    } else {
      playerCards.push(...gameCards);
    }
  }

  const sg = shuffleArray(groupCards);
  const sp = shuffleArray(playerCards);

  const result: GameCard[] = [];
  let gi = 0;

  // Every 5 player cards, insert 2 group cards (consecutive "racha grupal")
  for (let i = 0; i < sp.length; i++) {
    result.push(sp[i]);
    if ((i + 1) % 5 === 0) {
      if (gi < sg.length) result.push(sg[gi++]);
      if (gi < sg.length) result.push(sg[gi++]);
    }
  }

  // Append remaining group cards
  while (gi < sg.length) {
    result.push(sg[gi++]);
  }

  return result;
}
