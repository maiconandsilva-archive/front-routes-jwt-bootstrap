import React, { useContext } from "react";

import { Context } from "../context/AuthContext";
import {Nav, Navbar, NavItem, NavLink} from "reactstrap";
import { useLocation } from 'react-router-dom';

const Cabecalho = () => {
  const location = useLocation();
  const { profile, handleLogout, redirect } = useContext(Context);

  console.log(location.pathname)

  return (
    <div>
      <h1>Cadastro de vacinas</h1>
      {profile && (
        <Navbar color="dark" expand="md" container={true} light>
          <Nav pills>
            <NavItem><NavLink onClick={handleLogout}>Logout</NavLink></NavItem>
            <NavItem>
              <NavLink onClick={() => redirect("/registro")} active={location.pathname === "/registro"}>
                Registro
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={() => redirect("/usuario")} active={location.pathname === "/usuario"}>
                Seus dados
              </NavLink>
            </NavItem>
            {profile === "admin" && (
              <>
                <NavItem><NavLink onClick={() => redirect("/perfil")} active={location.pathname === "/perfil"}>Perfil</NavLink></NavItem>
                <NavItem><NavLink onClick={() => redirect("/vacina")} active={location.pathname === "/vacina"}>Vacina</NavLink></NavItem>
              </>
            )}
          </Nav>
        </Navbar>
      )}
    </div>
  );
};

export default Cabecalho;
