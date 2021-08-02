import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../../assets/utils";
import { Table, Alert, Card, Button, Modal } from "antd";
import { useHistory, Link } from "react-router-dom";
import token from "../../assets/token";

const Contactos = (props) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(undefined);
  const [cargando, setCargando] = useState(true);
  const [visible, setVisible] = useState(false);
  const [porEliminar, setPorEliminar] = useState(undefined);
  const [message, setMessage] = useState(undefined);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const history = useHistory();

  const columns = [
    {
      title: "Nombre",
      width: 100,
      dataIndex: "name",
      key: "name",
      fixed: "left",
    },
    {
      title: "Apellido",
      width: 100,
      dataIndex: "surname",
      key: "surname",
    },
    { title: "Telefono", dataIndex: "cellphone", key: "cellphone" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Pais", dataIndex: "country", key: "country" },
    {
      title: "Edad",
      key: "4",
      dataIndex: "age",
    },

    {
      title: "Acciones",
      key: "operation",
      fixed: "right",
      width: 300,
      render: (contacto) => (
        <div
          style={{ display: "flex", justifyContent: "space-around" }}
          key={contacto._id}
        >
          <Link
            style={{ textDecoration: "none" }}
            to={`/${contacto._id}/detalle-contacto`}
          >
            <Button>Ver detalle</Button>
          </Link>
          <Link
            style={{ textDecoration: "none" }}
            to={`/EditarPerfil/${contacto._id}`}
          >
            <Button type="primary" onClick={() => props.setEditar(contacto)}>
              Editar
            </Button>
          </Link>

          <Button
            danger
            type="primary"
            onClick={() => {
              setPorEliminar(contacto);
              setVisible(true);
            }}
          >
            Eliminar
          </Button>
        </div>
      ),
    },
  ];
  const handleOk = () => {
    setConfirmLoading(true);
    axios
      .delete(`${api}contactos/${porEliminar._id}/destroy`, {
        headers: { token: token.getToken() },
      })
      .then((response) => {
        setVisible(false);
        setConfirmLoading(false);
        if (response.data.error) {
          setError(response.data.error);
          setTimeout(() => setError(undefined), 5000);
        }
        if (response.data.message) {
          setMessage(response.data.message);
          setData([]);
          init();
          setTimeout(() => setMessage(undefined), 5000);
        }
      });
  };
  const handleCancel = () => {
    setVisible(false);
  };
  const init = async () => {
    if (!props.data) {
      const response = await axios.get(`${api}contactos/list`, {
        headers: { token: token.getToken("login") },
      });
      console.log(response);

      if (response.data.error) {
        setError(response.data.error);
        setTimeout(() => setError(undefined), 5000);
      }
      if (response.data.length > 0) {
        response.data.map((contact) => {
          contact.birthdate = new Date(contact.birthdate).toLocaleDateString();
          const edad =
            new Date().getFullYear() -
            new Date(contact.birthdate).getFullYear();
          contact.age = contact.birthdate
            ? !isNaN(edad)
              ? edad
              : "Sin datos"
            : "Sin datos";
          return contact;
        });

        setData(response.data);
      }
    } else {
      setData(props.data);
    }
    loading();
  };
  const loading = () => {
    setCargando(!cargando);
  };
  useEffect(() => {
    init();
  }, []);

  return (
    <div>
      <Modal
        title="Eliminar"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{`Está seguro de eliminar a ${
          porEliminar ? porEliminar.name : ""
        } de los contactos.`}</p>
      </Modal>
      <Card>
        {!props.data ? (
          <Button
            style={{ marginBottom: 10 }}
            type="primary"
            onClick={() => history.push("/crear-contacto")}
          >
            Agregar Nuevo
          </Button>
        ) : null}

        {data && data.length === 0 ? (
          <Alert
            style={{ marginBottom: 10 }}
            type="info"
            message="Aun no tienes contactos registrados"
          />
        ) : null}
        {error ? (
          <Alert
            style={{ marginBottom: 10 }}
            type="error"
            message={error}
          ></Alert>
        ) : null}
        {message ? (
          <Alert style={{ marginBottom: 10 }} message={message} type="info" />
        ) : null}
        <Table columns={columns} dataSource={data} scroll={{ x: 1300 }} />
      </Card>
    </div>
  );
};
export default Contactos;
