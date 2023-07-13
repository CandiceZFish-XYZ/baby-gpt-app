const express = require("express");
const path = require("path");

const {
  handler: helloWorldHandler,
} = require("../baby-gpt-api/dist/get-hello-world");

const {
  handler: getKeywordHandler,
} = require("../baby-gpt-api/dist/get-keywords");

const app = express();
const port = 8080;

// Serve the static files from the 'build' directory
app.use(express.static(path.join(__dirname, "build")));

// Define the route for the API endpoint
// app.get("/api/hello-world", (req, res) => {
//   res.json({ message: "Hello Express!" });
// });

app.get("/api/hello-world", async (req, res) => {
  try {
    const event = {}; // Provide the necessary event data if required by the AWS Lambda handler
    const lambdaResult = await helloWorldHandler(event);
    const responseBody = JSON.parse(lambdaResult.body);
    res.json(responseBody);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/keywords", async (req, res) => {
  try {
    const event = {}; // Provide the necessary event data if required by the AWS Lambda handler
    const lambdaResult = await getKeywordHandler(event);
    const responseBody = JSON.parse(lambdaResult.body);
    res.json(responseBody);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Catch all other routes and return the 'index.html' file
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
