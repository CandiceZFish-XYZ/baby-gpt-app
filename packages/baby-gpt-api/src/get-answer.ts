import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { get_completion } from "./helper/helper";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  console.log("EVENT: \n" + JSON.stringify(event, null, 2));

  const role = event.queryStringParameters?.["role"];
  const age = event.queryStringParameters?.["age"];

  const question = event.queryStringParameters?.question
    ? decodeURIComponent(event.queryStringParameters.question)
    : "";

  const prompt = `
    As a caring ${role} for a ${age} old child, 
    please provide a brief answer to the following question in one paragraph. 
    Format the response in JSON, label the answer as 'answer' and include the source as 'source'. 
    You may refer to reputable expert resources, such as well-known organizations, professionals, childcare magazines, or websites. 
    """
    Question:
    ${question}
    """`;
  console.log("PROMPT: \n" + prompt);

  const response = await get_completion(prompt, 0.3);
  console.log("RESPONSE: \n" + response);

  const jsonRes = await JSON.parse(response);

  return {
    statusCode: 200,
    body: JSON.stringify(jsonRes),
  };
};
