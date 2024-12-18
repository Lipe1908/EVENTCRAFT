const express = require("express");
const router = require("./routers");
const client = require("../config/db");
const cors = require("cors");
const bodyParser = require ('body-parser');

const app = express();
app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json());
app.use(router);

app.use((req,res,next) => {
    //Qualquer endereço pode realizar requisição
    res.header("Access-Control-Allow-Origin", "*");

    //Tipos de metodos que a API aceita
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");

    //Permitir o envio de dados para a API
    res.header("Access-Control-Allow-Headers", "Content-Type");

    //Exercutar o Cors
    app.use(cors());

    //Quando não houver erro deve continuar o processamento
    next();
});

client.query("select 1.").then(()=>{
    console.log("connection success")
    app.listen(8085, function(){
        console.log("Servidor rodando na url:http://192.168.15.7:8085")
    });
})
.catch(erro => console.log("connection failed \n" + erro))