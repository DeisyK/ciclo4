import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, Input, Button, Alert, Card } from "antd";
import api from "../../assets/utils";
import axios from "axios";

import "../css/recuperarPw.css";
const RecuperarPw = (props) => {
  const [message, setMessage] = useState(undefined);
  const [error, setError] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const onFinish = async (values) => {
    setLoading(true);
    const response = await axios.patch(`${api}login/recovery`, {
      email: values.email,
    });
    setLoading(false);
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
  };
  const onFinishFailed = (errorInfo) => {
    setError("Error: debe ingresar un email.");
    setTimeout(() => setError(undefined), 5000);
  };

  return (
    <Form
      className="formPw"
      name="basic"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      style={{ margin: "auto", marginTop: 100 }}
    >
      <Card
        style={{ width: "700px" }}
        className="password"
        wrapperCol={{
          span: 16,
        }}
        labelCol={{
          span: 8,
        }}
        title="Recuperar Contraseña"
        actions={[
          <Button
            type="reset"
            htmlType="reset"
            onClick={() => {
              history.goBack();
            }}
            loading={loading}
          >
            ← Volver
          </Button>,
          <Button type="primary" htmlType="submit" loading={loading}>
            Recuperar contraseña
          </Button>,
        ]}
      >
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
      </Card>
    </Form>
  );
};

export default RecuperarPw;
