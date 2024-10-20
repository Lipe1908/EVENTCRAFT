const connection= require("../config/db");
const bcrypt = require('bcrypt');
const moment = require('moment');
const salt = 10;
const userModel = {
    getAllUsers: async () =>{
        const [result] = await connection.query("SELECT * FROM usuarios ")
        .catch(erro => console.log(erro));
        return result
    },
    getAllEvents: async () =>{
        const [result] = await connection.query("SELECT * FROM eventos WHERE privacidade = 'Público' ")
        .catch(erro => console.log(erro));
        return result
    },
    getEventsByDates: async (dayy) =>{
        const [result] = await connection.query("SELECT * FROM eventos WHERE dataEvento = ? ", [dayy])
        .catch(erro => console.log(erro));
        
        return result
    },
    getAllEventsDates: async (id_usuario) =>{
        const [result] = await connection.query("SELECT dataEvento FROM eventos WHERE id_usuario = ?", [id_usuario])
        const dates = []
        result.forEach(function(result) {
           
           
            dates.push(moment(result.dataEvento).format('YYYY-MM-DD'))
        }
        )
        console.log(dates)

        return dates;
    },

    getAllEventsAdress: async (id_evento) =>{
        const [result] = await connection.query("SELECT * FROM endereco WHERE id_evento = ? ", [id_evento])
        .catch(erro => console.log(erro));
        return result
    },
    getEventAdressById: async (id) =>{
        const [result] = await connection.query("SELECT * FROM endereco WHERE id_evento = ? ", [id])
        .catch(erro => console.log(erro));
        return result
    },

    getByEmail: async (email) =>{
        const [result] = await connection.query("SELECT * FROM usuarios WHERE email =?", [email])
        .catch(erro => console.log(erro));
        return result
    },
    getByIdEvento: async (id) =>{
        const [result] = await connection.query("SELECT * FROM eventos WHERE id =?", [id])
        .catch(erro => console.log(erro));
        return result
    },
    registerUser: async (id,nome,sobrenome,email,senha) =>{

        const hashPassword = await bcrypt.hash(senha,salt);

        const [result] = await connection.query("INSERT INTO usuarios values(?,?,?,?,?)",[id,nome,sobrenome,email,hashPassword])
        .catch(erro => console.log(erro));
        return result;
    },
    registerEvent: async (id,nomeEvento,dataEvento,descricao,nConvidados,idUsuario,privacidade,imagemBase64,horaEvento) =>{

        const [result] = await connection.query("INSERT INTO eventos values(?,?,?,?,?,?,?,?,?)",[id,nomeEvento,dataEvento,descricao,nConvidados,idUsuario,privacidade,imagemBase64,horaEvento])
        .catch(erro => console.log(erro));
        return result;
    },
    registerEventAdress: async (id,rua,bairro,numero,id_evento) =>{

        const [result] = await connection.query("INSERT INTO endereco values(?,?,?,?,?)",[id,rua,bairro,numero,id_evento])
        .catch(erro => console.log(erro));
        return result;
    },
    

    validateLogin: async(email, senha)=> {
      
        const [result] = await connection.query("SELECT * FROM usuarios WHERE email=?",[email])
        try{
            if (result.length > 0) {
              const user = result[0]  
              
              const match = await bcrypt.compare(senha, user.senha)
                console.log(match)

                if (match) {
                    return result;
                }

                else {
                    return null;
                }
            }

            else {
                return null;
            }
        }
       

        catch(erro) {
            console.log(erro)
        };
      
        
    }, 

   
};

module.exports = userModel;