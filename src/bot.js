require("dotenv").config();

const qrcode = require("qrcode-terminal");
const { Client, LocalAuth } = require("whatsapp-web.js");
const axios = require("axios");
const rateLimit = require("axios-rate-limit");

const limiter = rateLimit(axios.create(), 10, 60000);

const mensagenstxt = ""


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
  if (message.body === "Oi Alfredozord") {
    client.sendMessage(
      message.from,
      "Oi ser humano"
    ); 
  }else if(message.body === "Olá Alfredozord"){
    client.sendMessage(
      message.from, 
      "Olá Diego, como posso ajudar?"
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
          max_tokens: 1000,
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
