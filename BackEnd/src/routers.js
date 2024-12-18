const express = require("express");
const clientController = require("../controller/controller");
const client = require("../config/db");
const router = express.Router();

router.get('/', clientController.getRoot); //Rota Raiz
router.get('/api/read', clientController.listAllUsers); //Listar todos os usuários
router.get('/api/readUserByEmail/:email', clientController.getUserByEmail); //Listar todos os usuários
router.get('/api/read/:id', clientController.listByID); //Listar todos os usuários
router.get('/api/readUser/:id', clientController.listUserByID); //Listar todos os usuários
router.get('/api/readEvents', clientController.listAllEvents); //Listar todos os usuários
router.get('/api/readColaborators', clientController.listAllColaborators); //Listar todos os usuários
router.get('/api/readEventsUser/:id', clientController.listAllEventsUser); //Listar todos os usuários
router.get('/api/readEventsPriv', clientController.listAllEventsPriv); //Listar todos os usuários
router.get('/api/readEventsPrivUser/:id_usuario', clientController.listAllEventsUserPriv); //Listar todos os usuários
router.get('/api/readEvents/dates/:id_usuario', clientController.listAllEventsDates); //Listar todos os usuários
router.get('/api/readEventsByDate/:dayy/:id_usuario', clientController.listEventsByDates); //Listar todos os usuários
router.get('/api/readEvent/:id', clientController.listEventByID); //Listar Usuários por ID
router.get('/api/readEventAdress/:id', clientController.listEventAdressById); //Listar Usuários por ID
router.post('/api/cadastro', clientController.createNewUser); //Cadastrar novo Usuário
router.post('/api/register/colaborator', clientController.createNewColaborator); //Cadastrar novo Usuário
router.post('/api/validation', clientController.login); //login usuário
router.post('/api/validationID/:id', clientController.loginId); //login usuário
router.post('/api/register/evento', clientController.createEvent); //login usuário
router.put('/api/edit/evento', clientController.EditEvent); //Editar evento
router.put('/api/edit/profile', clientController.EditProfile); //Editar evento
router.put('/api/edit/password', clientController.EditPassword); //Editar evento
router.put('/api/resetSenhaByEmail', clientController.ResetPassword); //Editar evento
router.put('/api/edit/profile-pic', clientController.EditProfilePic); //Editar evento
router.delete('/api/deleteEvent/:id', clientController.DeleteEvent); //Editar evento
module.exports = router;