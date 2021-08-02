import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, Input, Button, Alert } from "antd";
import { Card } from "reactstrap";
import api from "../../assets/utils";
import axios from "axios";

import "../css/recuperarPw.css";
const RecuperarPw = (props) => {
  const [message, setMessage] = useState(undefined);
  const [error, setError] = useState(undefined);
  const history = useHistory();
  const onFinish = (values) => {
    axios
      .patch(`${api}login/recovery`, { email: values.email })
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
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <h4>Recuperar Contraseña</h4>
        {message ? <Alert message={message} type="success" /> : null}
        {error ? <Alert message={error} type="error" /> : null}
        <Form.Item
          label="Ingrese su email"
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
          Recuperar contraseña
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

export default RecuperarPw;
