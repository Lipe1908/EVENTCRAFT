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
            res.status(500).json({ error: "Erro ao obter a lista de usuários" })
        }
    },
    getUserByEmail: async (req, res) => {
        let email = req.params.email
        try {
            const clients = await clientController.getByEmail(email);
            if(clients.length > 0) {
                res.status(200).json(clients);
            }
            else {
                res.status(500).json({ error: "Email não existe na base de dados" })
            }
        }
        catch (error) {
            res.status(500).json({ error: "Email não existe na base de dados" })
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
    listAllColaborators: async (req, res) => {
        try {
            const events = await clientController.getAllColaborators();
            res.status(200).json(events);
        }
        catch (error) {
            res.status(500).json({ error: "Erro ao obter a lista de eventos" })
        }
    },
    listAllEventsUser: async (req, res) => {
        try {
            const events = await clientController.getAllEventsUser(req.params.id);
            res.status(200).json(events);
        }
        catch (error) {
            res.status(500).json({ error: "Erro ao obter a lista de eventos" })
        }
    },
    listAllEventsPriv: async (req, res) => {
        try {
            const events = await clientController.getEventosPriv();
            res.status(200).json(events);
        }
        catch (error) {
            res.status(500).json({ error: "Erro ao obter a lista de eventos" })
        }
    },
    listAllEventsUserPriv: async (req, res) => {
        try {
            const events = await clientController.getAllEventsUserPriv(req.params.id_usuario);
            res.status(200).json(events);
            console.log(events)
        }
        catch (error) {
            res.status(500).json({ error: "Erro ao obter a lista de eventos" })
        }
    },
    listAllEventsDates: async (req, res) => {
        try {
            const eventsDates = await clientController.getAllEventsDates(req.params.id_usuario);
            res.status(200).json(eventsDates);
        }
        catch (error) {
            res.status(500).json({ error: "Erro ao obter a lista de eventos" })
        }
    },

    listEventsByDates: async (req, res) => {
        try {
            const events = await clientController.getEventsByDates(req.params.dayy, req.params.id_usuario);
            res.status(200).json(events);
            console.log(events)
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
    listUserByID: async(req,res)=>{
        try{
            const sql = await clientController.getUserById(req.params.id);

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
        const {id,nome,sobrenome,email,senha,imagemBase64} = req.body;

        console.log(req.body);

        try{
            const sql = await clientController.getByEmail(email);
            
            console.log(sql);

            if(sql.length > 0){
                res.status(401).json({msg: "O email já esta cadastrado no Banco de Dados"})
            }
            else{
                await clientController.registerUser(id,nome,sobrenome,email,senha,imagemBase64);
                res.status(201).json({msg:"Usuário cadastrado com sucesso"});
            }
        }
        catch(error){
            console.log(error)
            return error
        }
    },
    createNewColaborator: async(req,res)=>{
        const {id,nome,sobrenome,descricao,telefone,categoria, imagemBase64, id_usuario} = req.body;

        console.log(req.body);

        try{
            const sql =  await clientController.registerColaborator(id,nome,sobrenome,descricao,telefone,categoria,imagemBase64,id_usuario);
            res.status(201).json({msg:"Colaborador cadastrado com sucesso"});
            
            console.log(sql);

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
    },
    EditPassword: async(req,res) => {

        let {senhaAtual,senha,id} = req.body;

       
        try{
            
            const sql = await clientController.validateAndEditSenha(senhaAtual,senha, id);
            if(sql != null) {
                res.status(200).json(sql[0])
            }

            else{
                console.log('erro')
                res.status(401).json({msg:"Senha atual incorreta"});
            }
        }
        catch(error) {
            if(error) {
                console.log(error)
                res.status(500).json(error);
            }
        }
    },
    ResetPassword: async(req,res) => {

        let {senha,email} = req.body;

       
        try{
            
            const sql = await clientController.ResetSenha(senha, email);
        
                res.status(200).json(sql[0])
        
         
        }
        catch(error) {
            if(error) {
                console.log(error)
                res.status(500).json(error);
            }
        }
    },
    EditEvent: async(req,res)=>{
        const {nomeEvento,dataEvento,descricao,nConvidados,id_usuario,privacidade,imagemBase64,horaEvento, id} = req.body;

        const dataFormatada = moment(dataEvento, "DD/MM/YYYY").format("YYYY-MM-DD");
    
        console.log(dataFormatada)
        try{

         const sql = await clientController.getEventsById(id);

         if(sql.length > 0) {
            const response = await clientController.EditEvent(nomeEvento,dataFormatada,descricao,nConvidados,id_usuario,privacidade,imagemBase64,horaEvento,id);


            res.status(201).json({msg:"evento editado com sucesso"});
            return response;
         }
         else{
            res.status(401).json({msg:"evento não existe na nossa base de dados"});
         }
               
            }
        
        catch(error){
            console.log(error)
            return error
        }
    },
    EditProfile: async(req,res)=>{
        const {nome, sobrenome, email, id,} = req.body;
        try{

                const response = await clientController.EditProfile(nome,sobrenome, email, id,);


                res.status(201).json({msg:"evento cadastrado com sucesso"});
                return response;
            }
        
        catch(error){
            console.log(error)
            return error
        }
    },
    EditProfilePic: async(req,res)=>{
        const {imagemBase64,id} = req.body;
  
        try{

                const response = await clientController.EditProfilePic(imagemBase64,id);


                res.status(201).json({msg:"foto cadastrada com sucesso"});
                return response;
            }
        
        catch(error){
            console.log(error)
            return error
        }
    },
    DeleteEvent: async(req,res)=>{

        try{
            const sql = await clientController.getByIdEvento(req.params.id);

            if(sql.length > 0){
             await clientController.DeleteEvent(req.params.id);

        
                res.status(204).json({msg:"evento deletado com sucesso"});
               
            }
            else{
                res.status(404).json({msg:"O evento não existe na base de dados"})
            }
        }
        
        catch(error){
            console.log(error)
            return error
        }
    },

    loginId: async(req,res) => {
        
        

        try{
            const sql = await clientController.validateLoginId(req.params.id);
            
            console.log(sql)

            if(sql.length > 0) {
                res.status(200).json(sql[0]);
              
            }

            else{
                res.status(401).json({msg:"Id incorreto"});
            }
        }
        catch(error) {
            if(error) {
                console.log(error)
                res.status(500).json(error);
            }
        }
    },
};

module.exports = userController;