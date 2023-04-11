class RudeFilter {
  static rudeWords: string[] = [];

  static addRudeWords(words: string[]) {
    RudeFilter.rudeWords.push(...words);
  }

  static removeRudeWords(words: string[]) {
    for (const word of words) {
      const index = RudeFilter.rudeWords.indexOf(word);
      if (index > -1) {
        RudeFilter.rudeWords.splice(index, 1);
      }
    }
  }

  static getRudeWords() {
    return RudeFilter.rudeWords;
  }

  static clearRudeWords() {
    RudeFilter.rudeWords = [];
  }

  static filter(text: string, replacement = "[censored]") {
    let filteredText = text;
    for (const word of RudeFilter.rudeWords) {
      const regex = new RegExp("\\b" + word + "\\b", "gi");
      filteredText = filteredText.replace(regex, replacement);
    }
    return filteredText;
  }
}

export default RudeFilter;
