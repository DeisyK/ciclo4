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

exports.one = (req, res, next) => {
  try {
    const categories = categorias();
    const filter = categories.filter((one) => one.id == req.params.id);
    res.send(filter);
  } catch (error) {
    res.send({
      error: `Error al buscar la categoria, por favor intente nuevamente.`,
    });
  }
};

exports.update = (req, res, next) => {
  try {
    let categories = categorias();
    categories.forEach((category) => {
      if (category.id == req.params.id) {
        category.nombre = req.params.nombre;
        category.descripcion = req.params.descripcion;
      }
    });
    const updated = JSON.stringify(categories);
    fs.writeFileSync(
      path.join(__dirname, "../database/categorias.json"),
      updated
    );
    res.send({ message: "Categoría actualizada con exito" });
  } catch (error) {
    res.send({
      error: "Error al actualizar la categoría por favor intente nuevamente",
    });
  }
};

exports.destroy = (req, res, next) => {
  try {
  } catch (error) {}
};
