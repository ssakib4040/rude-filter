import { expect } from "chai";
import RudeFilter from "../src/index";

describe("RudeFilter", () => {
  beforeEach(() => {
    // Reset the rude words list before each test
    RudeFilter.clearRudeWords();
  });

  it("should filter out rude words", () => {
    // Arrange
    const rudeWords = ["foo", "bar", "baz"];
    RudeFilter.addRudeWords(rudeWords);
    const text = "This is a foo bar baz test.";

    // Act
    const filteredText = RudeFilter.filter(text);

    // Assert
    expect(filteredText).to.equal(
      "This is a [censored] [censored] [censored] test."
    );
  });

  it("should not filter out non-rude words", () => {
    // Arrange
    const rudeWords = ["foo", "bar", "baz"];
    RudeFilter.addRudeWords(rudeWords);
    const text = "This is a test.";

    // Act
    const filteredText = RudeFilter.filter(text);

    // Assert
    expect(filteredText).to.equal(text);
  });

  it("should remove rude words", () => {
    // Arrange
    const rudeWords = ["foo", "bar", "baz"];
    RudeFilter.addRudeWords(rudeWords);

    // Act
    RudeFilter.removeRudeWords(["bar"]);

    // Assert
    expect(RudeFilter.getRudeWords()).to.deep.equal(["foo", "baz"]);
  });

  it("should avoid duplicates when adding words", () => {
    RudeFilter.addRudeWords(["foo", "Foo", "foo", " bar "]);

    expect(RudeFilter.getRudeWords()).to.deep.equal(["foo", "bar"]);
  });

  it("should match words with regex special characters", () => {
    RudeFilter.addRudeWords(["c++", "f*ck"]);
    const text = "This c++ sample and f*ck token should be filtered.";

    const filteredText = RudeFilter.filter(text, "****", { wholeWord: false });

    expect(filteredText).to.equal("This **** sample and **** token should be filtered.");
  });

  it("should support partial matching when wholeWord is disabled", () => {
    RudeFilter.addRudeWords(["bad"]);
    const text = "That is badly done.";

    const filteredText = RudeFilter.filter(text, "***", { wholeWord: false });

    expect(filteredText).to.equal("That is ***ly done.");
  });

  it("should detect rude words with hasRudeWord", () => {
    RudeFilter.addRudeWords(["nasty"]);

    expect(RudeFilter.hasRudeWord("This is NASTY behavior.")).to.equal(true);
    expect(RudeFilter.hasRudeWord("This is clean.")).to.equal(false);
  });

  it("should return matched rude words with findRudeWords", () => {
    RudeFilter.addRudeWords(["alpha", "beta", "gamma"]);

    const matches = RudeFilter.findRudeWords("Beta then gamma, no alpha? Actually alpha.");

    expect(matches).to.deep.equal(["alpha", "beta", "gamma"]);
  });

  it("should replace dictionary using setRudeWords", () => {
    RudeFilter.addRudeWords(["foo", "bar"]);
    RudeFilter.setRudeWords(["baz", "qux"]);

    expect(RudeFilter.getRudeWords()).to.deep.equal(["baz", "qux"]);
    expect(RudeFilter.filter("foo baz qux")).to.equal("foo [censored] [censored]");
  });
});
