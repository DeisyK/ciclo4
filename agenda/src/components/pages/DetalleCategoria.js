import React, { useEffect, useState } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { Alert, Card, Skeleton, Modal } from "antd";
import { EditOutlined, DeleteFilled } from "@ant-design/icons";
import token from "../../assets/token";
import axios from "axios";
import api from "../../assets/utils";
import Contactos from "./Contactos";

const DetalleCategoria = (props) => {
  const [data, setData] = useState(undefined);
  const [errores, setErrores] = useState(undefined);
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const { id } = useParams();
  const history = useHistory();
  const init = async () => {
    try {
      const response = await axios.get(`${api}categorias/${id}/one`, {
        headers: { token: token.getToken() },
      });

      if (response.data.error) setErrores(response.data.error);
      if (response.data.categoria) setData(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleOk = async () => {
    setConfirmLoading(true);
    try {
      const response = await axios.delete(`${api}categorias/${id}/destroy`, {
        headers: { token: token.getToken() },
      });

      setVisible(false);
      setConfirmLoading(false);
      if (response.data.error) {
        setErrores(response.data.error);
      }
      if (response.data.message) {
        setMessage(response.data.message);
        setTimeout(() => history.push("/Categorias"), 2000);
      }
    } catch (error) {
      setErrores(error);
    }
  };
  const handleCancel = () => {
    setVisible(false);
  };
  const editar = async () => {
    props.setEditar(data.categoria);
    history.push(`/categoria/${data.categoria._id}/editar`);
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <div>
      <Card
        style={{ width: 1000, margin: "auto", marginTop: 16 }}
        actions={[
          <EditOutlined
            style={{ fontSize: "30px" }}
            key="edit"
            onClick={() => editar()}
          />,
          <DeleteFilled
            style={{ fontSize: "30px" }}
            key="delete"
            onClick={() => setVisible(true)}
          />,
        ]}
      >
        {errores ? (
          <Link to="/Contactos" style={{ textDecoration: "none" }}>
            <Alert message={`${errores}, ← Volver`} type="error" />
          </Link>
        ) : null}
        {message ? <Alert message={message} type="info" /> : null}
        {data ? (
          <div>
            <Modal
              title="Eliminar"
              visible={visible}
              onOk={handleOk}
              confirmLoading={confirmLoading}
              onCancel={handleCancel}
            >
              <p>{`Está seguro de eliminar a ${
                data.categoria.name ? data.categoria.name : ""
              } de los contactos.`}</p>
            </Modal>
            <Skeleton loading={loading} active>
              <Card
                title={data.categoria.name}
                bordered={false}
                style={{ width: 950 }}
              >
                {data.categoria.description ? (
                  <p>Descripción: {data.categoria.description}</p>
                ) : null}
                {data.contactos.length > 0 ? (
                  <Contactos data={data.contactos} />
                ) : (
                  <Alert
                    message={"No tienes contactos guardados en esta categoria"}
                    type="info"
                  />
                )}
              </Card>
            </Skeleton>
          </div>
        ) : null}
      </Card>
    </div>
  );
};

export default DetalleCategoria;
