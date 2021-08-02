import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Alert, Card, Form, Input, Button } from "antd";
import axios from "axios";
import "../css/registro.css";
import api from "../../assets/utils";

const Registro = (props) => {
  const [message, setMessage] = useState(undefined);
  const [error, setError] = useState(undefined);
  const history = useHistory();
  const onFinish = (values) => {
    axios
      .post(`${api}login/register`, { email: values.email, name: values.name })
      .then((response) => {
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
      });
  };
  const onFinishFailed = (errorInfo) => {
    setError("Error: debe ingresar un email.");
    setTimeout(() => setError(undefined), 5000);
  };

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
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <h4>Registro</h4>
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
          Registarse
        </Button>
        <Button
          type="reset"
          htmlType="reset"
          onClick={() => history.push("/Login")}
        >
          ← Volver
        </Button>
      </Form>
    </Card>
  );
};

export default Registro;
