# Rude Filter

A simple module that filters rude words from a given text.

## Installation

Install my-project with npm

```bash
  npm install rude-filter
```

or with yarn

```bash
  yarn add rude-filter
```

# Usage/Examples

## Adding and removing rude words

To add or remove rude words from the filter, use the following methods:

```javascript
RudeFilter.addRudeWords(["word1", "word2", ...]);
RudeFilter.removeRudeWords(["word1", "word2", ...]);
```

### Getting and clearing rude words

To get a list of the current rude words in the filter or to clear the filter, use the following methods:

```javascript
RudeFilter.getRudeWords(); // Returns an array of the current rude words
RudeFilter.clearRudeWords(); // Removes all rude words
```

## Filtering text

To filter text and replace any instances of rude words with a specified replacement string (default is "[censored]"), use the following method:

```javascript
const text = "This is a rude and inappropriate message.";
const filteredText = RudeFilter.filter(text);

console.log(filteredText);
// Output: "This is a [censored] and [censored] message."
```

## Filtering text with custom replacement string

To filter text and replace any instances of rude words with a custom replacement string, use the following method:

```javascript
const text = "This is a rude and inappropriate message.";
const filteredText = RudeFilter.filter(text, "****");

console.log(filteredText);
// Output: "This is a **** and **** message."
```
