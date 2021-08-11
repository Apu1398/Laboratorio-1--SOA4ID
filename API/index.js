//import cors from cors;

const express = require('express');
const cors = require('cors')

const app = express();

app.use(express.json());


const parqueo = [];


for (var i = 1; i <= 25; i++) {
    parqueo.push({
        state: (i % 2 === 0) ? 'free' : 'in-use',
        id: i
    });
}


app.use(cors());

//READ Request Handlers
app.get('/', (req, res) => {
    res.send('Welcome to REST API with Node.js!!');
});

app.get('/spaces', (req, res) => {
    res.send(parqueo);
});



app.get('/spaces/:id', (req, res) => {
    const espacio = parqueo.find(c => c.id === parseInt(req.params.id));

    if (!espacio) {
        res.status(404).send({ status: 'Espacio no encontrado' });
    } else {
        res.send(espacio);
    }
});

//CREATE Request Handler
app.post('/spaces', (req, res) => {

    const espacio = {
        state: 'free',
        placa: '',
        fecha: new Date(),
        id: parqueo.length + 1
    };

    parqueo.push(espacio);
    res.send(espacio);
});

//UPDATE Request Handler
app.put('/spaces/:id', (req, res) => {
    const espacio = parqueo.find(c => c.id === parseInt(req.params.id));
    if (!espacio) {
        res.status(404).send({ status: 'Espacio no encontrado' });
    } else {
        espacio.placa = req.body.placa;
        espacio.fecha = new Date();
        espacio.state = 'in-use';
        res.send(espacio);
    }

});

//DELETE Request Handler
app.delete('/spaces/:id', (req, res) => {

    const espacio = parqueo.find(c => c.id === parseInt(req.params.id));
    if (!espacio) {
        res.status(404).send({ status: 'Espacio no encontrado' });
    }
    if (espacio.state === 'free') {
        const index = parqueo.indexOf(espacio);
        parqueo.splice(index, 1);

        res.send(espacio);
    } else {
        res.send({ status: 'Espacio ocupado' });
    }
});

app.get('/reservations', (req, res) => {
    const ocupados = parqueo.filter(espacio => {
        espacio.state === 'en uso';
    });
    res.send(ocupados);
});


//CREATE Request Handler (Falta)
app.post('/reservations', (req, res) => {
    const espacio = {
        id: parqueo.length + 1,
        title: req.body.title
    };
    parqueo.push(espacio);
    res.send(espacio);
});


//DELETE Request Handler
app.delete('/reservations/:id', (req, res) => {

    const espacio = parqueo.find(c => c.id === parseInt(req.params.id));
    if (!espacio) {
        res.status(404).send({ status: 'Espacio no encontrado' });
    } else {
        espacio.fecha = '';
        espacio.placa = '';
        espacio.state = 'free';
        req.send(espacio);
    }
});



//PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}.`));
