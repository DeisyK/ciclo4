import React from 'react';
import { Link } from 'react-router-dom';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import "../css/registro.css"

const Registro = (props) => {
  return (
    <Form className='formRegistro'>
      <FormGroup>
        <h4>Registrarse</h4>
        
      </FormGroup>
      <FormGroup>
        <Label for="exampleEmail">Nombre</Label>
        <Input
          type="text"
          name="text"
          id="exampleEmail"
          placeholder="Ingresa tu nombre"
        />
      </FormGroup>
      
      <FormGroup>
        <Label for="exampleUrl">Apellido</Label>
        <Input
          type="text"
          name="text"
          id="exampleUrl"
          placeholder="Ingrese apellido"
        />
      </FormGroup>
      <FormGroup>
        <Label for="exampleNumber">Número</Label>
        <Input
          type="number"
          name="number"
          id="exampleNumber"
          placeholder="Ingresa tu número telefónico"
        />
      </FormGroup>
     
      <FormGroup>
        <Label for="exampleDate">Fecha de nacimiento</Label>
        <Input
          type="date"
          name="date"
          id="exampleDate"          
        />
      </FormGroup>
      <FormGroup>
        <Label for="exampleSelect">Género</Label>
        <Input type="select" name="select" id="exampleSelect">
          <option>Femenino</option>
          <option>Masculino</option>
          <option>Otro</option>          
        </Input>
      </FormGroup>

      <FormGroup>
        <Label for="exampleEmail">Email</Label>
        <Input
          type="email"
          name="email"
          id="exampleEmail"
          placeholder="Ingresa tu E-mail"
        />
      </FormGroup>    
      
      <Link to="#"><Button>Registrarse</Button></Link>       
      <Link to="/login"><Button>← Volver</Button></Link>      
      
    </Form>
  );
}

export default Registro;