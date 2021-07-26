import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const Navbarcomp = () => {
  return (
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
            />{" "}
            BASIC WEB NOTE
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />

          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              {localStorage.getItem("login") ? (
                <Link to="/Categorias">Categorías</Link>
              ) : null}

              {localStorage.getItem("login") ? (
                <Link to="/Contactos">Contactos</Link>
              ) : null}
            </Nav>
            <Nav>
              {localStorage.getItem("login") ? (
                <Nav.Link
                  href="/"
                  onClick={() => {
                    localStorage.removeItem("login");
                  }}
                >
                  Salir
                </Nav.Link>
              ) : (
                <Nav.Link href="/login">Mi cuenta</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};
export default Navbarcomp;
