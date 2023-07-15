type KeywordsResponse = {
  keywords: string[];
};

type KeywordsRequest = {
  role: string;
  age: string;
};

export const getKeywords = async (
  request: KeywordsRequest
): Promise<KeywordsResponse> => {
  // TODO: Support both dev URL and real URL
  const domain = process.env.DEV_API_URL ?? window.location.hostname;
  const url = new URL(`${domain}/api/keywords`);
  url.searchParams.append("role", encodeURIComponent(request.role));
  url.searchParams.append("age", encodeURIComponent(request.age));

  try {
    let response = await fetch(url);
    let responseJson = (await response.json()) as KeywordsResponse;
    console.log("res: ", responseJson);

    return responseJson;
  } catch (err) {
    console.log("Keywords API Error: ", err);
    throw err;
  }
};
