const nodemailer = require("nodemailer");

exports.register = async (user) => {
  const { nombre, email, password } = user;

  const contentHTML = `
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0"
      http-equiv="Content-Type"
      content="text/html; charset=utf-8"
    />
    <title>Activate register</title>
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link
      href="https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,wght@1,300&display=swap"
      rel="stylesheet"
    />
  </head>
  <body bgcolor="#fff">
   <h1>Hola ${nombre}</h1>,
   <h3>Gracias por usar BWN ya puedes empezar a usar tu cuenta usando tu email y la contraseña: ${password}</h3>
  </body>
</html>
`;

  /*DEFINE DESDE QUE MAIL SE ENVIARÁ EL MENSAJE */
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "activationmailadvance@gmail.com",
      pass: "eQmG74AQSGyyLzS",
    },
  });
  /*DEFINE DESDE DONDE SE ENVIARÁ EL MAIL Y HACIA DONDE, TAMBIÉN PONE EL CUERPO DEL MAIL PERVIAMENTE INSTANCIADO */
  const mailOptions = {
    from: "'sucess-noreply' <activationmailadvance@gmail.com>",
    to: email,
    subject: "Registro exitoso",
    html: contentHTML,
  };
  /*ENVIA EL MAIL */
  await transporter.sendMail(mailOptions, (e, info) => {
    if (e) {
      return e;
    }
  });
};

exports.recoveryPassword = async (user, password) => {
  const { nombre, email } = user;

  const contentHTML = `
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0"
      http-equiv="Content-Type"
      content="text/html; charset=utf-8"
    />
    <title>Activate register</title>
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link
      href="https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,wght@1,300&display=swap"
      rel="stylesheet"
    />
  </head>
  <body bgcolor="#fff">
   <h1>Hola ${nombre}</h1>,
   <h3>Tu nueva contraseña es ${password} recuerda no compratirla a nadie y cambiarla inmediatamente</h3>
  </body>
</html>
`;

  /*DEFINE DESDE QUE MAIL SE ENVIARÁ EL MENSAJE */
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "activationmailadvance@gmail.com",
      pass: "eQmG74AQSGyyLzS",
    },
  });
  /*DEFINE DESDE DONDE SE ENVIARÁ EL MAIL Y HACIA DONDE, TAMBIÉN PONE EL CUERPO DEL MAIL PERVIAMENTE INSTANCIADO */
  const mailOptions = {
    from: "'revocery-password' <activationmailadvance@gmail.com>",
    to: email,
    subject: "recuperacion de contraseña",
    html: contentHTML,
  };
  /*ENVIA EL MAIL */
  await transporter.sendMail(mailOptions, (e, info) => {
    if (e) {
      return e;
    }
  });
};
