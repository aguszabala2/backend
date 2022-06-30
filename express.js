const express = require("express");
const app = express();

const fs = require("fs");

class Contenedor {
    constructor(fileName) {
        this.fileName = fileName;
    }

    getAllProducts() {
        const res = fs.readFileSync(this.fileName, "utf-8");
        return (JSON.parse(res));
    }

    getRandom() {
        const data = this.getAll();
        const random = Math.floor(Math.random() * datos.length);
        return random;
    }
}

const contenedor1 = new Contenedor("products.json");
contenedor1.getRandom();

const PORT = process.env.PORT || 8080;

app.get("/", (req,res) => {
    res.send(`<h1>Bienvenido</h1>`);
});

function showProducts() {
    const data = contenedor1.getAllProducts();

    let info = "";
    datos.forEach( p => {
    info += `
        <article class="product-item">
        <h2>${producto.nombre}</h2>
        <h3>$ ${producto.precio}</h3>
        <picture>
            <img class="product-img" src="${producto.imagen}" alt="${producto.nombre}" />
        </picture>
        </article>
    `;
    });

    return `
    <style>
        h1, h2, h3 {
            text-align: center;
        }
        .container-products {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            padding: 20px;
        }
        .product-item {
            border-radius: 10px;
            box-shadow: 0 0 10px black;
            padding: 10px;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .product-img {
            width: 150px;
        }
        </style>
    <h1>Productos</h1>
    <div class="container-products">
        ${info}
    </div>
    `;
}

app.get("/products", (req,res) => {
    res.send(showProducts());
});

function randomProducts() {
    const data = contenedor1.getAll();
    const product = data[contenedor1.getRandom()];

    let info = `
    <article class="product-item">
        <h2>${producto.nombre}</h2>
        <h3>$ ${producto.precio}</h3>
        <picture>
            <img class="product-img" src="${producto.imagen}" alt="${producto.nombre}" />
        </picture>
        </article>
    `;

    return `
    <style>
        h1, h2, h3 {
            text-align: center;
        }
        .container-products {
            display: flex;
            justify-content: center;
        }
        .product-item {
            border-radius: 10px;
            box-shadow: 0 0 10px black;
            padding: 10px;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .product-img {
            min-width: 150px;
            max-width: 250px;
        }
        </style>
    <h1>Producto Aleatorio</h1>
    <div class="container-products">
        ${info}
    </div>
    `;
}

app.get("/random", (req,res) => {
    res.send(randomProducts());
});

const server = app.listen(PORT, () => {
    console.log("Servidor HTTP escuchando en el puerto " + server.address().port);
});

server.on("error", error => console.log(`Error en servidor ${error}`)); 