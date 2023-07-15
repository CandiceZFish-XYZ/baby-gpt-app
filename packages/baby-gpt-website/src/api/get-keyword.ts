type KeywordsResponse = {
  keywords: string[];
};

type KeywordsRequest = {
  role: string;
  age: string;
};

const DEV_API = "http://localhost:8081";

export const getKeywords = async (
  request: KeywordsRequest
): Promise<KeywordsResponse> => {
  const queryString = new URLSearchParams();
  queryString.append("role", encodeURIComponent(request.role));
  queryString.append("age", encodeURIComponent(request.age));

  try {
    let response = await fetch(
      `${DEV_API}/api/keywords?${queryString.toString()}`
    );
    let responseJson = await response.json();

    return responseJson as KeywordsResponse;
  } catch (err) {
    console.log("Keywords API Error: ", err);
    throw err;
  }
};
