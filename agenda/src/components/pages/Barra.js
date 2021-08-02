import React, { useState } from "react";
import { Layout, Menu, Breadcrumb, Alert } from "antd";
import {
  LoginOutlined,
  RollbackOutlined,
  FileOutlined,
  LogoutOutlined,
  ContactsOutlined,
  GroupOutlined,
  SettingOutlined,
  KeyOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import token from "../../assets/token";

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

const Barra = (props) => {
  const history = useHistory();
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = (collapsed) => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={() => onCollapse(collapsed)}
      >
        <Menu theme="dark" defaultSelectedKeys={["2"]} mode="inline">
          {!props.usuario ? (
            <Menu.Item
              key="1"
              icon={<LoginOutlined />}
              onClick={() => history.push("/login")}
            >
              Iniciar sesión
            </Menu.Item>
          ) : (
            <Menu.Item
              key="2"
              icon={<LogoutOutlined />}
              onClick={() => {
                localStorage.removeItem("login");
                props.setToken(null);
                props.setUsuario(undefined);
              }}
            >
              Cerrar sesión
            </Menu.Item>
          )}
          <Menu.Item
            key="3"
            icon={<RollbackOutlined />}
            onClick={() => history.push("/")}
          >
            Inicio
          </Menu.Item>
          {props.usuario ? (
            <Menu.Item
              key="4"
              icon={<ContactsOutlined />}
              onClick={() => history.push("/Contactos")}
            >
              Contactos
            </Menu.Item>
          ) : null}
          {props.usuario ? (
            <Menu.Item
              key="5"
              icon={<GroupOutlined />}
              onClick={() => history.push("/Categorias")}
            >
              Categorias
            </Menu.Item>
          ) : null}
          {props.usuario ? (
            <SubMenu key="sub1" icon={<SettingOutlined />} title="Mi perfil">
              <Menu.Item
                key="6"
                icon={<EditOutlined />}
                onClick={() => {
                  props.setEditar(props.usuario);
                  console.log(props.editar);
                  history.push("/perfil/editar");
                }}
              >
                Editar perfil
              </Menu.Item>

              <Menu.Item key="7" icon={<KeyOutlined />}>
                Editar contraseña
              </Menu.Item>
            </SubMenu>
          ) : null}
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header
          style={{
            position: "fixed",
            zIndex: 1,
            width: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <img
            src="https://i.ibb.co/KWChTk2/Whats-App-Image-2021-07-12-at-6-19-40-PM.jpg"
            width="50"
            height="30"
            className="d-inline-block align-top"
            alt="logo"
            onClick={() => history.push("/")}
          />

          <h6 style={{ color: "#fff", margin: "auto" }}>
            {props.usuario ? `Bienvenido ${props.usuario.name}` : null}
          </h6>
        </Header>
        <Content>
          <Breadcrumb>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            {token.getToken() && props.errores ? (
              <Alert message={props.errores} type="error" />
            ) : null}
            {props.rutas()}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Barra;
