const fs = require("fs");

module.exports = class Contenedor {
  constructor(nombreArchivo) {
    this.nombreArchivo = nombreArchivo;
  }

  getAll() {
    const respuesta = fs.readFileSync(this.nombreArchivo, "utf-8");
    return (JSON.parse(respuesta));
  }
  
  get(id) {
    const datos = this.getAll();
    if(id <= 0 || id > datos.length) {
      return { error: "El producto con el id especificado no ha sido encontrado."}
    }
    return datos[id - 1];
  }

  save(product) {
    const datos = this.getAll();
    product.id = datos.length + 1;
    datos.push(product);
    fs.writeFileSync(this.nombreArchivo, JSON.stringify(datos));
    return {
      product: product
    }
  }

  update(id, product) {
    const datos = this.getAll();
    if(id <= 0 || id > datos.length) {
      return { error: "El producto con el id especificado no ha sido encontrado."}
    }
    product.id = id;
    const previousProduct = datos.splice(id - 1, 1, product);
    fs.writeFileSync(this.nombreArchivo, JSON.stringify(datos));
    return {
      previous: previousProduct,
      new: product
    }
  }

  delete(id) {
    const datos = this.getAll();
    if(id <= 0 || id > datos.length) {
      return { error: "El producto con el id especificado no ha sido encontrado."}
    }
    const previousProduct = datos.splice(id - 1, 1);
    fs.writeFileSync(this.nombreArchivo, JSON.stringify(datos));
    return {
      deleted: previousProduct
    }
  }
}