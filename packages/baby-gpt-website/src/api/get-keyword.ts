import { DOMAIN } from "../constants/constants";
import { KeywordsRequest, KeywordsResponse } from "../types/types";

export const getKeywords = async (
  request: KeywordsRequest
): Promise<KeywordsResponse> => {
  //TODO: role & Age as utility function

  try {
    console.log("Calling keywords API...");
    const url = new URL(`${DOMAIN}/api/keywords`);
    url.searchParams.append("role", encodeURIComponent(request.role));
    url.searchParams.append("age", encodeURIComponent(request.age));

    const response = await fetch(url);
    const responseJson = (await response.json()) as KeywordsResponse;
    // console.log("res: ", responseJson);

    return responseJson;
  } catch (err) {
    console.error("Unexpected error occured during fetch keywords: ", err);
    throw new Error("An unexpected error occured during fetch keywords.");
  }
};
