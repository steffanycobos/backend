const http = require("http");
const fs = require("fs");
const express = require("express");
const PORT = 8080;
const app = express();
const server = app.listen(PORT, () => {
  console.log(
    `Servidor http esta en el puerto ${server.address().port}`
  );
});

server.on("error", (error) => console.log(`Error en servidor ${error}`));

class Contenedor {
  constructor(title, price, tumbnail, id) {
    this.title = title;
    this.price = price;
    this.tumbnail = tumbnail;
    this.id = id;
  }
}
const producto1 = new Contenedor(
  "Camisa",
  20,
  "https://www.shutterstock.com/es/image-photo/white-color-formal-shirt-button-down-1045662547",
  1
);
const producto2 = new Contenedor(
  "Pantalon",
  30,
  "https://www.shutterstock.com/es/image-photo/stylish-jeans-pants-on-white-background-2019194291",
  2
);
const producto3 = new Contenedor(
  "Zapatos",
  50,
  "https://www.shutterstock.com/es/image-photo/leather-womens-light-brown-shoes-isolated-2198618359",
  3
);
let productos = [];
productos.push(producto1, producto2, producto3);
let carrito = JSON.stringify(productos);
try {
  fs.writeFileSync("./productos.txt", carrito);
} catch (error) {
  console.log(error);
}
app.get("/", (req, res) => {
  res.send("Hola a Todos");
});

app.get("/productos", (req, res) => {
  res.send(productos);
});

num = Math.floor(Math.random() * 3);
app.get("/productosrandom", (req, res) => {
  res.send(productos[num]);
});
