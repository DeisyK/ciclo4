const db = require("../models/index");
const { decode } = require("../services/token");

exports.list = async (req, res) => {
  try {
    const { _id } = await decode(req.headers.token);
    const contacts = await db.Contactos.find({
      user_id: _id,
    });

    res.send(contacts);
  } catch (error) {
    res.send({ error: "Error buscando los contactos, intente nuevamente." });
  }
};

exports.one = async (req, res) => {
  try {
    const { id } = await decode(req.headers.token);
    const contact = await db.Contactos.findOne({
      _id: req.params.id,
    });

    let respuesta = {
      _id: contact._id,
      name: contact.name,
      address: contact.address,
      birthdate: contact.birthdate,
      country: contact.country,
      cellphone: contact.cellphone,
      notes: contact.notes,
      email: contact.email,
      surname: contact.surname,
      category_id: contact.category_id,
      user_id: contact._id,
    };
    const category = await db.Categorias.findOne({ _id: contact.category_id });

    if (contact) respuesta.categoria = category;
    console.log(respuesta);
    contact
      ? id === contact.user_id
        ? res.send(respuesta)
        : res.send({ error: "No tiene permisos para ver este contacto" })
      : res.send({ error: "Contacto no encontrado" });
  } catch (e) {
    res.send({ error: "Error al buscar el contacto" });
  }
};

exports.add = async (req, res) => {
  try {
    const { _id } = await decode(req.headers.token);
    const register = await db
      .Contactos({
        name: req.body.name,
        address: req.body.address,
        birthdate: req.body.birthdate,
        country: req.body.country,
        cellphone: req.body.cellphone,
        notes: req.body.notes,
        email: req.body.email,
        surname: req.body.surname,
        category_id: req.body.category_id,
        user_id: _id,
      })
      .save();

    res.send(register);
  } catch (error) {
    res.send({
      error: "No se pudo agregar el nuevo contacto, intente nuevamente",
    });
  }
};

exports.edit = async (req, res) => {
  try {
    const { id } = await decode(req.headers.token);
    const contact = await db.Contactos.findOne({ _id: req.params.id });
    if (contact.user_id === id) {
      const response = await db.Contactos.updateOne(
        {
          _id: req.params.id,
        },
        {
          name: req.body.name,
          address: req.body.address,
          birthdate: req.body.birthdate,
          country: req.body.country,
          cellphone: req.body.cellphone,
          notes: req.body.notes,
          email: req.body.email,
          surname: req.body.surname,
          category_id: req.body.category_id,
        }
      );
      response.n > 0
        ? res.status(200).send({ message: "Contacto actulizado." })
        : res.send({
            error:
              "Error al actualizar el contacto, por favor intente nuevamente.",
          });
    } else {
      res.send({ error: "No tiene permisos para modificar este contacto" });
    }
  } catch (error) {
    res.send({ error: "No se pudo actualizar el contacto." });
  }
};

exports.destroy = async (req, res) => {
  try {
    const { id } = await decode(req.headers.token);
    const contact = await db.Contactos.findOne({ _id: req.params.id });
    if (contact.user_id === id) {
      const response = await db.Contactos.deleteOne({
        _id: req.params.id,
      });
      response.n > 0
        ? res.status(200).send({ message: "Contacto eliminado" })
        : res.send({
            error:
              "Error al eliminar el contacto, por favor intente nuevamente.",
          });
    } else {
      res.send({ error: "No tiene permisos para eliminar este contacto" });
    }
  } catch (e) {
    res.send({
      error: "Error al eliminar el contacto, por favor intente nuevamente",
    });
  }
};
