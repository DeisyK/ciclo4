import React from 'react';
import { Button, Form, FormGroup, Label, Input, Card } from 'reactstrap';
import '../css/recuperarPw.css'
const RecuperarPw = (props) => {
  return (
      <Card className='password'>
          
    <Form className='formPw'>
       <h4>Recuperar Contraseña</h4>
      <FormGroup>        
        <Label for="exampleEmail">Usuario</Label>
        <Input type="email" name="email" id="exampleEmail" placeholder="Ej:correo@prueba.co" />
      </FormGroup>  
      
      <Button>Recuperar contraseña</Button>
      <Button href="/login">← Volver</Button>
      
    </Form>
      </Card>
  );
}

export default RecuperarPw;