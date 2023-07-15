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

const DEV_API = "http://localhost:8081";

export const getQuestions = async (
  request: QuestionsRequest
): Promise<QuestionsResponse> => {
  const queryString = new URLSearchParams();
  queryString.append("role", request.role);
  queryString.append("age", encodeURIComponent(request.age));
  request.keywords.map((kword) => {
    queryString.append("keywords", kword);
  });

  try {
    let response = await fetch(
      `${DEV_API}/api/questions?${queryString.toString()}`
    );
    let responseJson = await response.json();

    console.log("res: ", responseJson);

    return responseJson as QuestionsResponse;
  } catch (err) {
    console.log("Questions API Error: ", err);
    throw err;
  }
};
