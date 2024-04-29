import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import moment from "moment/moment.js";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

// const __dirname = dirname(fileURLToPath(import.meta.url));
if (typeof __dirname === "undefined")
  globalThis.__dirname = dirname(fileURLToPath(import.meta.url));

export function saveCorpus(title, article) {
  const outputDir = resolve(__dirname, "..", "output");
  //const time = moment().format('|YYYY-MM-DD|HH:mm:ss'); window文件命名规则 不能包含这些字符\ / : * ? " < > | ”
  //   const time = moment().format("_YYYY-MM-DD_HH-mm-ss");
  const time = moment().format("x");
  const outputFile = resolve(outputDir, `${title}${time}.txt`);

  if (!existsSync(outputDir)) {
    debugger;
    mkdirSync(outputDir);
  }

  const text = `${title}\n\n    ${article.join("\n     ")}`;
  writeFileSync(outputFile, text);

  return outputFile;
}

export function loadCorpus(src) {
  const path = resolve(__dirname, "..", src);
  const data = readFileSync(path, { encoding: "utf-8" });
  return JSON.parse(data);
}
