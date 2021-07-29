const db = require("../models/index");
const { decode } = require("../services/token");

exports.list = async (req, res, next) => {
  try {
    const { id } = await decode(req.headers.token);
    const categories = await db.Categorias.find({ id_user: id });
    categories.length > 0
      ? res.send(categories)
      : res.send({ message: "No se encontraron categorias guardadas" });
  } catch (error) {
    res.send({ message: "No se encontraron categorias" });
  }
};

exports.add = async (req, res, next) => {
  try {
    const { id } = await decode(req.headers.token);

    const register = await db
      .Categorias({
        name: req.body.name,
        description: req.body.description,
        user_id: id,
      })
      .save();

    res.send(register);
  } catch (error) {
    res.send({ message: "No se pudo agregar categoria" });
  }
};

exports.one = async (req, res, next) => {
  try {
    const { id } = await decode(req.headers.token);
    const find = await db.Categorias.findOne({ _id: req.params.id });
    id === find.user_id
      ? res.send(find)
      : res.send({ error: "No tiene permiso para ver esta categoria" });
  } catch (error) {
    res.send({
      error: `Error al buscar la categoria, por favor intente nuevamente.`,
    });
  }
};

exports.update = async (req, res, next) => {
  try {
    const { id } = await decode(req.headers.token);
    const category = await db.Categorias.findOne({ _id: req.params.id });
    if (category.user_id === id) {
      const response = await db.Categorias.updateOne(
        { _id: req.params.id },
        {
          name: req.body.name,
          description: req.body.description,
        }
      );
      response.n > 0
        ? res.send({ message: "Categoría actualizada con exito." })
        : res.send({ error: "No se encontró la categoria para editarla" });
    } else {
      res.send({
        error: "No Tiene permisos para editar esta categoria.",
      });
    }
  } catch (error) {
    res.send({
      error: "Error al actualizar la categoría por favor intente nuevamente",
    });
  }
};

exports.destroy = async (req, res, next) => {
  try {
    const { id } = await decode(req.headers.token);
    const category = await db.Categorias.findOne({ _id: req.params.id });
    if (!category) res.send({ error: "Categoria no encontrada" });
    if (category.user_id === id) {
      const response = await db.Categorias.deleteOne({
        _id: req.params.id,
      });

      response.n > 0
        ? res.status(200).send({ message: "Categorias eliminada" })
        : res.send({
            error:
              "Error al eliminar la categoria, por favor intente nuevamente.",
          });
    } else {
      res.send({ error: "No tiene permisos para eliminar esta categoria" });
    }
  } catch (error) {
    res.send({
      error: "Error al eliminar la categoría por favor intente nuevamente",
    });
  }
};
