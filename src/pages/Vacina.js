import React, { useEffect, useState, useContext } from "react";
import Cabecalho from "../components/Cabecalho";
import Rodape from "../components/Rodape";
import api from "../services/api";
import { Context } from "../context/AuthContext";
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Row,
  Table
} from "reactstrap";

const Vacina = () => {
  const [idvacina, setIdvacina] = useState("");
  const [nome, setNome] = useState("");
  const [vacinas, setVacinas] = useState([]);
  const { setErrorMessage } = useContext(Context);

  useEffect(() => {
    //chamado ao carregar o componente
    (async () => {
      list();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const list = () => {
    api
      .get("/vacina/list")
      .then(({ data }) => {
        setErrorMessage("");
        setVacinas(data.vacinas);
      })
      .catch((e) => setErrorMessage(e.response.data.error[0]));
  };

  const save = (e) => {
    e.preventDefault();
    if (!idvacina) {
      api
        .post("/vacina/create", { nome: nome.trim() })
        .then(() => {
          reset(e);
          list();
        })
        .catch((e) => {
          setErrorMessage(e.response.data.error[0]);
        });
    } else {
      api
        .put("/vacina/update", { idvacina, nome: nome.trim() })
        .then(() => {
          reset(e);
          list();
        })
        .catch((e) => {
          setErrorMessage(e.response.data.error[0]);
        });
    }
  };

  const remove = (e, idvacina) => {
    e.preventDefault();
    api
      .delete("/vacina/remove", { data: { idvacina } })
      .then(() => {
        list();
      })
      .catch((e) => {
        setErrorMessage(e.response.data.error[0]);
      });
  };

  const reset = (e) => {
    e.preventDefault();
    setIdvacina("");
    setNome("");
  };

  return (
    <Container>
      <Row>
        <Cabecalho />
      </Row>
      <div className="row">
        <h3>Vacina</h3>
      </div>
      <Row>
        <Form>
          {idvacina && (
            <div>
              <label>ID: {idvacina}</label>
            </div>
          )}
          <FormGroup>
            <label>Nome</label>
            <Input value={nome} onChange={(e) => setNome(e.target.value)} />
          </FormGroup>
          <Row>
            <Col md={6}><Button className="w-100" onClick={save}>Salvar</Button></Col>
            <Col md={6}><Button className="w-100" onClick={reset}>Limpar</Button></Col>
          </Row>
        </Form>
      </Row>
      {vacinas.length > 0 && (
        <Row>
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
              </tr>
            </thead>
            <tbody>
              {vacinas.map((item) => (
                <tr
                  key={item.idvacina}
                  onClick={() => {
                    setIdvacina(item.idvacina);
                    setNome(item.nome);
                  }}
                  onContextMenu={(e) => remove(e, item.idvacina)}
                >
                  <td>{item.idvacina}</td>
                  <td>{item.nome}</td>
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

export default Vacina;
