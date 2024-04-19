const express = require('express');
const app = express();
const path = require('path');
const router = require('./routes/index');
const session = require('express-session');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const webpush = require('web-push');

require('dotenv').config(); // Carrega as variáveis de ambiente do arquivo .env

// Defina as chaves VAPID - você pode gerar essas chaves usando o web-push
webpush.setVapidDetails(
    'mailto:seuemail@example.com',
    process.env.VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY
);

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Conexão com o MongoDB estabelecida com sucesso');
    })
    .catch((error) => {
        console.error('Erro ao estabelecer conexão com o MongoDB:', error);
    });

app.use(methodOverride('_method'));
app.use(session({
    secret: process.env.SEGREDO_JWT,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));
app.use(flash());

app.use((req, res, next) => {
    res.locals.messages = req.session.messages;
    delete req.session.messages;
    next();
});

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use((req, res, next) => {
    console.log(`[${new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}] ${req.method} to ${req.url}`);
    next();
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Rota para salvar as subscrições
app.post('/subscribe', (req, res) => {
    subscription = req.body;
    subscriptions.push(subscription);
    console.log({ subscriptions });
    res.status(201).json({});
});

app.get('/push', (req, res) => {
    res.render('push');
});

// Rota para enviar notificações
app.get('/notificar', (req, res) => {
    const payload = JSON.stringify({ title: req.query.msg });
    console.log('notificando', subscriptions);
    for (let subscription of subscriptions) {
        webpush.sendNotification(subscription, payload)
            .catch(error => console.error('Erro ao notificar:', error));
        console.log('notificando', subscription);
    }
    res.send('ok');
});

app.use('/', router);

app.use((req, res, next) => {
    res.status(404).send('Página não encontrada');
});

mongoose.connection.on('connected', () => {
    app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
});