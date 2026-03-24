# Rude Filter

A lightweight TypeScript library that filters rude/offensive words from text.

## Installation

Install with npm

```bash
  npm install rude-filter
```

or with yarn

```bash
  yarn add rude-filter
```

## Usage

```javascript
import RudeFilter from "rude-filter";

RudeFilter.addRudeWords(["word1", "word2"]);

const text = "This message contains word1.";
const filtered = RudeFilter.filter(text);

console.log(filtered);
// This message contains [censored].
```

## API

### Add and remove words

To add or remove rude words from the filter, use the following methods:

```javascript
RudeFilter.addRudeWords(["word1", "word2", ...]);
RudeFilter.setRudeWords(["newWord1", "newWord2", ...]);
RudeFilter.removeRudeWords(["word1", "word2", ...]);
```

### Get and clear words

To get a list of the current rude words in the filter or to clear the filter, use the following methods:

```javascript
RudeFilter.getRudeWords(); // Returns an array of the current rude words
RudeFilter.clearRudeWords(); // Removes all rude words
```

### Filter text

Filter text with the default replacement:

```javascript
RudeFilter.setRudeWords(["rude", "inappropriate"]);
const text = "This is a rude and inappropriate message.";
const filteredText = RudeFilter.filter(text);

console.log(filteredText);
// Output: "This is a [censored] and [censored] message."
```

Filter with a custom replacement string:

```javascript
const filteredText = RudeFilter.filter(text, "****");

console.log(filteredText);
// Output: "This is a **** and **** message."
```

Filter with options:

```javascript
RudeFilter.setRudeWords(["bad"]);

// wholeWord = false will also match inside larger words
RudeFilter.filter("That is badly done", "***", { wholeWord: false });
// Output: "That is ***ly done"

// caseSensitive = true uses case-sensitive matching
RudeFilter.filter("BAD bad", "***", { caseSensitive: true });
// Output: "BAD ***"
```

### Detect words without replacing

```javascript
RudeFilter.setRudeWords(["alpha", "beta"]);

RudeFilter.hasRudeWord("This contains BETA");
// true

RudeFilter.findRudeWords("beta and alpha are present");
// ["alpha", "beta"]
```
