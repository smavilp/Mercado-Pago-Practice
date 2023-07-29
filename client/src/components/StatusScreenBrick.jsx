import React from "react";
import { StatusScreen } from "@mercadopago/sdk-react";
import { initMercadoPago } from "@mercadopago/sdk-react";
import { useParams } from "react-router-dom";

const StatusScreenBrick = () => {
  initMercadoPago("TEST-ec43da60-8242-44a6-85b4-406179abaa49");

  const { statusId } = useParams();

  console.log(statusId);

  const initialization = {
    paymentId: statusId // id de pago para mostrar
  };

  const onError = async (error) => {
    // callback llamado solicitada para todos los casos de error de Brick
    console.log(error);
  };

  const onReady = async () => {
    /*
      Callback llamado cuando Brick está listo.
      Aquí puede ocultar cargamentos de su sitio, por ejemplo.
    */
  };

  return (
    <StatusScreen
      initialization={initialization}
      onReady={onReady}
      onError={onError}
    />
  );
};

export default StatusScreenBrick;
