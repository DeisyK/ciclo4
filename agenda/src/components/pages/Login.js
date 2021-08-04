import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "antd/dist/antd.css";
import { Form, Input, Button, Alert, Card } from "antd";
import "../css/login.css";
import api from "../../assets/utils";
import axios from "axios";
import token from "../../assets/token";

const Login = (props) => {
  const [errores, setErrores] = useState(undefined);
  const [loading, setLoading] = useState(false);

  const history = useHistory();
  const onFinish = async (values) => {
    setLoading(true);
    const response = await axios.post(`${api}login/into`, {
      email: values.email,
      password: values.password,
    });
    setLoading(false);
    if (response.data.error) {
      setErrores(response.data.error);
      setLoading(false);

      setTimeout(() => {
        setErrores(undefined);
      }, 7000);
    }
    if (response.data.token) {
      token.setToken(response.data.token);
      props.setToken(response.data.token);
      history.push("/");
    }
  };

  const onFinishFailed = (errorInfo) => {
    alert("Failed:", errorInfo);
  };

  return (
    <div className="login">
      <Form
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
        <Card
          title="Iniciar sesión"
          actions={[
            <Button type="primary" htmlType="submit" loading={loading}>
              Iniciar sesión
            </Button>,
            <Button
              onClick={() => history.push("/RecuperarPw")}
              loading={loading}
            >
              Olvidé mi contraseña
            </Button>,
            <Button onClick={() => history.push("/Registro")} loading={loading}>
              Registrarme!!
            </Button>,
          ]}
        >
          <Form.Item
            name={"email"}
            label="Email"
            rules={[
              {
                type: "email",
                required: true,
                message: "Ingrese un email valido",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Ingrese una contraseña",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          {errores ? <Alert message={errores} type="error" /> : null}
        </Card>
      </Form>
    </div>
  );
};

export default Login;
