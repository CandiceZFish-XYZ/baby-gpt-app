import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { get_completion } from "./helper/helper";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  console.log("EVENT: \n" + JSON.stringify(event, null, 2));

  const role = event.queryStringParameters?.["role"];
  const age = event.queryStringParameters?.["age"];

  const prompt = `
    Suggest five top keywords that is concerned by a caring ${role}
    during the childcare of age ${age}.
    Format your response as a json consisting of an array labeled as 'keywords'.`;

  console.log("PROMPT: \n" + prompt);

  const response = await get_completion(prompt, 0.7);
  console.log("RESPONSE: \n", response);

  const jsonRes = await JSON.parse(response);

  return {
    statusCode: 200,
    body: JSON.stringify(jsonRes),
  };
};
