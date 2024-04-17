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

app.use(express.static('public'))
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());

// Defina as chaves VAPID e a chave GCM
webpush.setGCMAPIKey('AIzaSyCrIK0ypxsyGnY-17LbQ0dDFAxFEKZknJk');
webpush.setVapidDetails(
  'mailto:example@yourdomain.org',
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

let subscriptions = [];
// Rota para salvar as subscrições
app.post('/subscribe', (req, res) => {
    const subscription = req.body;
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
    console.log('Notificando', subscriptions);
    Promise.all(subscriptions.map(subscription => {
        return webpush.sendNotification(subscription, payload)
            .catch(error => console.error('Erro ao notificar:', error));
    }))
    .then(() => res.send('ok'))
    .catch(() => res.status(500).send('Erro ao enviar notificações'));
});

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use((req, res, next) => {
    console.log(`[${new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}] ${req.method} to ${req.url}`);
    next();
});
app.use('/', router);
app.use((req, res, next) => {
    res.status(404).send('Página não encontrada');
});

mongoose.connection.on('connected', () => {
    app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
});