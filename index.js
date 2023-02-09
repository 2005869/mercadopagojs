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

app.get('/payment', async (req, res) => {
    var id = '' + Date.now();
    var email = 'client@client.com';
    const data = {
        items: [
            item = {
                id,
                title: 'smartphone 5g',
                quantity: 1,
                currency_id: 'BRL',
                unit_price: parseFloat(20.99)
            }
        ],
        payer: {
            email
        },
        external_reference: id
    }

    try{
        const payment = await MercadoPago.preferences.create(data);
        return res.redirect(payment.body.init_point);
    }catch(err){
        console.log(err);
        return res.send(err.message);
    }
    
});


app.listen(SERVERPORT, () => {
    console.log('server run');
});