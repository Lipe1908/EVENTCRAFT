const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const routers = require('./src/routers');
const client = require('./config/db')

const app = express();
app.use(bodyParser.json());
app.use(routers);

let server;

beforeAll(()=> {
    server = app.listen(8086)
})

afterAll(async ()=> {
    await client.end();
    server.close();
});

describe('API Routes', () => {
    it('GET / Should return message', async()=> {
        const res = await request(app).get('/')
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('msg',"The API is running!!!")
    });
    it('GET /api/read Should return users list', async()=> {
        const res = await request(app).get('/api/read')
        expect(res.statusCode).toEqual(200)
        expect(res.body).toBeInstanceOf(Array)
    })
    it('POST /api/register/evento Should create a new event', async()=> {
        const user = {
            id:'',
            nomeEvento: 'teste',
            dataEvento: '19/11/2024',
            descricao: 'teste',
            nConvidados: '45',
            idUsuario: 2,
            privacidade: 'Privado',
            imagemBase64: 'xxxxx',
            horaEvento: '04:00:00 PM',
            rua: 'teste',
            bairro: 'teste',
            numero: '78',
        };
        const res = await request(app).post('/api/register/evento').send(user);
        if(res.statusCode == 201) {
            expect(res.body).toHaveProperty('msg', "evento cadastrado com sucesso")
        }
        else{
            expect(res.statusCode).toEqual(401)
            expect(res.body).toHaveProperty('msg', "O evento já esta cadastrado no Banco de Dados")
        }
    
   
    });
    it('DELETE /api/deleteEvent/:id Should delete a user', async ()=> {
        const id = 6;
        const res = await request(app).delete(`/api/deleteEvent/${id}`);
        if(res.statusCode == 204) {
            expect(res.body).toEqual({})
        }
        else{
            expect(res.statusCode).toEqual(404)
            expect(res.body).toHaveProperty('msg', "O evento não existe na base de dados")
        }
    
   
    });
    it('PUT /api/edit/evento Should create a new user', async()=> {
        const id = 7;
        const data = {
            id: id,
            nomeEvento: 'testeEdit',
            dataEvento: '19/11/2024',
            descricao: 'teste',
            nConvidados: '45',
            id_usuario: '2',
            privacidade: 'Privado',
            imagemBase64: 'xxxxx',
            horaEvento: '04:00:00 PM',
            rua: 'teste',
            bairro: 'teste',
            numero: '78',
         
        };
        const res = await request(app).put(`/api/edit/evento`).send(data);
        if(res.statusCode == 201) {
            expect(res.body).toHaveProperty('msg', "evento editado com sucesso")
        }
        else{
            expect(res.statusCode).toEqual(401)
            expect(res.body).toHaveProperty('msg', "evento não existe na nossa base de dados")
        }
    
    })
})