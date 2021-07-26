import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
//import { Button, Form, FormGroup, Label, Input, Card } from "reactstrap";
import "antd/dist/antd.css";
import { Form, Input, Button, Checkbox } from "antd";
import "../css/login.css";
import api from "../../assets/utils";
import axios from "axios";

const Login = () => {
  const history = useHistory();
  const onFinish = async (values) => {
    const response = await axios.post(`${api}login/into`, {
      email: values.email,
      password: values.password,
    });
    if (response.data.token) {
      localStorage.setItem("login", response.data.token);
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
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
