import { options } from "./lib/cmd.js";
import { loadCorpus, saveCorpus } from "./lib/corpus.js";
import { generate } from "./lib/generator.js";
import { interact } from "./lib/interact.js";
import { createRandomPicker } from "./lib/random.js";

// readFile("./corpus/data.json", { encoding: "utf-8" }, (err, data) => {
//   if (!err) {
//     console.log(data, "data");
//   } else {
//     console.error(err);
//   }
// });

// const url = import.meta.url;
// const path = resolve(dirname(fileURLToPath(url)), "corpus/data.json");

// const data = readFileSync(path, { encoding: "utf-8" });

// const corpus = JSON.parse(data);

// const pickFamous = createRandomPicker(corpus.famous);
// const pickBosh = createRandomPicker(corpus.bosh);

// console.log(pickFamous(), pickBosh(), "random");

const corpus = loadCorpus("corpus/data.json");

let title = options.title || createRandomPicker(corpus.title)();

(async function () {
  if (Object.keys(options).length <= 0) {
    const answers = await interact([
      { text: "请输入文章主题", value: title },
      { text: "请输入最小字数", value: 6000 },
      { text: "请输入最大字数", value: 10000 },
    ]);
    title = answers[0];
    options.min = answers[1];
    options.max = answers[2];
  }

  const article = generate(title, { corpus, ...options });
  const output = saveCorpus(title, article);
  console.log(`生成成功！文章保存于：${output}`);
})();
