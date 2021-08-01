import React, { useState, useEffect } from "react";
import "../css/EditarPerfil.css";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { Form, DatePicker, Select, Card, Input, Button, Alert } from "antd";
import api from "../../assets/utils";
import token from "../../assets/token";
import moment from "moment";
const { Option } = Select;
const { TextArea } = Input;

const EditarPerfil = (props) => {
  const [paises, setPaises] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [errores, setErrores] = useState(undefined);
  const [editado, setEditado] = useState(false);

  const history = useHistory();

  const onFinish = async (values) => {
    let response = {};
    if (!props.editar) {
      response = await axios.post(
        `${api}contactos/add`,
        {
          name: values.name,
          address: values.address,
          birthdate: values.birthdate,
          country: values.country,
          cellphone: values.cellphone,
          notes: values.notes,
          email: values.email,
          surname: values.surname,
          category_id: values.category_id,
        },
        {
          headers: { token: token.getToken() },
        }
      );
    } else {
      response = await axios.patch(
        `${api}contactos/${props.editar._id}/edit`,
        {
          name: values.name,
          address: values.address,
          birthdate: values.birthdate,
          country: values.country,
          cellphone: values.cellphone,
          notes: values.notes,
          email: values.email,
          surname: values.surname,
          category_id: values.category_id,
        },
        {
          headers: { token: token.getToken() },
        }
      );
      if (response.data.message) {
        setEditado(true);
        await setTimeout(() => {
          setEditado(false);
        }, 2000);
        history.push(`/${props.editar._id}/detalle-contacto`);
      }
    }
    if (response.data.error) {
      setErrores(response.data.error);
      setTimeout(() => {
        setErrores(undefined);
      }, 7000);
    }
    if (response.data._id) {
      history.push(`${response.data._id}/detalle-contacto`);
    }
  };

  const onFinishFailed = (errorInfo) => {};

  const init = async () => {
    const responsePaises = await axios.get(
      "https://restcountries.eu/rest/v2/all"
    );
    const responseCategorias = await axios.get(`${api}categorias/list`, {
      headers: { token: token.getToken() },
    });

    setPaises(responsePaises.data.map((pais) => pais.name));
    setCategorias(responseCategorias.data);
  };
  const edit = () => {
    if (props.editar) {
      return {
        ["name"]: props.editar.name ? props.editar.name : "",
        ["surname"]: props.editar.surname ? props.editar.surname : "",
        ["cellphone"]: props.editar.cellphone ? props.editar.cellphone : "",
        ["address"]: props.editar.address ? props.editar.address : "",
        ["email"]: props.editar.email ? props.editar.email : "",
        ["notes"]: props.editar.notes ? props.editar.notes : "",
        ["country"]: props.editar.country ? props.editar.country : "Colombia",
        ["category_id"]: props.editar.category_id
          ? props.editar.categoria.name
          : null,
        ["birthdate"]: props.editar.birthdate
          ? moment(props.editar.birthdate, "YYYY-MM-DD")
          : "",
      };
    }
  };

  useEffect(() => {
    init();
  }, []);
  return (
    <Card
      title={props.editar ? "Editar Contacto" : "Nuevo Contacto"}
      bordered={false}
      style={{ width: 700, margin: "auto" }}
    >
      {editado ? <Alert message="Contacto actualizado" type="info" /> : null}
      {errores ? <Alert message={errores} type="error" /> : null}
      <Form
        labelCol={{
          span: 5,
        }}
        wrapperCol={{
          span: 16,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        initialValues={edit()}
      >
        <Form.Item
          label="Nombre"
          name={"name"}
          rules={[
            {
              required: true,
              message: "Ingrese el nombre de su contacto",
            },
          ]}
        >
          <Input style={{ width: 400 }} />
        </Form.Item>
        <Form.Item label="Apellido" name={"surname"}>
          <Input style={{ width: 400 }} />
        </Form.Item>
        <Form.Item
          label="Número teléfonico"
          name={"cellphone"}
          rules={[
            {
              required: true,
              message: "Ingrese su número teléfonico",
            },
          ]}
        >
          <Input style={{ width: 400 }} />
        </Form.Item>
        <Form.Item label="Fecha de nacimiento" name={"birthdate"}>
          <DatePicker style={{ width: 400 }} />
        </Form.Item>
        <Form.Item label="Dirección" name={"address"}>
          <Input style={{ width: 400 }} />
        </Form.Item>
        <Form.Item label="Pais" initialValue={"Colombia"} name="country">
          <Select style={{ width: 400 }}>
            {paises.map((pais) => (
              <Option value={pais} key={pais}>
                {pais}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Correo electronico" name={"email"}>
          <Input style={{ width: 400 }} />
        </Form.Item>
        <Form.Item label="Categoria" name={"category_id"}>
          <Select style={{ width: 400 }}>
            {categorias.length > 0
              ? categorias.map((categoria) => (
                  <Option value={categoria._id} key={categoria._id}>
                    {categoria.name}
                  </Option>
                ))
              : null}
          </Select>
        </Form.Item>
        <Form.Item label="Notas" name={"notes"}>
          <TextArea style={{ width: 400 }} />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          {!props.editar ? "Registrar nuevo contacto" : "Editar contacto"}
        </Button>
      </Form>
    </Card>
  );
};

export default EditarPerfil;
