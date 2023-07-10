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

const KWORDS: string[] = [
  "Developmental milestones",
  "Nutrition and feeding",
  "Sleep patterns",
  "Safety precautions",
  "Social and emotional development",
];

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
    qns: "What are the typical developmental milestones for 1-2 year olds?",
    ans: "Some typical developmental milestones for 1-2 year olds include walking independently, saying a few words, using simple gestures, imitating others, and exploring objects with curiosity.",
  },
  {
    qns: "How much sleep do 1-2 year olds need?",
    ans: "On average, 1-2 year olds need about 11-14 hours of sleep per day, including naps. This can vary for each child, but it is important to ensure they are getting enough rest for their growth and development.",
  },
  {
    qns: "How can I encourage my 1-2 year old's language development?",
    ans: "To encourage language development, you can talk to your child frequently, read books together, sing songs, and engage in simple conversations. Responding to their attempts at communication and using gestures can also help them learn and understand language.",
  },
  {
    qns: "What are some signs that my 1-2 year old is ready for potty training?",
    ans: "Signs that your child may be ready for potty training include showing interest in the bathroom, staying dry for longer periods, being able to follow simple instructions, and showing discomfort with dirty diapers. However, every child is different, so it's important to be patient and wait for readiness cues.",
  },
  {
    qns: "How can I promote healthy eating habits for my 1-2 year old?",
    ans: "To promote healthy eating habits, offer a variety of nutritious foods, including fruits, vegetables, whole grains, and lean proteins. Allow your child to self-feed and explore different textures. Limit sugary snacks and drinks, and be a positive role model by eating healthy foods yourself.",
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
