import React from "react";
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
import Navbarcomp from "./components/NavbarComp";
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

 return (  
     
 <div> 
     <nav >
        <div>
            <Navbarcomp/>
        </div>
     </nav>
    <Switch>
        <Route exact path="/"><Home /></Route>        
        <Route path="/login"><Login /></Route>
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