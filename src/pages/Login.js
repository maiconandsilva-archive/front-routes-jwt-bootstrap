import React, { useState, useContext } from "react";
import Cabecalho from "../components/Cabecalho";
import Rodape from "../components/Rodape";
import { Context } from "../context/AuthContext";

export default function Login() {
  const { handleLogin } = useContext(Context);
  const [mail, setMail] = useState("maria@teste.com");
  const [senha, setSenha] = useState("123456");
  const submeter = (e) => {
    e.preventDefault();
    handleLogin(mail.trim(), senha.trim());
  };

  return (
    <div className="App-container">
      <div className="row">
        <Cabecalho />
      </div>
      <div className="row">
        <h4>Login </h4>
      </div>
      <form onSubmit={submeter}>
        <div className="row">
          <label>e-mail</label>
          <input value={mail} onChange={(e) => setMail(e.target.value)} />
        </div>
        <div className="row">
          <label>Senha</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </div>
        <div className="row">
          <button type="submit">Enviar</button>
        </div>
      </form>
      <div className="row">
        <Rodape />
      </div>
    </div>
  );
}
