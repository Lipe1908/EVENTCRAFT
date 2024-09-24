const express = require("express");
const clientController = require("../controller/controller");
const client = require("../config/db");
const router = express.Router();

router.get('/', clientController.getRoot); //Rota Raiz
router.get('/api/read', clientController.listAllUsers); //Listar todos os usuários
router.get('/api/readEvents', clientController.listAllEvents); //Listar todos os usuários
router.get('/api/read/:id', clientController.listByID); //Listar Usuários por ID
router.post('/api/cadastro', clientController.createNewUser); //Cadastrar novo Usuário
router.post('/api/validation', clientController.login); //login usuário
router.post('/api/register/evento', clientController.createEvent); //login usuário
module.exports = router;