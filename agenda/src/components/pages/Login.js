import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
//import { Button, Form, FormGroup, Label, Input, Card } from "reactstrap";
import "antd/dist/antd.css";
import { Form, Input, Button, Alert } from "antd";
import "../css/login.css";
import api from "../../assets/utils";
import axios from "axios";

const Login = (props) => {
  const [errores, setErrores] = useState(undefined);

  const history = useHistory();
  const onFinish = async (values) => {
    const response = await axios.post(`${api}login/into`, {
      email: values.email,
      password: values.password,
    });
    if (response.data.error) {
      setErrores(response.data.error);
      setTimeout(() => {
        setErrores(undefined);
      }, 7000);
    }
    if (response.data.token) {
      localStorage.setItem("login", response.data.token);
      props.setToken(response.data.token);
      history.push("/Miperfil");
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
        <Form.Item
          name={"email"}
          label="Email"
          rules={[
            {
              type: "email",
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

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <div className="botones-login">
            <Button type="primary" htmlType="submit">
              Iniciar sesión
            </Button>
            <Button onClick={() => history.push("/RecuperarPw")}>
              Olvidé mi contraseña
            </Button>
            <Button onClick={() => history.push("/Registro")}>
              Registrarme!!
            </Button>
          </div>
        </Form.Item>
      </Form>
      {errores ? <Alert message={errores} type="error" /> : null}
    </div>
  );
};

export default Login;
