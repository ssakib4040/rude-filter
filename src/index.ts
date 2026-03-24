type MatchOptions = {
  caseSensitive?: boolean;
  wholeWord?: boolean;
};

type FilterOptions = MatchOptions;

const DEFAULT_REPLACEMENT = "[censored]";

class RudeFilter {
  static rudeWords: string[] = [];

  private static normalizeWord(word: string): string {
    return word.trim();
  }

  private static toComparable(word: string, caseSensitive = false): string {
    return caseSensitive ? word : word.toLowerCase();
  }

  private static escapeRegex(text: string): string {
    return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  private static sanitizeWords(words: string[]): string[] {
    const seen = new Set<string>();
    const sanitized: string[] = [];

    for (const rawWord of words) {
      const word = RudeFilter.normalizeWord(rawWord);
      if (!word) {
        continue;
      }

      const key = RudeFilter.toComparable(word);
      if (!seen.has(key)) {
        seen.add(key);
        sanitized.push(word);
      }
    }

    return sanitized;
  }

  private static buildRegex(word: string, options: MatchOptions = {}): RegExp {
    const escapedWord = RudeFilter.escapeRegex(word);
    const caseFlag = options.caseSensitive ? "g" : "gi";
    const pattern = options.wholeWord === false ? escapedWord : `\\b${escapedWord}\\b`;
    return new RegExp(pattern, caseFlag);
  }

  static addRudeWords(words: string[]) {
    const existing = new Set(RudeFilter.rudeWords.map((word) => RudeFilter.toComparable(word)));

    for (const rawWord of words) {
      const word = RudeFilter.normalizeWord(rawWord);
      if (!word) {
        continue;
      }

      const key = RudeFilter.toComparable(word);
      if (!existing.has(key)) {
        existing.add(key);
        RudeFilter.rudeWords.push(word);
      }
    }
  }

  static setRudeWords(words: string[]) {
    RudeFilter.rudeWords = RudeFilter.sanitizeWords(words);
  }

  static removeRudeWords(words: string[]) {
    if (words.length === 0) {
      return;
    }

    const removeSet = new Set(words.map((word) => RudeFilter.toComparable(RudeFilter.normalizeWord(word))));
    RudeFilter.rudeWords = RudeFilter.rudeWords.filter((word) => !removeSet.has(RudeFilter.toComparable(word)));
  }

  static getRudeWords() {
    return [...RudeFilter.rudeWords];
  }

  static clearRudeWords() {
    RudeFilter.rudeWords = [];
  }

  static hasRudeWord(text: string, options: MatchOptions = {}) {
    return RudeFilter.rudeWords.some((word) => RudeFilter.buildRegex(word, options).test(text));
  }

  static findRudeWords(text: string, options: MatchOptions = {}) {
    return RudeFilter.rudeWords.filter((word) => RudeFilter.buildRegex(word, options).test(text));
  }

  static filter(
    text: string,
    replacementOrOptions: string | FilterOptions = DEFAULT_REPLACEMENT,
    options: FilterOptions = {}
  ) {
    const replacement = typeof replacementOrOptions === "string" ? replacementOrOptions : DEFAULT_REPLACEMENT;
    const matchOptions = typeof replacementOrOptions === "string" ? options : replacementOrOptions;

    let filteredText = text;
    for (const word of RudeFilter.rudeWords) {
      const regex = RudeFilter.buildRegex(word, matchOptions);
      filteredText = filteredText.replace(regex, replacement);
    }
    return filteredText;
  }
}

export type { FilterOptions, MatchOptions };
export default RudeFilter;
