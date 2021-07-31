import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../../assets/utils";
import { Table, Alert, Card } from "antd";
import { Button } from "antd/lib/radio";
import { useHistory } from "react-router-dom";
import token from "../../assets/token";
const columns = [
  {
    title: "Name",
    dataIndex: "name",
    width: 150,
  },
  {
    title: "Cumpleaños",
    dataIndex: "birthdate",
    width: 150,
  },
  {
    title: "Dirección",
    dataIndex: "address",
  },
  // {
  //   title: "Dirección",
  //   dataIndex: "address",
  // },
  // {
  //   title: "Dirección",
  //   dataIndex: "address",
  // },
];

const Contactos = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(undefined);
  const history = useHistory();
  const init = async () => {
    const response = await axios.get(`${api}contactos/list`, {
      headers: { token: token.getToken("login") },
    });

    if (response.data.error) {
      setError(response.data.error);
    }
    if (response.data.length > 0) {
      response.data.map((contact) => {
        contact.birthdate = new Date(contact.birthdate).toLocaleDateString();
        return contact;
      });

      setData(response.data);
    }
  };
  useEffect(() => {
    init();
  }, []);

  return (
    <div>
      {error ? <Alert type="info" message={error}></Alert> : null}
      {data.length === 0 ? (
        <Alert
          type="info"
          message="Aun no tienes contactos registrados"
        ></Alert>
      ) : null}
      <Card>
        <Button type="primary" onClick={() => history.push("/crear-contacto")}>
          Agregar Nuevo
        </Button>
        <Table
          columns={columns}
          dataSource={data}
          scroll={{ x: 1500 }}
          summary={(pageData) => (
            <Table.Summary fixed>
              <Table.Summary.Row>
                <Table.Summary.Cell index={0} colSpan={2}>
                  Fix Left
                </Table.Summary.Cell>
                <Table.Summary.Cell index={2} colSpan={8}>
                  Scroll Context
                </Table.Summary.Cell>
                <Table.Summary.Cell index={10}>Fix Right</Table.Summary.Cell>
              </Table.Summary.Row>
            </Table.Summary>
          )}
          sticky
        />
      </Card>
      )
    </div>
  );
};
export default Contactos;
