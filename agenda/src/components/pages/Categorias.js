import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../../assets/utils";
import { Table, Alert, Card, Button, Modal } from "antd";
import { useHistory, Link } from "react-router-dom";
import token from "../../assets/token";

const Categorias = (props) => {
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
      title: "Descripción",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Acciones",
      key: "operation",
      fixed: "right",
      width: 300,
      render: (categoria) => (
        <div
          key={categoria._id}
          style={{ display: "flex", justifyContent: "space-around" }}
        >
          <Link
            style={{ textDecoration: "none" }}
            to={`/categoria/${categoria._id}/detalle`}
          >
            <Button>Ver detalle</Button>
          </Link>
          <Link
            style={{ textDecoration: "none" }}
            to={`/categoria/${categoria._id}/editar`}
          >
            <Button type="primary" onClick={() => props.setEditar(categoria)}>
              Editar
            </Button>
          </Link>

          <Button
            danger
            type="primary"
            onClick={() => {
              setPorEliminar(categoria);
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
      .delete(`${api}categorias/${porEliminar._id}/destroy`, {
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
    const response = await axios.get(`${api}categorias/list`, {
      headers: { token: token.getToken("login") },
    });

    if (response.data.error) {
      setError(response.data.error);
      setTimeout(() => setError(undefined), 5000);
    }
    if (response.data.length > 0) {
      setData(response.data);
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
        } de las categorias.`}</p>
      </Modal>
      <Card>
        <Button
          style={{ marginBottom: 10 }}
          type="primary"
          onClick={() => history.push("/categoria/agregar")}
        >
          Agregar categoria
        </Button>
        {data.length === 0 ? (
          <Alert
            style={{ marginBottom: 10 }}
            type="info"
            message="Aun no tienes categorias registradas"
          ></Alert>
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
      )
    </div>
  );
};
export default Categorias;
