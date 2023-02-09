const express = require('express');
const app = express();
const MercadoPago = require('mercadopago');
const SERVERPORT = 8080;
const secrets = require('./secrets');


MercadoPago.configure({
    sandbox: true,
    access_token: secrets.Access_Token
});

//Rotes
app.get('/', (req, res) => {
    res.send('hello');
});


app.listen(SERVERPORT, () => {
    console.log('server run');
});