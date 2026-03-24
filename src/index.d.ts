export type MatchOptions = {
  caseSensitive?: boolean;
  wholeWord?: boolean;
};

export type FilterOptions = MatchOptions;

declare class RudeFilter {
  static rudeWords: string[];
  static addRudeWords(words: string[]): void;
  static setRudeWords(words: string[]): void;
  static removeRudeWords(words: string[]): void;
  static getRudeWords(): string[];
  static clearRudeWords(): void;
  static hasRudeWord(text: string, options?: MatchOptions): boolean;
  static findRudeWords(text: string, options?: MatchOptions): string[];
  static filter(text: string, replacement?: string, options?: FilterOptions): string;
  static filter(text: string, options?: FilterOptions): string;
}

export default RudeFilter;
