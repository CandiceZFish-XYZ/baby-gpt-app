export const GetDelay = (): number => {
  return Math.floor(Math.random() * 4) + 1;
};

export const MockRole = (delay: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
      console.log("Mock Role API");
    }, delay * 1000);
  });
};

export const MockKeywords = (delay: number): Promise<string[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const kwords: string[] = [
        "keyword1",
        "keyword2",
        "key3",
        "k4",
        "k55",
        "k6.k",
      ];
      resolve(kwords.slice(0, delay));
      console.log("Mock Keywords API");
    }, delay * 1000);
  });
};

export const MockQns = (delay: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();

      console.log("Mock Qns API");
    }, delay * 1000);
  });
};
