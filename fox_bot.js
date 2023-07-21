require('dotenv').config();
const fs = require('fs');
const TelegramBot = require('node-telegram-bot-api');

// Substitute 'YOUR_BOT_TOKEN' with your bot's token
const bot = new TelegramBot(process.env.BOT_TOKEN, {polling: true});

bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, "Оставьте ваш отзыв");
});

bot.on('message', (msg) => {
    if (msg.text.toString().toLowerCase() !== "/start") {
        try {
            fs.appendFileSync('feedback.txt', `${msg.text}\n`, 'utf8');
            bot.sendMessage(msg.chat.id, "Ваш отзыв был сохранен. Спасибо!");
        } catch (e) {
            bot.sendMessage(msg.chat.id, "Извините, произошла ошибка при сохранении вашего отзыва.");
            console.log(`Error: ${e}`);
        }
    }
});
