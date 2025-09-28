import React, { useState, useEffect } from "react";
import NavbarPro from "../componentes/Navbar";
import axios from "axios";
import CardNotificacao from "../../componentes/CardNotificacao";

const ProNotification = () => {

  return (
    <>
      <NavbarPro caminho={"/profissional/dashboard"} />

      <CardNotificacao roleId={1} />
    </>
  );
};

export default ProNotification;
