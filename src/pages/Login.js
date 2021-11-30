import React, { useState, useContext } from "react";
import Cabecalho from "../components/Cabecalho";
import Rodape from "../components/Rodape";
import { Context } from "../context/AuthContext";
import {Button, Col, Container, Form, FormGroup, Input, Label, Row} from "reactstrap";

export default function Login() {
  const { handleLogin } = useContext(Context);
  const [mail, setMail] = useState("maria@teste.com");
  const [senha, setSenha] = useState("123456");
  const submeter = (e) => {
    e.preventDefault();
    handleLogin(mail.trim(), senha.trim());
  };

  return (
    <Container>
      <Row>
        <Cabecalho />
      </Row>
      <Row>
        <Form>
          <Row><h4>Login </h4></Row>
          <FormGroup>
            <Label for="email">E-mail</Label>
            <Input
              id="email"
              name="email"
              placeholder="example@email.com"
              type="email"
              value={mail} onChange={(e) => setMail(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Senha</Label>
            <Input
              id="password"
              name="password"
              placeholder="Senha forte"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </FormGroup>
          <Row>
            <Col><Button className="w-100" onClick={submeter}>Enviar</Button></Col>
          </Row>
        </Form>
      </Row>
      <Row className="p-2">
        <Col>
          <Rodape />
        </Col>
      </Row>
    </Container>
  );
}
