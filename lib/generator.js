import { createRandomPicker, randomInit } from "./random.js";

function sentence(pick, replacer) {
  let ret = pick();
  for (const key in replacer) {
    ret = ret.replace(
      new RegExp(`{{${key}}}`, "g"),
      typeof replacer[key] === "function" ? replacer[key]() : replacer[key]
    );
  }
  return ret;
}

export function generate(title, { corpus, min = 6000, max = 10000 } = {}) {
  const articleLength = randomInit(min, max);

  const { famous, bosh_before, bosh, said, conclude } = corpus;

  const [pickFamous, pickBoshBefore, pickBosh, pickSaid, pickConclude] = [
    famous,
    bosh_before,
    bosh,
    said,
    conclude,
  ].map((item) => createRandomPicker(item));

  const article = [];
  let totalLength = 0;

  while (totalLength < articleLength) {
    let section = "";

    const sectionLength = randomInit(200, 500);

    while (section.length < sectionLength || !/[。？]$/.test(section)) {
      const n = randomInit(0, 100);
      if (n < 20) {
        section += sentence(pickFamous, {
          said: pickSaid,
          conclude: pickConclude,
        });
      } else if (n < 50) {
        section +=
          sentence(pickBoshBefore, { title }) + sentence(pickBosh, { title });
      } else {
        section += sentence(pickBosh, { title });
      }
    }
    totalLength += section.length;

    article.push(section);
  }
  return article;
}
