import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Alert, Card, Form, Input, Button } from "antd";
import axios from "axios";
import "../css/registro.css";
import api from "../../assets/utils";
import token from "../../assets/token";

const Registro = (props) => {
  const [message, setMessage] = useState(undefined);
  const [error, setError] = useState(undefined);
  const history = useHistory();
  const onFinish = async (values) => {
    try {
      if (!props.editar) {
        const response = await axios.post(`${api}login/register`, {
          email: values.email,
          name: values.name,
        });
        if (response.data.message) {
          setMessage(response.data.message);
          setTimeout(() => {
            setMessage(undefined);
            history.push("/Login");
          }, 3000);
        }
        if (response.data.error) {
          setError(response.data.error);
          setTimeout(() => setError(undefined), 5000);
        }
      } else {
        const response = await axios.patch(
          `${api}login/${props.editar._id}/edit`,
          { email: values.email, name: values.name },
          { headers: { token: token.getToken() } }
        );
        if (response.data.message) {
          setMessage(response.data.message);
          token.removeToken();
          token.setToken(response.data.token);
          setTimeout(() => {
            props.setUsuario(undefined);
            history.push("/Login");
          }, 3000);
        }
        if (response.data.error) {
          setError(response.data.error);
          setTimeout(() => setError(undefined), 5000);
        }
      }
    } catch (error) {
      setError(error);
    }
  };
  const onFinishFailed = (errorInfo) => {
    setError("Error: debe ingresar un email.");
    setTimeout(() => setError(undefined), 5000);
  };
  const edit = () => {
    if (props.editar) {
      return {
        ["name"]: props.editar.name ? props.editar.name : null,
        ["email"]: props.editar.email ? props.editar.email : null,
      };
    }
  };
  useEffect(() => {
    return props.setEditar(undefined);
  }, []);

  return (
    <Card className="password">
      <Form
        className="formPw"
        name="basic"
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 19,
        }}
        initialValues={edit()}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <h4>{props.editar ? "Editar perfil" : "Registro"}</h4>
        {message ? <Alert message={message} type="success" /> : null}
        {error ? <Alert message={error} type="error" /> : null}
        <Form.Item
          label="Nombre"
          name="name"
          rules={[
            {
              required: true,
              message: "Ingrese su nombre",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="email"
          name="email"
          rules={[
            {
              required: true,
              message: "Ingrese su email",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          {props.editar ? "Editar perfil" : "Registrarse"}
        </Button>
        {props.editar ? null : (
          <Button
            type="reset"
            htmlType="reset"
            onClick={() => history.push("/Login")}
          >
            ← Volver
          </Button>
        )}
      </Form>
    </Card>
  );
};

export default Registro;
