const fs = require("fs");
const path = require("path");

const categorias = () => {
  return JSON.parse(
    fs.readFileSync(
      path.join(__dirname, "../database/categorias.json"),
      "utf-8"
    )
  );
};

/**
 * Metodos
 */
exports.list = (req, res, next) => {
  try {
    res.send(categorias());
  } catch (error) {
    res.send({ message: "No se encontraron categorias" });
  }
};

exports.add = (req, res, next) => {
  try {
    const nuevo = {
      id: categorias().length + 1,
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
    };

    const created = JSON.stringify([...categorias(), nuevo]);
    fs.writeFileSync(
      path.join(__dirname, "../database/categorias.json"),
      created
    );
    res.send(nuevo);
  } catch (error) {
    res.send({ message: "No se pudo agregar categoria" });
  }
};

exports.search = (req, res, next) => {
  try {
    let results = [];
    categorias().forEach((categoria) => {
      if (categoria.nombre.includes(req.params.nombre)) {
        results.push(categoria);
      }
    });
    results.length > 0
      ? res.send(results)
      : res.send({ message: "No se encontraron coincidencias" });
  } catch (error) {
    res.send({ message: "Error buscando categorias." });
  }
};

exports.one = (req, res, next) => {};

exports.update = (req, res, next) => {};

exports.destroy = (req, res, next) => {};
