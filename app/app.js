const express = require('express');
const app = express();
const path = require('path');
const router = require('./routes/index');
const session = require('express-session');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

require('dotenv').config();

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