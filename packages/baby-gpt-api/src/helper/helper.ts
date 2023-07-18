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
): Promise<string | undefined> {
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
  const response = await openai.createChatCompletion(requestData);
  return response.data.choices[0].message?.content;
}
