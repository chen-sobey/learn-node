import { generate } from "../lib/generator";
import { createRandomPicker } from "../lib/random";

const defaultCorpus = require("../corpus/data.json");

async function loadCorpus(corpusPath) {
  if (corpusPath) {
    const corpus = await (await fetch(corpusPath)).json();
    return corpus;
  }
  return defaultCorpus;
}

export { createRandomPicker, generate, loadCorpus };
