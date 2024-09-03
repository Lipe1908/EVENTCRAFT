const connection= require("../config/db");
const bcrypt = require('bcrypt');
const salt = 10;
const userModel = {
    getAllUsers: async () =>{
        const [result] = await connection.query("SELECT * FROM usuarios")
        .catch(erro => console.log(erro));
        return result
    },

    getByEmail: async (email) =>{
        const [result] = await connection.query("SELECT * FROM usuarios WHERE email =?", [email])
        .catch(erro => console.log(erro));
        return result
    },
    registerUser: async (id,nome,sobrenome,email,senha) =>{

        const hashPassword = await bcrypt.hash(senha,salt);

        const [result] = await connection.query("INSERT INTO usuarios values(?,?,?,?,?)",[id,nome,sobrenome,email,hashPassword])
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