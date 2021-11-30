import React, { useContext } from "react";

import { Context } from "../context/AuthContext";
import {ToastBody, ToastHeader, Toast} from "reactstrap";

const Rodape = () => {
  const { errorMessage } = useContext(Context);

  return (
    <>
      {errorMessage && (
        <Toast className="w-100" >
          <ToastHeader icon="danger">ERROR</ToastHeader>
          <ToastBody>{errorMessage}</ToastBody>
        </Toast>
      )}
    </>
  );
};

export default Rodape;
