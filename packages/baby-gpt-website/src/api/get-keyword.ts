import { KeywordsRequest, KeywordsResponse } from "../types/types";

export const getKeywords = async (
  request: KeywordsRequest
): Promise<KeywordsResponse> => {
  //TODO: role & Age as utility function
  const domain = process.env.DEV_API_URL ?? window.location.hostname;
  const url = new URL(`${domain}/api/keywords`);
  url.searchParams.append("role", encodeURIComponent(request.role));
  url.searchParams.append("age", encodeURIComponent(request.age));

  try {
    // console.log("Calling keywords API...");
    const response = await fetch(url);
    const responseJson = (await response.json()) as KeywordsResponse;
    // console.log("res: ", responseJson);

    return responseJson;
  } catch (err) {
    // console.log("Fetch Keywords Error: ", err);
    throw err;
  }
};
