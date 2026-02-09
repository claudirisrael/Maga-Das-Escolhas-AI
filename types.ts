
export enum Arcana {
  MAJOR = 'Major',
  MINOR = 'Minor'
}

export interface TarotCard {
  id: number;
  name: string;
  arcana: Arcana;
  suit?: string;
  number: string;
  meaning_upright: string;
  meaning_reversed: string;
  description: string;
  image_url: string;
}

export enum SpreadType {
  SINGLE = 'SINGLE',
  THREE_CARDS = 'THREE_CARDS',
  APHRODITE = 'APHRODITE'
}

export interface SpreadPosition {
  name: string;
  description: string;
}

export interface SpreadConfig {
  id: SpreadType;
  title: string;
  description: string;
  positions: SpreadPosition[];
}

export interface DrawnCard {
  card: TarotCard;
  isReversed: boolean;
  position: SpreadPosition;
}

export interface SavedReading {
  id: string;
  timestamp: number;
  question: string;
  spreadType: SpreadType;
  drawnCards: DrawnCard[];
  interpretation: string;
}
