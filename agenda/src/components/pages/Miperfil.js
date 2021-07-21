import React from "react";
import { Link } from 'react-router-dom';
import "../css/miperfil.css"
import {
  Form,
  FormGroup,
  Label,
  Input,  
  Card,
  CardImg,
  CardBody,
  CardTitle, 
  Button,
} from "reactstrap";

const Miperfil = (props) => {
  return (
    <Form >
      <div>
            <Card className='fotoPerfil' >
            <CardImg className='imgPerfil'
                top
                width="100%"
                src="https://i.ibb.co/DkvT9cS/img-Perfil.png"
                alt="Imagen perfil"
            />
            <CardBody >
                <CardTitle tag="h6">Nombre de usuario</CardTitle>               
                
               
            </CardBody>
            </Card>
      </div>
      

      <div className='formPefil'>
          

      <FormGroup>
        <h6>Información de perfil</h6>

        <FormGroup>
          <Label for="exampleDate">Fecha de nacimiento</Label>
          <Input
            type="date"
            name="date"
            id="exampleDate"
            placeholder="date placeholder"
            disabled
            />
        </FormGroup>

        <FormGroup>
          <Label for="exampleUrl">País</Label>
          <Input type="text" placeholder="País" disabled />
        </FormGroup>
      </FormGroup>
      <FormGroup>
        <Label for="exampleEmail">E-mail</Label>
        <Input
          type="email"
          name="email"
          id="exampleEmail"
          placeholder="E-mail"
          disabled
          />
      </FormGroup>

      <FormGroup>
        <Label for="exampleNumber">Teléfono</Label>
        <Input
          type="number"
          name="number"
          id="exampleNumber"
          placeholder="número telefónico"
          disabled
        />
      </FormGroup>      
      <Link to="/EditarPerfil"><Button>Editar perfil</Button></Link>
      
          </div>
    </Form>
  );
};

export default Miperfil;
