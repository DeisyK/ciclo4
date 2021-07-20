import React, {useState} from "react";
import {  Route, Switch } from "react-router-dom";
import Login from './Login';
import RecuperarPw from "./RecuperarPw";
import Registro from "./Registro"
import Miperfil from "./Miperfil";
import EditarPerfil from "./EditarPerfil";
import Contactos from "./Contactos";
import Categorias from "./Categorias";

import PrivateRoute from "./PrivateRoute";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbarcomp from "../NavbarComp";
import Inicio from "./Inicio";




const Home = () => (
 <div>
 <Inicio/>
 </div>
);
// const Admin = () => (
//  <div>
//  <Contactos/>
//  </div>
// );




export default function App() {
    const [loginUser, setLoginUser] = useState(false)
 return (  
     
 <div> 
     <nav >
        <div>
            <Navbarcomp
            loginUser={loginUser}
            setLoginUser={setLoginUser}/>
        </div>
     </nav>
    <Switch>
        <Route exact path="/"><Home /></Route>        
        <Route path="/login"><Login 
        loginUser={loginUser}
        setLoginUser={setLoginUser}
        /></Route>
        <Route path="/RecuperarPw"><RecuperarPw /></Route>
        <Route path="/Registro"><Registro /></Route>
        <Route path="/Miperfil"><Miperfil /></Route>
        <Route path="/EditarPerfil"><EditarPerfil /></Route>
        <Route path="/Contactos"><Contactos /></Route>
        <Route path="/Categorias"><Categorias /></Route>

        {/* <PrivateRoute path="/admin" component={Admin} /> */}
    </Switch>
 </div>
 );
}