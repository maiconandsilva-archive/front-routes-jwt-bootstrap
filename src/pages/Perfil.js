import React, { useEffect, useState, useContext } from "react";
import Cabecalho from "../components/Cabecalho";
import Rodape from "../components/Rodape";
import api from "../services/api";
import { Context } from "../context/AuthContext";
import {Col, Container, Form, FormGroup, Input, Row, Button, Table} from "reactstrap";

const Perfil = () => {
  const [idusuario, setIdusuario] = useState("");
  const [perfil, setPerfil] = useState("");
  const [usuarios, setUsuarios] = useState([]);
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
      .get("/usuario/list")
      .then(({ data }) => {
        setErrorMessage("");
        setUsuarios(data.usuarios);
      })
      .catch((e) => setErrorMessage(e.response.data.error[0]));
  };

  const save = (e) => {
    e.preventDefault();
    if (idusuario && perfil) {
      api
        .put("/usuario/update/perfil", { idusuario, perfil })
        .then(() => {
          reset(e);
          list();
        })
        .catch((e) => {
          setErrorMessage(e.response.data.error[0]);
        });
    }
  };

  const reset = (e) => {
    e.preventDefault();
    setIdusuario("");
    setPerfil("");
  };

  return (
    <Container>
      <Row>
        <Cabecalho />
      </Row>
      <Row>
        <h4>Perfil de acesso</h4>
      </Row>
      <Row>
        <Form>
          {idusuario && (
            <FormGroup>
              <label>ID: {idusuario}</label>
            </FormGroup>
          )}
          <FormGroup>
            <label>Perfil</label>
            <Input type="select" value={perfil} onChange={(e) => setPerfil(e.target.value)}>
              <option value=""/>
              <option value="admin">Administrador</option>
              <option value="user">Usuário</option>
            </Input>
          </FormGroup>
          <Row>
            <Col md={6}><Button className="w-100" onClick={save}>Salvar</Button></Col>
            <Col md={6}><Button className="w-100" onClick={reset}>Limpar</Button></Col>
          </Row>
        </Form>
      </Row>
      <Row>
         <Table responsive>
           <thead>
             <tr>
               <th>ID</th>
               <th>e-mail</th>
               <th>Perfil</th>
             </tr>
           </thead>
           <tbody>
             {usuarios.map((item) => (
              <tr
                key={item.idusuario}
                onClick={() => {
                  setIdusuario(item.idusuario);
                  setPerfil(item.perfil);
                }}
              >
                <td>{item.idusuario}</td>
                <td>{item.mail}</td>
                <td>{item.perfil}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Row>
      <Row>
        <Rodape />
      </Row>
    </Container>
  );
};

export default Perfil;
