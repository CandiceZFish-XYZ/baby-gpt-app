type Question = {
  question: string;
  answer: string;
};

type QuestionsResponse = Question[];

type QuestionsRequest = {
  role: string;
  age: string;
  keywords: string[];
};

// TODO: Change response type to object
const r = {
  questions: ["this is question 1", "q2", "q3"],
};

export const getQuestions = async (
  request: QuestionsRequest
): Promise<QuestionsResponse> => {
  // TODO: Use URL
  const queryString = new URLSearchParams();
  queryString.append("role", request.role);
  queryString.append("age", encodeURIComponent(request.age));
  request.keywords.map((kword) => {
    queryString.append("keywords", kword);
  });

  try {
    const domain = process.env.DEV_API_URL ?? window.location.hostname;
    const response = await fetch(
      `${domain}/api/questions?${queryString.toString()}`
    );
    const responseJson = (await response.json()) as QuestionsResponse;
    console.log("res: ", responseJson);

    return responseJson;
  } catch (err) {
    console.log("Questions API Error: ", err);
    throw err;
  }
};
