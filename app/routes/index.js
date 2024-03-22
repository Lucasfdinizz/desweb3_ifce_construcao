const express = require('express');
const router = express.Router();
const Cerca = require('../lib/Cerca');
const CercaController = require('../controllers/CercaController');
const AdminController = require('../controllers/AdminController');
const SobreController = require('../controllers/SobreController'); 
const auth = require('../controllers/auth');

const adminController = new AdminController();
const sobreController = new SobreController(); 
const cercaController = new CercaController();

router.get('/cercas/editar/:id', auth, (req, res) => {
    const { id } = req.params;
    cercaController.editar(req, res);
});

router.get('/admin', auth, (req, res) => adminController.list(req, res));
router.post('/cercas', auth, (req, res) => cercaController.create(req, res));
router.get('/cercas', auth, (req, res) => cercaController.list(req, res));
router.get('/admin/create', (req, res) => res.render('criar_admin'));
router.post('/admin/create', (req, res) => adminController.create(req, res));
router.get('/admin/login', (req, res) => adminController.showLoginForm(req, res));
router.post('/admin/login', (req, res) => adminController.login(req, res));
router.get('/admins', auth, (req, res) => adminController.list(req, res));
router.put('/cercas/:id', auth, (req, res) => cercaController.update(req, res));
router.delete('/cercas/:id', auth, (req, res) => cercaController.delete(req, res));
router.get('/cercas/:id', auth, (req, res) => cercaController.getById(req, res));
router.get('/', (req, res) => res.render('index'));
router.get('/index', (req, res) => res.redirect('/'));
router.get('/sobre', (req, res) => sobreController.index(req, res));
router.get('/resposta', (req, res) => {
    const { nome, lado, id } = req.query;
    const cerca = new Cerca(nome, lado, id);
    res.render('resposta', { area: cerca.area() });
});
module.exports = router;