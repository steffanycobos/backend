import fs from "fs";

class Contenedor {
  constructor(file) {
    this.file = file;
    this.productos = [];
  }

  // GUARDA PRODUCTO
  
  async save(title, price, thumbnail) {
      let newId;
      let id;
      
      const resp = await this.getAll();
      console.log(resp)
      
      if (resp.length === 0) {
          newId = 1;
        }
         else {
      newId = resp[resp.length - 1].id + 1;
    }

    price = Number(price);

    const newObject = { title, price, thumbnail, id: newId };

    resp.push(newObject);

    try {
      await fs.promises.writeFile(this.archivo, JSON.stringify(resp, null, 2));

      return newObject;
    } catch (error) {
      throw new Error(`No se pudo guardar el objeto: ${error}.`);
    }
  }

  // REEMPLAZAR

  async replace(id, producto) {
    const resp = await this.getAll();

    const productOld = resp.findIndex((item) => item.id === id);

    if (productOld === -1) {
      return { error: "Producto no encontrado." };
    }

    resp.splice(productOld, 1, { ...producto, id });

    try {
      await fs.promises.writeFile(this.archivo, JSON.stringify(resp, null, 2));
    } catch (error) {
      throw new Error(`El producto no se encuentra en nuestro archivo`);
    }
  }

  // BUSCAR POR ID

  async getById(id) {
    try {
      const resp = await this.getAll();

      return (
        resp.find((item) => item.id === id) ?? {
          error: "Producto no encontrado.",
        }
      );
    } catch (error) {
      throw new Error(`Porducto no localizado: ${error}`);
    }
  }

  // TODOS LOS PRODUCTOS

  async getAll() {
    try {
      const resp = await fs.promises.readFile(this.archivo, "utf-8");

      return JSON.parse(resp);
    } catch (error) {
      return { error: "Producto no encontrado." };
    }
  }

  // ELIMINA PRODUCTO

  async deleteById(id) {
    const resp = await this.getAll();

    const newresp = resp.filter((item) => item.id !== id);

    if (newresp.length === resp.length) {
      return { error: "Producto no encontrado." };
    }

    try {
      await fs.promises.writeFile(
        this.archivo,
        JSON.stringify(newresp, null, 2)
      );

      console.log("Producto eliminado.");
    } catch (error) {
      throw new Error(`El producto no pudo ser eliminado ${error}`);
    }
  }

  // BORRAR TODOS LOS PRODUCTOS

  async deleteAll() {
    try {
      await fs.promises.writeFile(this.archivo, JSON.stringify([]));
    } catch (error) {
      throw new Error(`Error al escribir: ${error}`);
    }
  }
}

export default Contenedor;
