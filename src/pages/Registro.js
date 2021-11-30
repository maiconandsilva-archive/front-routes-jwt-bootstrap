import React, { useEffect, useState, useContext } from "react";
import api from "../services/api";
import Cabecalho from "../components/Cabecalho";
import Rodape from "../components/Rodape";
import { Context } from "../context/AuthContext";
import {
  Container,
  FormGroup,
  Row,
  Table,
  Button,
  Form,
  Input,
  Col
} from "reactstrap";

const Registro = () => {
  const [idregistro, setIdregistro] = useState("");
  const [idvacina, setIdvacina] = useState("");
  const [data, setData] = useState("");
  const [vacinas, setVacinas] = useState([]);
  const [registros, setRegistros] = useState([]);
  const { setErrorMessage } = useContext(Context);

  useEffect(() => {
    (async () => {
      listVacina();
      listRegistro();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const listVacina = () => {
    api
      .get("/vacina/list")
      .then(({ data }) => {
        setVacinas(data.vacinas);
      })
      .catch((e) => setErrorMessage(e.response.data.error[0]));
  };

  const listRegistro = () => {
    api
      .get("/registro/list")
      .then(({ data }) => {
        setErrorMessage("");
        setRegistros(data.registros);
      })
      .catch((e) => setErrorMessage(e.response.data.error[0]));
  };

  const save = (e) => {
    e.preventDefault();
    if (!idregistro) {
      api
        .post("/registro/create", { idvacina, data })
        .then(() => {
          reset(e);
          listRegistro();
        })
        .catch((e) => {
          setErrorMessage(e.response.data.error[0]);
        });
    } else {
      api
        .put("/registro/update", { idregistro, idvacina, data })
        .then(() => {
          reset(e);
          listRegistro();
        })
        .catch((e) => {
          setErrorMessage(e.response.data.error[0]);
        });
    }
  };

  const remove = (e, idregistro) => {
    e.preventDefault();
    api
      .delete("/registro/remove", { data: { idregistro } })
      .then(() => {
        listRegistro();
      })
      .catch((e) => {
        setErrorMessage(e.response.data.error[0]);
      });
  };

  const reset = (e) => {
    e.preventDefault();
    setIdregistro("");
    setIdvacina("");
    setData("");
  };

  return (
    <Container>
      <Row>
        <Cabecalho />
      </Row>
      <Row>
        <h3>Registro</h3>
      </Row>
      <Row>
        <Form>
          {idregistro && (
            <div>
              <label>ID: {idregistro}</label>
            </div>
          )}
          <FormGroup>
            <label>Vacina</label>
            <Input type="select" value={idvacina}
              onChange={(e) => setIdvacina(e.target.value)}>
              {vacinas.map((item) => (
                <option key={item.idvacina} value={item.idvacina}>
                  {item.nome}
                </option>
              ))}
            </Input>
          </FormGroup>
          <FormGroup>
            <label>Data</label>
            <Input value={data} onChange={(e) => setData(e.target.value)} />
          </FormGroup>
          <Row>
            <Col md={6}><Button className="w-100" onClick={save}>Salvar</Button></Col>
            <Col md={6}><Button className="w-100" onClick={reset}>Limpar</Button></Col>
          </Row>
        </Form>
      </Row>
      {registros.length > 0 && (
        <Row>
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Vacina</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              {registros.map((item) => (
                <tr
                  key={item.idregistro}
                  onClick={() => {
                    setIdregistro(item.idregistro);
                    setIdvacina(item.idvacina);
                    setData(item.data);
                  }}
                  onContextMenu={(e) => remove(e, item.idregistro)}
                >
                  <td>{item.idregistro}</td>
                  <td>{item.vacina.nome}</td>
                  <td>{item.data}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Row>
      )}
      <Row>
        <Rodape />
      </Row>
    </Container>
  );
};

export default Registro;
