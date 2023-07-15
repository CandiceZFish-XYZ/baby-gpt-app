import { APIGatewayProxyEvent } from "aws-lambda";

import { handler as helloWorldHandler } from "../get-hello-world";
import { handler as getKeywordHandler } from "../get-keywords";
import { handler as getQuestionsHandler } from "../get-questions";
import { handler as getAnswerHandler } from "../get-answer";

// helloWorldHandler({} as APIGatewayProxyEvent)
//   .then((response) => console.log(JSON.stringify(response)))
//   .catch((error) => console.error(error));

// ========================

// getKeywordHandler({
//   queryStringParameters: {
//     role: "Uncle",
//     age: [3, 6],
//   },
//   multiValueQueryStringParameters: {
//     age: [12, 25],
//   },
// } as unknown as APIGatewayProxyEvent)
//   .then((response) => JSON.parse(response.body))
//   .catch((error) => console.error(error));

// ========================

getQuestionsHandler({
  queryStringParameters: {
    role: "Grandpa",
  },
  multiValueQueryStringParameters: {
    age: [12, 25],
    keywords: ["safety", "nutrition", "playtime", "hygiene", "development"],
  },
} as unknown as APIGatewayProxyEvent)
  .then((response) => JSON.parse(response.body))
  .catch((error) => console.error(error));

// ========================

// getAnswerHandler({
//   queryStringParameters: {
//     role: "Grandpa",
//     question: encodeURIComponent("How much should the child eat each day?"),
//   },
//   multiValueQueryStringParameters: {
//     age: [12, 25],
//   },
// } as unknown as APIGatewayProxyEvent)
//   .then((response) => JSON.parse(response.body))
//   .catch((error) => console.error(error));
