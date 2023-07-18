import { Configuration, OpenAIApi, CreateChatCompletionRequest } from "openai";
import { API_KEY } from "../secrets";

const configuration = new Configuration({
  apiKey: API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function get_completion(
  prompt: string,
  temperature = 0.1,
  model = "gpt-3.5-turbo"
): Promise<string> {
  const requestData: CreateChatCompletionRequest = {
    model: model,
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: temperature,
  };

  let responseData;
  try {
    const response = await openai.createChatCompletion(requestData);

    if (response.status !== 200) {
      responseData = `API REQUEST FAILED: ${response.status} ${response.statusText}`;
    } else if (
      !response.data.choices ||
      response.data.choices.length === 0 ||
      !response.data.choices[0].message
    ) {
      responseData = "OPENAI API ERROR: Invalid API response format";
    } else {
      responseData = response.data.choices[0].message.content;
    }
  } catch (err) {
    console.log("UNEXPECTED ERROR: \n", err);
    throw new Error("An unexpected error occured.");
  }

  return responseData;
}
