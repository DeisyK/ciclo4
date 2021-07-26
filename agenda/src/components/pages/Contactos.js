import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import api from "../../assets/utils";
import {
  Table,
  Button,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
} from "reactstrap";

class Contactos extends React.Component {
  state = {
    data: [],
    modalActualizar: false,
    modalInsertar: false,
    modalDetalle: false,
    form: {
      id: "",
      nombre: "",
      telefono: "",
      Email: "",
      categoria: "",
    },

    dataSearch: [],
    modalConfirmacion: false,
  };

  mostrarModalActualizar = (dato) => {
    this.setState({
      form: dato,
      modalActualizar: true,
    });
  };

  cerrarModalActualizar = () => {
    this.setState({ modalActualizar: false });
  };

  mostrarModalDetalle = (dato) => {
    this.setState({
      form: dato,
      modalDetalle: true,
    });
  };

  cerrarModalDetalle = () => {
    this.setState({ modalDetalle: false });
  };

  mostrarModalInsertar = () => {
    this.setState({
      modalInsertar: true,
    });
  };

  cerrarModalInsertar = () => {
    this.setState({ modalInsertar: false });
  };

  editar = (dato) => {
    var contador = 0;
    var arreglo = this.state.data;
    arreglo.map((registro) => {
      if (dato.id == registro.id) {
        arreglo[contador].nombre = dato.nombre;
        arreglo[contador].telefono = dato.telefono;
        arreglo[contador].Email = dato.Email;
        arreglo[contador].categoria = dato.categoria;
      }
      contador++;
    });
    this.setState({ data: arreglo, modalActualizar: false });
  };

  eliminar = (dato) => {
    var opcion = window.confirm(
      "Estás Seguro que deseas Eliminar el contacto " + dato.nombre
    );
    if (opcion) {
      var contador = 0;
      var arreglo = this.state.data;
      arreglo.map((registro) => {
        if (dato.id === registro.id) {
          arreglo.splice(contador, 1);
        }
        contador++;
      });
      this.setState({ data: arreglo, modalActualizar: false });
    }
  };

  insertar = () => {
    var valorNuevo = { ...this.state.form };
    valorNuevo.id = this.state.data.length + 1;
    var lista = this.state.data;
    lista.push(valorNuevo);
    this.setState({ modalInsertar: false, data: lista });
  };

  filtrar = (e) => {
    const { value } = e.target;
    let lista = this.state.data;
    const filtered = lista.filter((fltr) =>
      fltr.nombre.toLowerCase().includes(value.toLowerCase())
    );

    this.setState({ dataSearch: !value ? [] : filtered });
  };

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };
  componentDidMount() {
    axios
      .get(`${api}contactos/list`)
      .then((response) => this.setState({ data: response.data }));
  }

  render() {
    return (
      <>
        <nav className="navbar navbar-light bg-light">
          <div class="container-fluid">
            <img
              src="https://i.ibb.co/KVbGyG3/logo-small.png"
              width="50"
              height="30"
              className="d-inline-block align-top"
              alt="logo-small"
            />
            <a class="navbar-brand">Agenda de contactos</a>
            <form class="d-flex">
              <input
                class="form-control me-2"
                onChange={this.filtrar}
                type="search"
                placeholder="Search"
                aria-label="Search"
              ></input>
            </form>
          </div>
        </nav>

        <Container>
          <br />
          <Button color="success" onClick={() => this.mostrarModalInsertar()}>
            Agregar
          </Button>
          <br />
          <br />
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Telefono</th>
                <th>E-mail</th>
                <th>Categoría</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map((dato) => (
                <tr key={dato.id && dato.id}>
                  <td>{dato.id && dato.id}</td>
                  <td>{dato.nombre && dato.nombre}</td>
                  <td>{dato.telefono && dato.telefono}</td>
                  <td>{dato.Email && dato.Email}</td>
                  <td>{dato.categoria && dato.categoria}</td>
                  <td>
                    <Button
                      color="success"
                      onClick={() => this.mostrarModalDetalle(dato)}
                    >
                      Detalle
                    </Button>{" "}
                    <Button
                      color="primary"
                      onClick={() => this.mostrarModalActualizar(dato)}
                    >
                      Editar
                    </Button>{" "}
                    <Button color="danger" onClick={() => this.eliminar(dato)}>
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>

        <Modal isOpen={this.state.modalActualizar}>
          <ModalHeader>
            <div>
              <h3>Editar Contacto</h3>
            </div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>Id:</label>
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.form.id}
              />
            </FormGroup>

            <FormGroup>
              <label>Nombre:</label>
              <input
                className="form-control"
                name="nombre"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.nombre}
              />
            </FormGroup>

            <FormGroup>
              <label>Telefono:</label>
              <input
                className="form-control"
                name="telefono"
                type="number"
                onChange={this.handleChange}
                value={this.state.form.telefono}
              />
            </FormGroup>

            <FormGroup>
              <label>Email:</label>
              <input
                className="form-control"
                name="Email"
                type="email"
                onChange={this.handleChange}
                value={this.state.form.Email}
              />
            </FormGroup>

            <FormGroup>
              <label>Categoría:</label>
              <input
                className="form-control"
                name="categoria"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.categoria}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.editar(this.state.form)}
            >
              Guardar
            </Button>
            <Button color="danger" onClick={() => this.cerrarModalActualizar()}>
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
            <div>
              <h3>Agregar Contacto</h3>
            </div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>Id:</label>

              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.data.length + 1}
              />
            </FormGroup>

            <FormGroup>
              <label>Nombre:</label>
              <input
                className="form-control"
                name="nombre"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>Telefono:</label>
              <input
                className="form-control"
                name="telefono"
                type="number"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>Email:</label>
              <input
                className="form-control"
                name="Email"
                type="email"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>Categoría:</label>
              <input
                className="form-control"
                name="categoria"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.categoria}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button color="primary" onClick={() => this.insertar()}>
              Agregar
            </Button>
            <Button
              className="btn btn-danger"
              onClick={() => this.cerrarModalInsertar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.modalDetalle}>
          <ModalHeader>
            <div>
              <h3>Detalle Contacto</h3>
            </div>
          </ModalHeader>

          <ModalBody>
            <p>Descripción detalle</p>
          </ModalBody>

          <ModalFooter>
            <Button
              className="btn btn-danger"
              onClick={() => this.cerrarModalDetalle()}
            >
              Volver
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}
export default Contactos;
