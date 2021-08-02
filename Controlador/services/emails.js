const nodemailer = require("nodemailer");

/*DEFINE DESDE QUE MAIL SE ENVIARÁ EL MENSAJE */

const transporter = nodemailer.createTransport({
  // host: "smtp.mailtrap.io",
  // port: 2525,
  // auth: {
  //   user: "cd33eec1405391",
  //   pass: "2cac2831d6546d",
  // },
  service: "gmail",
  tls: { rejectUnauthorized: false },
  auth: {
    user: "bwn.notifications@gmail.com",
    pass: "2cac2831d6546d",
  },
});

exports.register = async (user, password) => {
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
  <h1>Hola ${nombre},</h1>
  <h3>Gracias por usar BWN ya puedes empezar a usar tu cuenta usando tu email y la contraseña: ${password}</h3>
  </body>
  </html>
`;

  /*DEFINE DESDE DONDE SE ENVIARÁ EL MAIL Y HACIA DONDE, TAMBIÉN PONE EL CUERPO DEL MAIL PERVIAMENTE INSTANCIADO */
  const mailOptions = {
    from: "<bwn.notifications@gmail.com>",
    to: email,
    subject: "Registro exitoso!!!",
    html: contentHTML,
  };

  /*ENVIA EL MAIL */

  const response = await transporter.sendMail(mailOptions);
  if (response.messageId) {
    return true;
  } else {
    return false;
  }
};

exports.recoveryPassword = async (user, password) => {
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
  <h1>Hola ${user.nombre},</h1>
  <h3>Tu nueva contraseña es: ${password}</h3>
  </body>
  </html>
`;

  /*DEFINE DESDE DONDE SE ENVIARÁ EL MAIL Y HACIA DONDE, TAMBIÉN PONE EL CUERPO DEL MAIL PERVIAMENTE INSTANCIADO */
  const mailOptions = {
    from: "'cambio-contraseña-noreply' <bwn.notifications@gmail.com>",
    to: user.email,
    subject: "Recuperacion de contraseña",
    html: contentHTML,
  };

  /*ENVIA EL MAIL */

  const response = await transporter.sendMail(mailOptions);
  if (response.messageId) {
    return true;
  } else {
    return false;
  }
};
