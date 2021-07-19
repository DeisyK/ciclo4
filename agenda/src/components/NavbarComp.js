import React, {Component} from 'react'
import {Navbar,Nav,Container} from 'react-bootstrap'

export default class Navbarcomp extends Component{
    render(){
        return(
           <div>           
             
               <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                 <Container>
                        <Navbar.Brand href="/">
                                <img 
                                    src="https://i.ibb.co/KWChTk2/Whats-App-Image-2021-07-12-at-6-19-40-PM.jpg"
                                    width="50"
                                    height="30"
                                    className="d-inline-block align-top"
                                    alt="logo"
                                />{' '}
                                BASIC WEB NOTE
                                
                            </Navbar.Brand>                            
                        
                                              
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                       
                        <Navbar.Collapse id="responsive-navbar-nav">
                        
                            <Nav className="me-auto">
                            <Nav.Link href="/Categorias">Categorías</Nav.Link>
                            <Nav.Link href="/Contactos">Contactos</Nav.Link>
                           
                            </Nav>
                            <Nav>                           
                            
                            <Nav.Link href="/login">Mi Cuenta</Nav.Link>
                           
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
               </Navbar>

           </div> 
        )
    }
}