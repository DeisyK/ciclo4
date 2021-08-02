import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, Input, Button, Alert, Card } from "antd";

import api from "../../assets/utils";
import axios from "axios";
import token from "../../assets/token";

const CambiarPassword = (props) => {
  const [message, setMessage] = useState(undefined);
  const [error, setError] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const response = await axios.patch(
        `${api}login/change/password`,
        {
          oldPassword: values.oldPassword,
          newPassword: values.newPassword,
          confirmPassword: values.confirmPassword,
        },
        { headers: { token: token.getToken() } }
      );
      setLoading(false);

      if (response.data.message) {
        setMessage(response.data.message);
        localStorage.removeItem("login");
        props.setToken(null);
        props.setUsuario(undefined);

        setTimeout(() => {
          setMessage(undefined);
          history.push("/Login");
        }, 2000);
      }
      if (response.data.error) {
        setError(response.data.error);
        setTimeout(() => setError(undefined), 5000);
      }
    } catch (error) {}
  };
  const onFinishFailed = (errorInfo) => {
    setError("Ingrese una contraseña");
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
        style={{ width: 1000 }}
        className="password"
        title="Cambiar Contraseña"
        actions={[
          <Button type="primary" htmlType="submit" loading={loading}>
            Editar contraseña
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
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
      >
        {message ? <Alert message={message} type="success" /> : null}
        {error ? <Alert message={error} type="error" /> : null}
        <Form.Item
          label="Contraseña actual"
          name="oldPassword"
          hasFeedback
          rules={[
            {
              required: true,
              min: 8,
              message: "La contraseña debe tener minimo 8 caracteres",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Nueva contraseña"
          name="newPassword"
          dependencies={["oldPassword"]}
          rules={[
            {
              required: true,
              min: 8,
              message: "La contraseña debe tener minimo 8 caracteres",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("oldPassword") !== value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error(
                    "Laa contraseña actual y la nueva no pueden ser las mismas"
                  )
                );
              },
            }),
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Confirme contraseña"
          name="confirmPassword"
          dependencies={["newPassword"]}
          hasFeedback
          rules={[
            {
              required: true,
              min: 8,
              message: "La contraseña debe tener minimo 8 caracteres",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Las contaseñas no coinciden!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
      </Card>
    </Form>
  );
};

export default CambiarPassword;
