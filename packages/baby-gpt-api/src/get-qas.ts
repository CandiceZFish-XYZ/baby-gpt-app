import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: "sk-",
});
const openai = new OpenAIApi(configuration);

async function get_completion(prompt, model = "gpt-3.5-turbo") {
  let response = await openai.createChatCompletion({
    model: model,
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0,
  });
  return response.data.choices[0].message?.content;
}

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  console.log("EVENT: \n" + JSON.stringify(event, null, 2));

  const role = event.queryStringParameters?.["role"];
  const age = event.queryStringParameters?.["age"];
  let age0 = Number(age?.[0]);
  let unit0 = "month";
  if (age0 >= 12) {
    age0 = Math.floor(age0 / 12);
    unit0 = "year";
  }

  let age1 = Number(age?.[1]);
  let unit1 = "month";
  if (age1 >= 12) {
    age1 = Math.floor(age1 / 12);
    unit1 = "year";
  }

  const keywords = event.queryStringParameters?.["keywords"];

  const prompt = `
    List five top questions that is concerned by a ${role} 
    during the childcare of ${age0} ${unit0} - ${age1} ${unit1} olds 
    with these keywords ${keywords}.
    Then provide a brief answer to each question in no more than 4 sentences.
    Format your response in a json list, label the question aas 'qns' and the answer as 'ans'.`;

  console.log(prompt);

  const response = await get_completion(prompt);
  let jsonRes;
  if (typeof response === "string") {
    jsonRes = await JSON.parse(response);
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: jsonRes,
    }),
  };
};