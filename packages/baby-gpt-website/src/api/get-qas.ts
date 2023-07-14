interface Question {
  question: string;
  answer: string;
}

type QuestionsResponse = Question[];

type QuestionsRequest = {
  role: string;
  age: number[];
  keywords: string[];
};

const DEV_API = "http://localhost:8081";
const formatQueryString = (paramObject) => {
  return Object.entries(paramObject)
    .flatMap(([key, values]) =>
      Array.isArray(values)
        ? values.map(
            (value) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
          )
        : `${encodeURIComponent(key)}=${encodeURIComponent(values)}`
    )
    .join("&");
};

export const getQuestions = async (
  request: QuestionsRequest
): Promise<QuestionsResponse> => {
  // const url = new URL("");
  // url.searchParams.append()

  const queryStringParams = {
    role: request.role,
    age: request.age,
    keywords: request.keywords,
  };
  const queryString = formatQueryString(queryStringParams);

  try {
    let response = await fetch(`${DEV_API}/api/qas?${queryString}`);
    let responseJson = await response.json();

    return responseJson as QuestionsResponse;
  } catch (err) {
    console.log("QA API Error: ", err);
    throw err;
  }
};
