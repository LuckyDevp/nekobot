require('dotenv').config();
const express = require('express');
const path = require('path');
const { bot, getBotStats } = require('./bot/bot');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// API para estadísticas del bot
app.get('/api/bot/stats', (req, res) => {
    res.json(getBotStats());
});

// Iniciar bot
bot.launch().then(() => {
    console.log('Bot de Telegram iniciado');
});

// Iniciar servidor web
app.listen(PORT, () => {
    console.log(`Servidor web funcionando en http://localhost:${PORT}`);
});

// Manejo de errores
process.on('unhandledRejection', (error) => {
    console.error('Error no manejado:', error);
});