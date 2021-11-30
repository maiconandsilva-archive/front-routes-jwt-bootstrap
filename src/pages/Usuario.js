import React, { useState, useContext } from "react";
import Cabecalho from "../components/Cabecalho";
import api from "../services/api";
import { Context } from "../context/AuthContext";
import Rodape from "../components/Rodape";
import {Container, Form, FormGroup, Row, Button, InputGroup, Input} from "reactstrap";

const Usuario = () => {
  const [mail, setMail] = useState("");
  const [senha, setSenha] = useState("");
  const { setErrorMessage } = useContext(Context);

  const updateMail = (e) => {
    e.preventDefault();
    api
      .put("/usuario/update/mail", { mail: mail.trim() })
      .then(({ data }) => {
        if (data.idusuario) {
          setErrorMessage("e-mail atualizado");
        }
      })
      .catch((e) => {
        setErrorMessage(e.response.data.error[0]);
      });
  };

  const updateSenha = (e) => {
    e.preventDefault();
    api
      .put("/usuario/update/senha", { senha: senha.trim() })
      .then(({ data }) => {
        if (data.idusuario) {
          setErrorMessage("Senha atualizada");
        }
      })
      .catch((e) => {
        setErrorMessage(e.response.data.error[0]);
      });
  };

  return (
    <Container>
      <Row>
        <Cabecalho />
      </Row>
      <Row>
        <h3>Seus dados de acesso</h3>
      </Row>
      <Row>
        <Form>
          <FormGroup>
            <label>e-mail</label>
            <InputGroup>
              <Input value={mail} onChange={(e) => setMail(e.target.value)} />
              <Button onClick={updateMail}>Alterar</Button>
            </InputGroup>
          </FormGroup>
          <FormGroup>
            <label>Senha</label>
            <InputGroup>
              <Input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
              <Button onClick={updateSenha}>Alterar</Button>
            </InputGroup>
          </FormGroup>
        </Form>
      </Row>
      <Row>
        <Rodape />
      </Row>
    </Container>
  );
};

export default Usuario;
