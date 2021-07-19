import React, {useState,useEffect} from "react";
import { Card, CardGroup} from "react-bootstrap";
import './tarjetas.css'


function Inicio() {
   
    const [integrantes, setIntegrantes] = useState([])

    useEffect(()=>{
        setIntegrantes([ { foto:'https://i.ibb.co/qrcp2WS/fotodeisy1.jpg',  nombre: "Deisy Katherine Pineda", rol:"Scrum Master y gestor de proyectos", telefono: 3133523752,  Email: "kte_0330@hotmail.com"},
        { foto:'https://i.ibb.co/0q5GZ45/fotonelson.jpg', nombre: "Nelson Ricardo Hurtado F.", rol:"DBA (Persistencia)", telefono: 3102215050, Email: "lf62@hotmail.com" },
        { foto:'https://i.ibb.co/hsTQ8GQ/fotojair.png', nombre: "Hector Jair Fonseca Pinto", rol:"Backend", telefono: 56932679167,  Email: "jairfonseca64@yahoo.es"},
        {foto:'https://i.ibb.co/f0tK9yZ/fotocarlos.png', nombre: "Carlos Andrés Gutiérrez Cruz", rol:"Testing", telefono: 3153011375, Email: "contacto10@gmail.com"},
        {foto:'https://i.ibb.co/ngcpjvW/fotowalter1.jpg', nombre: "Walter Gonzalez Rincon", rol:"Frontend",telefono: 3215527911, Email: "wg8901@gmail.com" }])
    },[])    

    return (
      <div>  
          <br></br>   

        <Card className='tarjeta'>
          <img  src="https://i.ibb.co/KWChTk2/Whats-App-Image-2021-07-12-at-6-19-40-PM.jpg"
          width="300"
          height="100"
          
           alt='logo'/>
          <Card.Body class="text-center">
            <Card.Text>
            Aplicación Web que presta el servicio de una agenda virtual donde el usuario 
            podrá encontrar sus contactos de manera fácil, con información que considere importante y 
            su respectiva foto donde podrá identificarlo.
            </Card.Text>
          </Card.Body>
        </Card>        
        <br></br>
        <CardGroup>
            {integrantes.map((integrante,i)=>              
                
                    <Card className='tarjetaPersonal' key={i}>
                    <Card.Img variant="top" src={integrante.foto}
                                    width="100"
                                    height="250"/>
                    <Card.Body>
                      <Card.Title>{integrante.nombre}</Card.Title>
                      <Card.Text>{integrante.rol}</Card.Text>            
                    </Card.Body>
                    <Card.Footer>
                      <small className="text-muted">{integrante.Email}</small>
                    </Card.Footer>
                  </Card>
               
            )}
          
        </CardGroup>
      </div>
    );
  
}
export default Inicio
