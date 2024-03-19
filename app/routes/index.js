const SobreController = require('../controllers/SobreController');
const express = require('express');
const router = express.Router();
const Cerca = require('../lib/Cerca');
const CercaController = require('../controllers/CercaController');
const AdminController = require('../controllers/AdminController');

const adminController = new AdminController();
const sobreController = new SobreController();
const cercaController = new CercaController();

router.get('/cercas/editar/:id', (req, res) => {
    const { id } = req.params;
    cercaController.editar(req, res);
});

router.get('/admin', (req, res) => {
    const messages = req.flash();
    res.render('admins', { messages });
});

router.get('/admin/create', (req, res) => res.render('criar_admin'));
router.get('/admin/login', (req, res) => adminController.showLoginForm(req, res)); // Adicionado
router.post('/admin/login', (req, res) => adminController.login(req, res));
router.get('/admin', (req, res) => adminController.list(req, res)); // Modificado
router.get('/admins', (req, res) => adminController.list(req, res));
router.post('/cercas', (req, res) => cercaController.create(req, res));
router.get('/cercas', (req, res) => cercaController.list(req, res));
router.put('/cercas/:id', (req, res) => cercaController.update(req, res));
router.delete('/cercas/:id', (req, res) => cercaController.delete(req, res));
router.get('/cercas/:id', (req, res) => cercaController.getById(req, res));
router.get('/', (req, res) => res.render('index'));
router.get('/index', (req, res) => res.redirect('/'));
router.get('/sobre', (req, res) => sobreController.index(req, res));
router.get('/resposta', (req, res) => {
    const { nome, lado, id } = req.query;
    const cerca = new Cerca(nome, lado, id);
    res.render('resposta', { area: cerca.area() });
});

module.exports = router;