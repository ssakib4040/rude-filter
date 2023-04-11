declare class RudeFilter {
  static rudeWords: string[];
  static addRudeWords(words: string[]): void;
  static removeRudeWords(words: string[]): void;
  static getRudeWords(): string[];
  static clearRudeWords(): void;
  static filter(text: string, replacement?: string): string;
}

export default RudeFilter;
