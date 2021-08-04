import React, { useState, useEffect } from "react";
import { useHistory, BrowserRouter } from "react-router-dom";
import { Alert, Card, Form, Input, Button } from "antd";
import axios from "axios";
import "../css/registro.css";
import api from "../../assets/utils";
import token from "../../assets/token";

const Registro = (props) => {
  const [message, setMessage] = useState(undefined);
  const [error, setError] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const onFinish = async (values) => {
    try {
      setLoading(true);
      if (!props.editar) {
        const response = await axios.post(`${api}login/register`, {
          email: values.email,
          name: values.name,
        });
        setLoading(false);
        if (response.data.message) {
          setMessage(response.data.message);
          setTimeout(() => {
            setMessage(undefined);
            history.push("/Login");
          }, 1000);
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
        setLoading(false);
        if (response.data.token) {
          setMessage(response.data.message);
          token.setToken(response.data.token);
          props.setToken(response.data.token);
          setTimeout(() => {
            history.push("/");
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
    return (
      props.setEditar ? props.setEditar(undefined) : null,
      setMessage(undefined),
      setError(undefined)
    );
  }, []);

  return (
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
      style={{ margin: "auto", marginTop: 100 }}
    >
      <Card
        style={{ width: "700px" }}
        className="password"
        title={props.editar ? "Editar perfil" : "Registro"}
        actions={[
          <Button type="primary" htmlType="submit" loading={loading}>
            {props.editar ? "Editar perfil" : "Registrarse"}
          </Button>,

          <Button
            type="reset"
            htmlType="reset"
            onClick={() => history.goBack()}
            loading={loading}
          >
            ← Volver
          </Button>,
        ]}
      >
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
      </Card>
    </Form>
  );
};

export default Registro;
