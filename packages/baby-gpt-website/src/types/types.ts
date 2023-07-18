export type ApiResult<T> = {
  // data & loading for next section!
  data: T | undefined;
  loading: boolean;
  error: Error | undefined;
};

export type KeywordsRequest = {
  role: string;
  age: string;
};

export type KeywordsResponse = {
  keywords: string[];
};

export type QuestionsRequest = {
  role: string;
  age: string;
  keywords: string[];
};

export type Question = {
  question: string;
  answer: string;
};

export type QuestionsResponse = Question[];
