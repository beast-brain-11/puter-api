const express = require('express');
const app = express();
const axios = require('axios');

// Replace the API endpoint URL and authentication details as needed
const apiEndpoint = 'https://api.puter.com/v2/chat';
const authToken = 'YOUR_AUTH_TOKEN_HERE';
const APIOrigin = 'https://api.puter.com';

app.post('/api/chat', async (req, res) => {
  const { prompt, model } = req.body;
  const url = `${apiEndpoint}?model=${model}&prompt=${prompt}`;
  const config = {
    method: 'post',
    url,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
  };

  const response = await axios(config);
  const responseData = response.data;

  // Stream the response back to the client
  res.set("Content-Type", "application/json");
  res.write(JSON.stringify(responseData));
  res.end();
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
