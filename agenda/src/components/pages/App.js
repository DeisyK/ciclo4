import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./Login";
import RecuperarPw from "./RecuperarPw";
import Registro from "./Registro";
import Miperfil from "./Miperfil";
import EditarPerfil from "./EditarPerfil";
import Contactos from "./Contactos";
import Categorias from "./Categorias";

import PrivateRoute from "./PrivateRoute";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbarcomp from "../NavbarComp";
import Inicio from "./Inicio";
import DetalleContacto from "./DetalleContacto";

const Home = () => (
  <div>
    <Inicio />
  </div>
);
// const Admin = () => (
//  <div>
//  <Contactos/>
//  </div>
// );

export default function App() {
  const [token, setToken] = useState(null);
  const [cargarndoUsuario, setCargandoUsuario] = useState(true);
  const [editar, setEditar] = useState(undefined);
  useEffect(() => {
    if (!localStorage.getItem("login")) {
      setCargandoUsuario(false);
      return;
    } else {
      setToken(localStorage.getItem("login"));
      setCargandoUsuario(true);
      return;
    }
  });
  return (
    <div>
      <nav>
        <div>
          <Navbarcomp token={token} setToken={setToken} />
        </div>
      </nav>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/login">
          <Login token={token} setToken={setToken} />
        </Route>
        <Route path="/RecuperarPw">
          <RecuperarPw />
        </Route>
        <Route path="/Registro">
          <Registro />
        </Route>
        <Route path="/Miperfil">
          <Miperfil />
        </Route>
        <Route path="/EditarPerfil/:id">
          <EditarPerfil editar={editar} setEditar={setEditar} />
        </Route>
        <Route path="/crear-contacto">
          <EditarPerfil />
        </Route>
        <Route path="/:id/detalle-contacto">
          <DetalleContacto editar={editar} setEditar={setEditar} />
        </Route>
        <Route path="/Contactos">
          <Contactos editar={editar} setEditar={setEditar} />
        </Route>
        <Route path="/Categorias">
          <Categorias />
        </Route>

        {/* <PrivateRoute path="/admin" component={Admin} /> */}
      </Switch>
    </div>
  );
}
