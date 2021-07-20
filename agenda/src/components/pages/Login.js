import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, Card } from 'reactstrap';
import '../css/login.css'

const Example = (props) => {
  const [errorEmail, setErrorEmail]= useState(false)
  const [errorPassword, setErrorPassword ]= useState(false)


const validar = ()=>{
 
}
  return (
      <Card className='login'>
          
    <Form className='formulario'>
       <h4>Ingresa con E-mail y contraseña</h4>
      <FormGroup>        
        <Label for="exampleEmail">Email</Label>
        <Input type="email" name="email" id="exampleEmail" placeholder="Ingresa tu E-mail" />
      {errorEmail ? <p>Por favor ingrese un email valido</p>:null}
      </FormGroup>
      <FormGroup>
        <Label for="examplePassword">Password</Label>
        <Input type="password" name="password" id="examplePassword" placeholder="Ingresar Contraseña" />
      </FormGroup>
      <a   href="/RecuperarPw">Olvidaste tu contraseña</a>
      
     
      <FormGroup check>
        <Label check>
          <Input type="checkbox" />{' '}
          Recordarme
        </Label>
      </FormGroup>
      <Link  to="/Miperfil" onClick={()=>{
        validar()
       

      }}><Button >Entrar</Button></Link>
      <Link to="/"><Button >← Volver</Button></Link>
      <Link to="/Registro">Registrarse</Link>
    </Form>
      </Card>
  );
}

export default Example;