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
                unit_price: parseFloat(1220.99)
            }
        ],
        payer: {
            email
        },
        external_reference: id
    }

    console.log('ID ' + id);

    try{
        const payment = await MercadoPago.preferences.create(data);
        return res.redirect(payment.body.init_point);
    }catch(err){
        console.log(err);
        return res.send(err.status_detail);
    }
    
});


app.post('/not', (req, res) => {
    console.log(req.query);
    res.send('ok');
});

app.listen(SERVERPORT, () => {
    console.log('server run');
});