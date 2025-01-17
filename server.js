const express = require('express');
const app = express();
const { createProxyMiddleware } = require('http-proxy-middleware');

// Set up the proxy
const apiProxy = createProxyMiddleware({
  target: 'https://js.puter.com',
  changeOrigin: true,
});

// Create a route for the AI API
app.post('/v1/chat/completions', (req, res) => {
  const prompt = req.body.prompt;
  const model = req.body.model;
  const stream = req.body.stream;

  // Use the provided JavaScript file to make the request
  const script = `<script src="https://js.puter.com/v2/"></script>
  <script>
    async function streamClaudeResponse() {
      const response = await puter.ai.chat(
        "${prompt}",
        { model: "${model}", stream: ${stream} }
      );
      for await (const part of response) {
        puter.print(part?.text);
      }
    }
    streamClaudeResponse();
  </script>`;

  // Return the response from the JavaScript file
  res.set("Content-Type", "application/json");
  res.send("Your response will be streamed here");
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
