const gpt3 = require('gpt3')
const openai = require('openai');


then 

const axios = require("axios");
const rateLimit = require("axios-rate-limit");

// Create a rate limiter with a limit of 10 requests per second
const limiter = rateLimit(axios.create(), 10, 60000);

// Use the rate-limited axios instance to make API calls
limiter({
  method: "get",
  url: "https://api.openai.com/v1/completions",
  params: {
    model: "text-davinci-003",
    prompt: message.body,
    temperature: 0,
    max_tokens: 7,
  },
  headers: {
    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
  }
}).then((response) => {
    // Handle the response from the OpenAI API
    console.log(response.data);
  })
  .catch((error) => {
    console.log(error);
  });

const params = await openai.createCompletion(options);

axios(params)
  .then((response) => {
    const openAIresponse = response.data.choice[0].text;
    client.sendMessage(message.from, openAIresponse);
  })
  .catch((error) => console.log(error));

