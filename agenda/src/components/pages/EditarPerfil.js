import React from "react";
import "../css/EditarPerfil.css"
import {
  Form,
  FormGroup,
  Label,
  Input,  
  Card,
  CardImg,
  CardBody,  
  Button,
} from "reactstrap";

const EditarPerfil = (props) => {
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
               
                <Label for="exampleFile">Subir Foto</Label>
                <Input type="file" name="file" id="exampleFile"/>
               
            </CardBody>
            </Card>
      </div>
      

      <div className='formEdit'>
          

      <FormGroup>      

        <FormGroup>
          <Label for="exampleUrl">Nombre</Label>
          <Input type="text" placeholder="Nombre"  />
        </FormGroup>

        <FormGroup>
          <Label for="exampleDate">Fecha de nacimiento</Label>
          <Input
            type="date"
            name="date"
            id="exampleDate"
            placeholder="date placeholder"
            
            />
        </FormGroup>

        <FormGroup>
          <Label for="exampleUrl">País</Label>
          <Input type="text" placeholder="País"  />
        </FormGroup>
      </FormGroup>
      <FormGroup>
        <Label for="exampleEmail">E-mail</Label>
        <Input
          type="email"
          name="email"
          id="exampleEmail"
          placeholder="E-mail"
          
          />
      </FormGroup>

      <FormGroup>
        <Label for="exampleNumber">Teléfono</Label>
        <Input
          type="number"
          name="number"
          id="exampleNumber"
          placeholder="número telefónico"
          
        /><br></br>
      </FormGroup>
      <Button href="#guardar">Guardar</Button><br></br>
      <Button  href="/Miperfil">← Volver</Button>
          </div>
    </Form>
  );
};

export default EditarPerfil;
