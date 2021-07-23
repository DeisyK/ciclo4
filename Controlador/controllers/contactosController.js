const fs = require("fs");
const path = require("path");

const contactos = () => {
  return JSON.parse(
    fs.readFileSync(path.join(__dirname, "../database/contactos.json"), "utf-8")
  );
};

exports.list = (req, res, next) => {
  try {
    const contacts = contactos();
    const list = contacts.filter((one) => one.usuario == req.params.id);
    list.length > 0
      ? res.send(list)
      : res.send({
          mesagge: "Aún no tiene contactos guardados por el momento.",
        });
  } catch (error) {
    res.send({ error: "Error buscando los contactos, intente nuevamente." });
  }
};

exports.add = (req, res, next) => {
  try {
    const contacts = contactos();
    const id = contacts.length + 1;
    console.log(id);
    const nuevo = {
      id: id,
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      telefono: req.body.telefono,
      email: req.body.email,
      fecha_de_nacimiento: req.body.fecha_de_nacimiento,
      categoria: req.body.categoria,
      profesion: req.body.profesion,
      pais: req.body.pais,
      usuario: req.params.id,
    };
    let list = [...contacts, nuevo];
    list = JSON.stringify(list);
    fs.writeFileSync(path.join(__dirname, "../database/contactos.json"), list);

    res.send(nuevo);
  } catch (error) {
    res.send({
      error: "No se pudo agregar el nuevo contacto, intente nuevamente",
    });
  }
};

exports.edit = (req, res, next) => {
  try {
    const list = contactos();
    list.forEach((one) => {
      if (one.id == req.param.id) {
        one.nombre = req.body.nombre;
        one.apellido = req.body.apellido;
        one.telefono = req.body.telefono;
        one.email = req.body.email;
        one.fecha_de_nacimiento = req.body.fecha_de_nacimiento;
        one.categoria = req.body.categoria;
        one.profesion = req.body.profesion;
        one.pais = req.body.pais;
        console.log(one);
      }
    });
    const nuevo = JSON.stringify(list);

    fs.writeFileSync(path.join(__dirname, "../database/contactos.json"), nuevo);
    res.send(contactos());
  } catch (error) {}
};
