import React from "react";
import { Router } from "react-router-dom";
import "normalize.css/normalize.css"
import "./App.css";

import Routes from "./router/routes";
import history from "./router/history";

import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
      <div className="App">
        <AuthProvider>
          <Router history={history}>
            <Routes />
          </Router>
        </AuthProvider>
      </div>
  );
}

export default App;
