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
    temperature: 0.5,
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

  const prompt = `
    Suggest five top keywords that is concerned by a ${role} 
    during the childcare of ${age0} ${unit0} - ${age1} ${unit1} olds.
    Format your response as json format.`;

  console.log(prompt);

  // const response = await get_completion(prompt);
  let jsonRes = prompt;
  // if (typeof response === "string") {
  //   jsonRes = await JSON.parse(response);
  // }

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: jsonRes,
    }),
  };
};
