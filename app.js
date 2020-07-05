const express = require('express');
const app = express();
const totalVoice = require('totalvoice-node');
const acessToken  = '698b8ed4f00d770920f8444b50cc1262';
const client = new totalVoice(acessToken);
var opcoes = {
    velocidade: 2, 
    tipo_voz: "br-Vitoria"
};

function callTTS(numero, msg){
client.tts.enviar(numero, msg, opcoes)
    .then(function(data) {
        console.log(data);
    })
    .catch(function(error) {
       return  console.log('Erro: ', error)
    });
}

app.get('/call/:numero/:msg',(req,res)=>{
    var numero = req.params.numero;
    var mensagem = req.params.msg;
    try{
        callTTS(numero,mensagem);
        res.send({
            response:{
                status: 'CHAMADA FEITA',
                numero: numero,
                mensagem: mensagem
                
            }
        })

    }catch(error){
        res.send({
            response:{
                error: error
                
            }
        })

    }
    

});

module.exports = app;