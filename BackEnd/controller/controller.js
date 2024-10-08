const { json } = require("express");
const clientController = require("../model/model");
const bcrypt = require('bcrypt');
const salt = 0;
const moment = require('moment')
const userController = {

    //route root
    getRoot: async (req, res) => {
        res.status(200).json({ msg: "The API is running!!!" })
    },
    //Controller para listar todos os usuários do banco
    listAllUsers: async (req, res) => {
        try {
            const clients = await clientController.getAllUsers();
            res.status(200).json(clients);
        }
        catch (error) {
            res.status(500).json({ error: "Erro ao obter a lista de eventos" })
        }
    },
    listAllEvents: async (req, res) => {
        try {
            const events = await clientController.getAllEvents();
            res.status(200).json(events);
        }
        catch (error) {
            res.status(500).json({ error: "Erro ao obter a lista de eventos" })
        }
    },
    listAllEventsAdress: async (req, res) => {
        try {
            const events = await clientController.getAllEventsAdress();
            res.status(200).json(events);
        }
        catch (error) {
            res.status(500).json({ error: "Erro ao obter a lista de eventos" })
        }
    },

    //Controller para listar usuários por ID
    listByID: async(req,res)=>{
        try{
            const sql = await clientController.getByEmail(req.params.email);

            if(sql.length> 0)
            {
                res.status(200).json(sql)
            }
            else{
                res.status(401).json({msg:"Não existe registro no banco com este ID"})
            }
        }
        catch(error){
            return error
        }   
    },
    listEventByID: async(req,res)=>{
        try{
            const sql = await clientController.getByIdEvento(req.params.id);

            console.log(sql[0]);

            if(sql.length > 0)
            {
                res.status(200).json(sql[0])
            }
            else{
                res.status(401).json({msg:"Não existe registro no banco com este ID"})
            }
        }
        catch(error){
            return error
        }   
    },
    listEventAdressById: async (req, res) => {
        try {
            const events = await clientController.getEventAdressById(req.params.id);
            res.status(200).json(events[0]);
        }
        catch (error) {
            res.status(500).json({ error: "Erro ao obter a lista de eventos" })
        }
    },

    //Criar um novo usuário
    createNewUser: async(req,res)=>{
        const {id,nome,sobrenome,email,senha} = req.body;

        console.log(req.body);

        try{
            const sql = await clientController.getByEmail(email);
            
            console.log(sql);

            if(sql.length > 0){
                res.status(401).json({msg: "O email já esta cadastrado no Banco de Dados"})
            }
            else{
                await clientController.registerUser(id,nome,sobrenome,email,senha);
                res.status(201).json({msg:"Usuário cadastrado com sucesso"});
            }
        }
        catch(error){
            console.log(error)
            return error
        }
    },
    createEvent: async(req,res)=>{
        const {id,nomeEvento,dataEvento,descricao,nConvidados,idUsuario,privacidade,imagemBase64,horaEvento,rua,bairro,numero} = req.body;

        const dataFormatada = moment(dataEvento, "DD/MM/YYYY").format("YYYY/MM/DD");
    

        try{
            const sql = await clientController.getByIdEvento(id);

            if(sql.length > 0){
                res.status(401).json({msg: "O evento já esta cadastrado no Banco de Dados"})
            }
            else{
                const RecoverId = await clientController.registerEvent(id,nomeEvento,dataFormatada,descricao,nConvidados,idUsuario,privacidade,imagemBase64,horaEvento,);

                
                const id_evento = RecoverId.insertId

                await clientController.registerEventAdress(id,rua,bairro,numero,id_evento);
                res.status(201).json({msg:"evento cadastrado com sucesso"});
            }
        }
        catch(error){
            console.log(error)
            return error
        }
    },

    login: async(req,res) => {

        let {email,senha} = req.body;

       
        try{
            
            const sql = await clientController.validateLogin(email,senha);
            if(sql != null) {
                res.status(200).json(sql[0])
            }

            else{
                res.status(401).json({msg:"Email ou senha incorretos"});
            }
        }
        catch(error) {
            if(error) {
                console.log(error)
                res.status(500).json(error);
            }
        }
    }
};

module.exports = userController;