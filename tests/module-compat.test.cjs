const assert = require("node:assert/strict");
const { pathToFileURL } = require("node:url");
const { join } = require("node:path");

async function verifyModuleCompatibility() {
  const directRequire = require("..");

  assert.equal(typeof directRequire, "function");
  assert.equal(directRequire.default, directRequire);
  assert.equal(directRequire.RudeFilter, directRequire);

  const entryUrl = pathToFileURL(join(__dirname, "..", "index.cjs")).href;
  const imported = await import(entryUrl);

  assert.equal(typeof imported.default, "function");
  assert.equal(imported.RudeFilter, imported.default);

  imported.default.setRudeWords(["esm"]);
  assert.equal(imported.default.filter("ESM works"), "[censored] works");

  console.log("CommonJS and native ESM compatibility passed.");
}

verifyModuleCompatibility().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
