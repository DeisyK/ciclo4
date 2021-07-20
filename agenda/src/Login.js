import React from 'react';
import { Button, Form, FormGroup, Label, Input, Card } from 'reactstrap';
import './login.css'
const Example = (props) => {

  const loginUser=(cb)=>{
    cb(true)  
  }


  return (
      <Card className='login'>
          
    <Form className='formulario'>
       <h4>Ingresa con E-mail y contraseña</h4>
      <FormGroup>        
        <Label for="exampleEmail">Email</Label>
        <Input type="email" name="email" id="exampleEmail" placeholder="Ingresa tu E-mail" />
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
      <Button onclick={()=>{
        loginUser(props.setloginUser) 
      }} href="/Miperfil">Entrar</Button>
      <Button href="/">← Volver</Button>
      <a href="/Registro">Registrarse</a>
    </Form>
      </Card>
  );
}

export default Example;