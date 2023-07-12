import { APIGatewayProxyEvent } from "aws-lambda";

// import { handler } from "../get-hello-world";

// handler({} as APIGatewayProxyEvent)
//   .then((response) => console.log(JSON.stringify(response)))
//   .catch((error) => console.error(error));

// ========================

import { handler } from "../get-keywords";
handler({
  queryStringParameters: {
    role: "Grandpa",
    age: [12, 25],
  },
} as unknown as APIGatewayProxyEvent)
  .then((response) => JSON.parse(response.body))
  .then((res) => console.log(res))
  .catch((error) => console.error(error));

// ========================

// import { handler } from "../get-qas";

// handler({
//   queryStringParameters: {
//     role: "Grandpa",
//     age: [12, 25],
//     keywords: ["safety", "nutrition", "playtime", "hygiene", "development"],
//   },
// } as unknown as APIGatewayProxyEvent)
//   .then((response) => JSON.parse(response.body))
//   .then((res) => console.log(res))
//   .catch((error) => console.error(error));
