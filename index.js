const Joi = require('joi');
const express = require('express');
const app = express();
const swaggerUI = require("swagger-ui-express");
const swaggerJSDoc = require('swagger-jsdoc');
const open = require('open');
const PORT = 3000;

open(`http://localhost:${PORT}/api-docs`);

app.use(express.json());

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API Loja",
            version: "1.0.0",
            description: "Uma simples API baseada em um e-commerce."
        },
        servers: [
            {
                url: `http://localhost:${PORT}`
            }
        ]
    },
    apis: ["swagger.js"]
};

const specs = swaggerJSDoc(options);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

const catalogo = [
    {
        id: 1,
        produto: "camiseta",
        preco: 30
    },
    {
        id: 2,
        produto: "calça jeans",
        preco: 40
    },
    {
        id: 3,
        produto: "bermuda",
        preco: 25
    }
];

const schema = {
    produto: Joi.string().required(),
    preco: Joi.number().min(1).required()
};

app.listen(PORT, () => console.log(`it's alive on http://localhost:${PORT}`));

// ENDPOINTS:
app.get('/catalogo', (req, res) => {
    res.status(200).send({itens: catalogo});
});

app.get('/catalogo/:id', (req, res) => {
    let item = catalogo.find(_id => _id.id === parseInt(req.params.id));

    if(!item)
        res.status(404).send({message: "ID não encontrado"});
    else
        res.status(200).send(item);
});

app.post('/catalogo', (req, res) => {
    let result = Joi.validate(req.body, schema);
    
    if(result.error){
        res.status(400).send({message: result.error.details[0].message});
        return;
    }

    let item = {
        id: catalogo.length + 1,
        produto: req.body.produto,
        preco: req.body.preco
    };

    catalogo.push(item);
    res.status(201).send({message: "item adicionado ao catalogo com sucesso", id: item.id});
});

app.put('/catalogo/:id', (req, res) => {
    let item = catalogo.find(_id => _id.id === parseInt(req.params.id));

    if(!item){
        res.status(404).send({message: "ID não encontrado"});
        return;
    }

    if(!req.body.produto && !req.body.preco){
        res.status(400).send({message: "no mínimo um dos campos deve estar preenchido"});
        return;
    }

    if(req.body.produto === item.produto && req.body.preco === item.preco){
        res.status(400).send({message: "informações devem ser diferentes"});
        return;
    }

    item.produto = req.body.produto || item.produto;
    item.preco = req.body.preco || item.preco;

    res.status(200).send({message: "item modificado com sucesso"});
});

app.delete('/catalogo/:id', (req, res) => {
    let item = catalogo.find(_id => _id.id === parseInt(req.params.id));

    if(!item){
        res.status(404).send({message: "ID não encontrado"});
        return;
    }

    catalogo.splice(catalogo.indexOf(item), 1);
    res.status(200).send({message: "item deletado com sucesso"});
});