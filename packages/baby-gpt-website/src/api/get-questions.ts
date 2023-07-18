import { QuestionsRequest, QuestionsResponse } from "../types/types";

export const getQuestions = async (
  request: QuestionsRequest
): Promise<QuestionsResponse> => {
  const domain = process.env.DEV_API_URL ?? window.location.hostname;
  const url = new URL(`${domain}/api/questions`);
  url.searchParams.append("role", request.role);
  url.searchParams.append("age", encodeURIComponent(request.age));
  request.keywords.forEach((kword) => {
    url.searchParams.append("keywords", kword);
  });

  try {
    // console.log("Calling questions API...");
    const response = await fetch(url);
    const responseJson = (await response.json()) as QuestionsResponse;
    // console.log("res: ", responseJson);

    return responseJson;
  } catch (err) {
    // console.log("Fetch Questions Error: ", err);
    throw err;
  }
};
