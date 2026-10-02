"use strict";

const RudeFilter = require("./build/index.js").default;

// Keep the existing `.default` access while also supporting direct CommonJS,
// native ESM default imports, and a named ESM import.
module.exports = RudeFilter;
module.exports.default = RudeFilter;
module.exports.RudeFilter = RudeFilter;
Object.defineProperty(module.exports, "__esModule", { value: true });
