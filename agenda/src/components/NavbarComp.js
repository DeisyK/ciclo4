import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./css/login.css";

const Navbarcomp = (props) => {
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
              {props.token ? (
                <Link
                  to="/Categorias"
                  style={{ textDecoration: "none", color: "#FFF" }}
                >
                  Categorías
                </Link>
              ) : null}

              {props.token ? (
                <Link
                  to="/Contactos"
                  style={{ textDecoration: "none", color: "#FFF" }}
                >
                  Contactos
                </Link>
              ) : null}
            </Nav>
            <Nav>
              {props.token ? (
                <Nav.Link
                  href="/"
                  onClick={() => {
                    localStorage.removeItem("login");
                    props.setToken(null);
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
