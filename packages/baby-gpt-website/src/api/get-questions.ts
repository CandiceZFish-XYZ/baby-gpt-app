import { DOMAIN } from "../constants/constants";
import { QuestionsRequest, QuestionsResponse } from "../types/types";

export const getQuestions = async (
  request: QuestionsRequest
): Promise<QuestionsResponse> => {
  try {
    console.log("Calling questions API...");
    const url = new URL(`${DOMAIN}/api/questions`);
    url.searchParams.append("role", request.role);
    url.searchParams.append("age", encodeURIComponent(request.age));
    request.keywords.forEach((kword) => {
      url.searchParams.append("keywords", kword);
    });

    const response = await fetch(url);
    const responseJson = (await response.json()) as QuestionsResponse;
    // console.log("res: ", responseJson);

    return responseJson;
  } catch (err) {
    console.log("Unexpected error occured during fetch questions: ", err);
    throw new Error("An unexpected error occured during fetch questions.");
  }
};
