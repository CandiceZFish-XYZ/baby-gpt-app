import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { get_completion } from "./helper/helper";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  console.log("EVENT: \n" + JSON.stringify(event, null, 2));

  const role = event.queryStringParameters?.["role"];
  const age = event.queryStringParameters?.["age"];

  let keywordStr: string | undefined = "";
  if (event.multiValueQueryStringParameters) {
    const keywords = event.multiValueQueryStringParameters?.["keywords"];
    keywordStr = keywords?.join(", ");
  } else {
    keywordStr = event.queryStringParameters?.["keywords"];
  }

  const prompt = `
    Suggest five top questions that is concerned by a caring ${role} 
    during the childcare of ${age} olds 
    in these topics: ${keywordStr}.
    Format your response as a json consisting of an array labeled as 'questions', 
    and put the question in the array without numbering.`;

  console.log("PROMPT: \n" + prompt);

  const response = await get_completion(prompt, 0.5);
  console.log("RESPONSE: \n" + response);

  const jsonRes = await JSON.parse(response);

  return {
    statusCode: 200,
    body: JSON.stringify(jsonRes),
  };
};
