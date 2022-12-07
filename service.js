const { application } = require("express");
const express = require("express");
const PORT = 8080;
const app = express();
app.use(express.static("public"));
const routeProductos = express.Router();
const routeId = express.Router();
const routeNuevoProducto = express.Router();
const routeActualiza = express.Router();
const routeDelete = express.Router();

app.use("/api/productos", routeProductos);
app.use("/api/productos/:id", routeId);
app.use("/api/productos", routeNuevoProducto);
app.use("/api/productos/:id", routeActualiza);
app.use("/api/productos/:id", routeDelete);

//routeProductos.use(express.json(), express.urlencoded({extended: true}))
routeId.use(express.json(), express.urlencoded({ extended: true }));
routeNuevoProducto.use(express.json(), express.urlencoded({ extended: true }));
routeActualiza.use(express.json(), express.urlencoded({ extended: true }));
routeDelete.use(express.json(), express.urlencoded({ extended: true }));

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

////// TODOS LOS PRODUCTOS
app.get("/api/productos", (req, res) => {
  res.json(productos);
});
//////  POR ID
function byId(id) {
  url = "/api/producto/:" + id;
  console.log(url, id);
  app.get(url, (req, res) => {
    res.send(productos[id - 1]);
  });

  console.log(productos[id - 1]);
}

//////// AGREGA PRODUCTO

routeNuevoProducto.post("/guardar", (req, res) => {
  console.log(req);
  id = productos.length + 1;
  productos.push(req.body);

  res.json(productos);
});

////// DELETE
function Elimina(id) {
  url = "/api/producto/:" + id;
  console.log(url, id);
  app.delete(url, (req, res) => {
    res.send(productos.filter((x) => x.id !== id));
  });
}

/////PUT
function Actualiza(id) {
  url = "/api/producto/:" + id;
  app.put(url, (req, res) => {
    console.log("Put Recibido");
    nuevo = productos.filter((x) => x.id == id);
    res.json({
      result: "ok",
      id: req.params.id,
      nuevo: req.body,
    });
  });
}

const server = app.listen(PORT, () => {
  console.log(`Servidor http esta en el puerto ${server.address().port}`);
});
server.on("error", (error) => console.log(`Error en servidor ${error}`));
 