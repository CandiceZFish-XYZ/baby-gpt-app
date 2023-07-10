export const GetDelay = (): number => {
  return Math.floor(Math.random() * 4) + 1;
};

// export const MockRole = (delay: number): Promise<void> => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve();
//       console.log("Mock Role API");
//     }, delay * 1000);
//   });
// };

const KWORDS: string[] = ["keyword1", "keyword2", "key3", "k4", "k55", "k6.k"];

export const MockKeywords = (delay: number): Promise<string[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(KWORDS.slice(0, delay));
      console.log("Mock Keywords API");
    }, delay * 1000);
  });
};

const QA = [
  {
    qns: "Question 1 blablabla",
    ans: "Ans 1 o style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also wort",
  },
  {
    qns: "Question 2 blablabla",
    ans: "Ans 2 oting that just about any HTML can go within the .accordion-body, though the transition does limi",
  },
  {
    qns: "Question 3 blablabla",
    ans: "Ans 3 blabhile the styling of badges provides a visual cue as to their purpose, these users will simply be presented with the content of the labla",
  },
  {
    qns: "Question 4 blablabla",
    ans: "Ans 4 o style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also wort",
  },
  {
    qns: "Question 5 blablabla",
    ans: "Ans 5 oting that just about any HTML can go within the .accordion-body, though the transition does limi",
  },
  {
    qns: "Question 6 blablabla",
    ans: "Ans 6 blabhile the styling of badges provides a visual cue as to their purpose, these users will simply be presented with the content of the labla",
  },
];

export const MockQAs = (delay: number): Promise<object[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(QA.slice(0, delay));
      console.log("Mock QAs API");
    }, delay * 1000);
  });
};
