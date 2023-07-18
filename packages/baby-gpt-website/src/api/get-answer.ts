import { AnswerRequest, AnswerResponse } from "../types/types";

export const getAnswer = async (
  request: AnswerRequest
): Promise<AnswerResponse> => {
  const domain = process.env.DEV_API_URL ?? window.location.hostname;
  const url = new URL(`${domain}/api/answer`);
  url.searchParams.append("role", request.role);
  url.searchParams.append("age", encodeURIComponent(request.age));
  url.searchParams.append("question", encodeURIComponent(request.question));

  try {
    // console.log("Calling answer API...");
    const response = await fetch(url);
    const responseJson = (await response.json()) as AnswerResponse;
    // console.log("res: ", responseJson);

    return responseJson;
  } catch (err) {
    // console.log("Fetch Questions Error: ", err);
    throw err;
  }
};
