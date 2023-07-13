const http = require("http");
const httpProxy = require("http-proxy");
const { createProxyMiddleware } = require("http-proxy-middleware");

const express = require("express");
const cors = require("cors");

const targetUrl = "https://babygpt.xzhou.dev";

const apiProxy = httpProxy.createProxyServer({
  target: targetUrl,
  changeOrigin: true,
});

const proxy = createProxyMiddleware("/api", {
  target: targetUrl,
  changeOrigin: true,

  onProxyRes: (proxyRes, req, res) => {
    // Add the necessary CORS headers to the response
    proxyRes.headers["Access-Control-Allow-Origin"] = "http://localhost:8080";
    proxyRes.headers["Access-Control-Allow-Methods"] =
      "GET, POST, PUT, DELETE, OPTIONS";
    proxyRes.headers["Access-Control-Allow-Headers"] = "Content-Type";
  },
});

const server = http.createServer((req, res) => {
  if (req.url.startsWith("/api")) {
    proxy(req, res);
  } else {
    // Handle other requests as needed
    // For example, you can serve your React app here
    // or delegate it to your existing React local server
  }
});

const port = 8081;
server.listen(port, () => {
  console.log(`Proxy server listening on port ${port}`);
});

const app = express();

app.use(cors());
