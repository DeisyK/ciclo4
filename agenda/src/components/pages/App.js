import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./Login";
import RecuperarPw from "./RecuperarPw";
import Registro from "./Registro";
import Miperfil from "./Miperfil";
import EditarPerfil from "./EditarPerfil";
import Contactos from "./Contactos";
import Categorias from "./Categorias";
import "bootstrap/dist/css/bootstrap.min.css";
import Inicio from "./Inicio";
import DetalleContacto from "./DetalleContacto";
import AgregarCategoria from "./AgregarCategoria";
import DetalleCategoria from "./DetalleCategoria";
import Barra from "./Barra";
import toke from "../../assets/token";
import axios from "axios";
import api from "../../assets/utils";
import CambiarPassword from "./CambiarPassword";

const App = () => {
  const [token, setToken] = useState(null);
  const [editar, setEditar] = useState(undefined);
  const [usuario, setUsuario] = useState(undefined);
  const [errores, setErrores] = useState(undefined);

  const PrivateRoute = () => {
    if (usuario) {
      return (
        <>
          <Route path="/perfil/editar">
            <Registro
              editar={editar}
              setEditar={setEditar}
              setToken={setToken}
              usuario={usuario}
            />
          </Route>
          <Route path="/Miperfil" component={Miperfil}>
            <Miperfil />
          </Route>
          <Route path="/EditarPerfil/:id">
            <EditarPerfil
              editar={editar}
              setEditar={setEditar}
              token={token}
            ></EditarPerfil>
          </Route>
          <Route path="/crear-contacto">
            <EditarPerfil />
          </Route>
          <Route path="/:id/detalle-contacto">
            <DetalleContacto editar={editar} setEditar={setEditar} />
          </Route>
          <Route path="/Contactos">
            <Contactos editar={editar} setEditar={setEditar} token={token} />
          </Route>
          <Route path="/Categorias">
            <Categorias editar={editar} setEditar={setEditar} />
          </Route>
          <Route path="/categoria/agregar">
            <AgregarCategoria />
          </Route>
          <Route path="/categoria/:id/editar">
            <AgregarCategoria editar={editar} setEditar={setEditar} />
          </Route>
          <Route path="/categoria/:id/detalle">
            <DetalleCategoria editar={editar} setEditar={setEditar} />
          </Route>
          <Route path="/perfil/password">
            <CambiarPassword
              exact
              setToken={setToken}
              setUsuario={setUsuario}
            />
          </Route>
        </>
      );
    } else {
      return <Redirect to={"/login"} />;
    }
  };
  const NoAuthRoutes = () => {
    return !usuario ? <></> : <Redirect to={"/login"} />;
  };

  const Rutas = () => (
    <div>
      <Switch>
        <Route exact path="/" component={Inicio} />
        <Route path="/login">
          <Login token={token} setToken={setToken} />
        </Route>

        <Route path="/RecuperarPw">
          <RecuperarPw />
        </Route>
        <Route path="/Registro">
          <Registro />
        </Route>
        <PrivateRoute />
      </Switch>
    </div>
  );

  const init = async () => {
    if (toke.getToken()) {
      try {
        const response = await axios.get(`${api}login/get-usuario`, {
          headers: { token: toke.getToken() },
        });
        if (response.data._id) {
          setUsuario(response.data);
        }
        if (response.data.error) {
          toke.removeToken();
          setErrores(response.data.error);
          setTimeout(() => setErrores(undefined), 5000);
        }
      } catch (e) {
        setErrores(e);
      }
    }
  };

  useEffect(() => {
    init();
  }, []);
  useEffect(() => {
    init();
  }, [token]);

  return (
    <Barra
      rutas={Rutas}
      usuario={usuario}
      setUsuario={setUsuario}
      token={token}
      setToken={setToken}
      errores={errores}
      setErrores={setErrores}
      editar={editar}
      setEditar={setEditar}
    >
      <Rutas />
    </Barra>
  );
};
export default App;
