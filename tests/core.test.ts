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
});
