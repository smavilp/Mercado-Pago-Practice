import React from "react";
import { Wallet } from "@mercadopago/sdk-react";
import { initMercadoPago } from "@mercadopago/sdk-react";

const WalletBrick = () => {
  initMercadoPago("TEST-ec43da60-8242-44a6-85b4-406179abaa49");

  const onSubmit = async (formData) => {
    // callback llamado al hacer clic en Wallet Brick
    // esto es posible porque el Brick es un botón
    // en este momento del envío, debe crear la preferencia
    const yourRequestBodyHere = {
      items: [
        {
          id: "202809963",
          title: "Dummy title",
          description: "Dummy description",
          quantity: 1,
          unit_price: 10
        }
      ],
      purpose: "wallet_purchase"
    };
    return new Promise((resolve, reject) => {
      fetch("http://localhost:8000/create_preference", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(yourRequestBodyHere)
      })
        .then((response) => response.json())
        .then((response) => {
          // resolver la promesa con el ID de la preferencia
          resolve(response.preference_id);
        })
        .catch((error) => {
          // manejar la respuesta de error al intentar crear preferencia
          reject();
        });
    });
  };

  const onError = async (error) => {
    // callback llamado para todos los casos de error de Brick
    console.log(error);
  };

  const onReady = async () => {
    /*
      Callback llamado cuando Brick está listo.
      Aquí puedes ocultar loadings de su sitio, por ejemplo.
    */
  };
  return <Wallet onSubmit={onSubmit} onReady={onReady} onError={onError} />;
};

export default WalletBrick;
