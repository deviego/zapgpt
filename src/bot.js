require("dotenv").config();

const { Configuration, OpenAIApi } = require("openai");
const qrcode = require("qrcode-terminal");
const { Client, LocalAuth } = require("whatsapp-web.js");
const axios = require("axios");
const rateLimit = require("axios-rate-limit");

// Create a rate limiter with a limit of 10 requests per second
const limiter = rateLimit(axios.create(), 10, 60000);

const configuration = new Configuration({
  organization: "org-JLMIHF3WO2FV5SCBBcfjKdRe",
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const client = new Client({
  authStrategy: new LocalAuth(),
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("authenticated", (session) => {
  console.log("Autenticado com sucesso");
});

client.on("ready", () => {
  console.log("Cliente pronto");
});

client.on("message", async (message) => {
  if (message.body === "oi") {
    client.sendMessage(
      message.from,
      "Olá sou o  Alfredozord,  secretário do Diego, ele não está disponível agora pode deixar uma mensagem obg"
    );
  } else {
    try {
      // Use the rate-limited axios instance to make API calls
      const response = await limiter({
        method: "post",
        url: "https://api.openai.com/v1/completions",
        data: {
          model: "text-davinci-003",
          prompt: message.body,
          temperature: 0,
          max_tokens: 7,
        },
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      });

      // Handle the response from the OpenAI API
      client.sendMessage(message.from, response.data.choices[0].text);
    } catch (error) {
      console.log(error);
    }
  }
});

client.initialize();
