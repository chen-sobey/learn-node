import readline from "readline";

function question(r1, { text, value }) {
  const q = `${text}(${value})\n`;

  return new Promise((resole) => {
    r1.question(q, (answer) => {
      resole(answer || value);
    });
  });
}

export async function interact(questions) {
  const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const answers = [];
  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    const answer = await question(r1, q);
    answers.push(answer);
  }
  r1.close();
  return answers;
}

// export function interact(questions) {
//   process.stdin.setEncoding("utf-8");

//   return new Promise((resolve) => {
//     const answers = [];
//     let i = 0;
//     let { text, value } = questions[i++];
//     console.log(`${text}(${value})`);

//     process.stdin.on("readable", () => {
//       // 操作系统兼容
//       //   const chunk = process.stdin.read().slice(0, -1);
//       const chunk = process.stdin.read().replace(/\r?\n$/, "");
//       answers.push(chunk || value);
//       const nextQuestions = questions[i++];
//       if (nextQuestions) {
//         process.stdin.read();
//         text = nextQuestions.text;
//         value = nextQuestions.value;
//         console.log(`${text}(${value})`);
//       } else {
//         resolve(answers);
//       }
//     });
//   });
// }
