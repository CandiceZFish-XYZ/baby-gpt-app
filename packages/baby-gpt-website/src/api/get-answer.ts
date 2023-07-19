import { DOMAIN } from "../constants/constants";
import { AnswerRequest, AnswerResponse } from "../types/types";

export const getAnswer = async (
  request: AnswerRequest
): Promise<AnswerResponse> => {
  try {
    console.log("Calling answer API...");
    const url = new URL(`${DOMAIN}/api/answer`);
    url.searchParams.append("role", request.role);
    url.searchParams.append("age", encodeURIComponent(request.age));
    url.searchParams.append("question", encodeURIComponent(request.question));

    const response = await fetch(url);
    const responseJson = (await response.json()) as AnswerResponse;
    // console.log("res: ", responseJson);

    return responseJson;
  } catch (err) {
    console.log("Unexpected error occured during fetch answer: ", err);
    throw new Error("An unexpected error occured during fetch answer.");
  }
};
