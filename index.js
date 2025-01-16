const express = require('express');
const app = express();

app.use(express.json()); // Middleware to parse JSON request bodies

async function streamClaudeResponse(prompt) {
    const response = await puter.ai.chat(
        prompt, 
        { model: 'claude-3-5-sonnet', stream: true }
    );

    let result = '';
    for await (const part of response) {
        result += part?.text;
    }
    return result;
}

app.post('/stream-response', async (req, res) => {
    const { prompt } = req.body;
    if (!prompt) {
        return res.status(400).send('Prompt is required!');
    }

    try {
        const data = await streamClaudeResponse(prompt);
        res.status(200).send(data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Something went wrong!');
    }
});

module.exports = app; // Export for Vercel
