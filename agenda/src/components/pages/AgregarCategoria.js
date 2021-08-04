import React, { useState, useEffect } from "react";
import "../css/EditarPerfil.css";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Form, Card, Input, Button, Alert } from "antd";
import api from "../../assets/utils";
import token from "../../assets/token";

const { TextArea } = Input;

const EditarPerfil = (props) => {
  const [errores, setErrores] = useState(undefined);
  const [editado, setEditado] = useState(false);

  const history = useHistory();

  const onFinish = async (values) => {
    let response = {};
    if (!props.editar) {
      response = await axios.post(
        `${api}categorias/add`,
        {
          name: values.name,
          description: values.description,
        },
        {
          headers: { token: token.getToken() },
        }
      );
    } else {
      response = await axios.patch(
        `${api}categorias/${props.editar._id}/edit`,
        {
          name: values.name,
          description: values.description,
        },
        {
          headers: { token: token.getToken() },
        }
      );
      if (response.data.message) {
        setEditado(true);
        await setTimeout(() => {
          setEditado(false);
        }, 2000);
        //history.push(`/${props.editar._id}/detalle-contacto`);
        history.push(`/categorias`);
      }
    }
    if (response.data.error) {
      setErrores(response.data.error);
      setTimeout(() => {
        setErrores(undefined);
      }, 7000);
    }
    if (response.data._id) {
      history.push(`/Categorias`);
    }
  };

  const onFinishFailed = (errorInfo) => {};

  const edit = () => {
    if (props.editar) {
      return {
        ["name"]: props.editar.name ? props.editar.name : null,
        ["description"]: props.editar.description
          ? props.editar.description
          : null,
      };
    }
  };

  useEffect(() => {
    return () => (props.editar ? props.setEditar(undefined) : null);
  }, []);

  return (
    <Card
      title={props.editar ? "Editar Categoria" : "Nuevo Categoria"}
      bordered={false}
      style={{ width: 700, margin: "auto" }}
    >
      {editado ? <Alert message="Categoria actualizado" type="info" /> : null}
      {errores ? <Alert message={errores} type="error" /> : null}
      <Form
        labelCol={{
          span: 5,
        }}
        wrapperCol={{
          span: 16,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        initialValues={edit()}
      >
        <Form.Item
          label="Nombre"
          name={"name"}
          rules={[
            {
              required: true,
              message: "Ingrese el nombre de la nueva categoria",
            },
          ]}
        >
          <Input style={{ width: 400 }} />
        </Form.Item>

        <Form.Item label="Descripción" name={"description"}>
          <TextArea style={{ width: 400 }} />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          {!props.editar ? "Registrar nueva categoria" : "Guardar categoria"}
        </Button>
      </Form>
    </Card>
  );
};

export default EditarPerfil;
