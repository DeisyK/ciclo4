import { Alert } from "antd";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { Skeleton, Card, Modal } from "antd";
import { EditOutlined, DeleteFilled } from "@ant-design/icons";
import token from "../../assets/token";
import api from "../../assets/utils";
const DetalleContacto = (props) => {
  const { id } = useParams();
  const history = useHistory();
  const [contacto, setContacto] = useState({});
  const [errores, setErrores] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [message, setMessage] = useState(undefined);
  const [nombreCompleto, setNombreCompleto] = useState("");
  const init = async () => {
    try {
      const url = `${api}contactos/one/${id}`;
      const response = await axios.get(url, {
        headers: { token: token.getToken() },
      });

      if (response.data._id) {
        response.data.name = response.data.name.toUpperCase();
        setContacto(response.data);
        if (response.data.surname) {
          const nombre =
            response.data.name + " " + response.data.surname.toUpperCase();
          setNombreCompleto(nombre);
        } else {
          setNombreCompleto(response.data.name);
        }
      }
      if (response.data.error) {
        setErrores(response.data.error);
      }
    } catch (e) {
      setErrores(e);
      setLoading(false);
    }
    setLoading(false);
  };
  const handleOk = () => {
    setConfirmLoading(true);
    axios
      .delete(`${api}contactos/${id}/destroy`, {
        headers: { token: token.getToken() },
      })
      .then((response) => {
        setVisible(false);
        setConfirmLoading(false);
        if (response.data.error) {
          setErrores(response.data.error);
        }
        if (response.data.message) {
          setMessage(response.data.message);
          setTimeout(() => history.push("/Contactos"), 2000);
        }
      });
  };
  const editar = async () => {
    props.setEditar(contacto);
    history.push(`/EditarPerfil/${id}`);
  };

  const handleCancel = () => {
    setVisible(false);
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <div>
      {errores ? (
        <Link to="/Contactos" style={{ textDecoration: "none" }}>
          <Alert message={`${errores}, ← Volver`} type="error" />
        </Link>
      ) : null}
      {message ? <Alert message={message} type="info" /> : null}
      <Card
        style={{ width: 500, margin: "auto", marginTop: 16 }}
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
        <Modal
          title="Eliminar"
          visible={visible}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
        >
          <p>{`Está seguro de eliminar a ${contacto.name} de los contactos.`}</p>
        </Modal>
        <Skeleton loading={loading} active>
          <Card title={nombreCompleto} bordered={false} style={{ width: 450 }}>
            {contacto.address ? <p>Dirección: {contacto.address}</p> : null}
            {contacto.birthdate ? (
              <p>
                Fecha de nacimiento:{" "}
                {new Date(contacto.birthdate).toLocaleDateString()}
              </p>
            ) : null}
            {contacto.cellphone ? <p>Teléfono: {contacto.cellphone}</p> : null}
            {contacto.country ? <p>País: {contacto.country}</p> : null}
            {contacto.email ? (
              <p>Correo electronico: {contacto.email}</p>
            ) : null}
            {contacto.categoria ? (
              <p>Categoria: {contacto.categoria.name}</p>
            ) : null}
            {contacto.notes ? <p>Notas: {contacto.notes}</p> : null}
          </Card>
        </Skeleton>
      </Card>
    </div>
  );
};
export default DetalleContacto;
