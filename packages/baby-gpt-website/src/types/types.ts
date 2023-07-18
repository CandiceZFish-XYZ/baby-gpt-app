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

export type QuestionsResponse = {
  questions: string[];
};

export type AnswerRequest = {
  role: string;
  age: string;
  question: string;
};

export type AnswerResponse = {
  answer: string;
};
