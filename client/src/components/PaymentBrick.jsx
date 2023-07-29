import React from "react";
import { Payment } from "@mercadopago/sdk-react";
import { initMercadoPago } from "@mercadopago/sdk-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const PaymentBrick = () => {
  initMercadoPago("TEST-ec43da60-8242-44a6-85b4-406179abaa49");

  const navigate = useNavigate();

  const [paymentId, setPaymentId] = useState(null);

  useEffect(() => {
    if (paymentId) {
      navigate(`/screen_status/${paymentId}`);
    }
  }, [paymentId, navigate]);

  const initialization = {
    amount: 10000,
    preferenceId: "<PREFERENCE_ID>"
  };

  const customization = {
    paymentMethods: {
      ticket: "all",
      bankTransfer: "all",
      creditCard: "all",
      debitCard: "all",
      mercadoPago: "all"
    }
  };

  const onSubmit = async ({ selectedPaymentMethod, formData }) => {
    // console.log(formData);
    // callback llamado al hacer clic en el botón enviar datos
    return new Promise((resolve, reject) => {
      fetch("http://localhost:8000/process_payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })
        .then((response) => response.json())
        .then((response) => {
          console.log(response.id);
          console.log(paymentId);
          // recibir el resultado del pago
          resolve();
          setPaymentId(response.id);
          // navigate(`/screen_status/${response.id}`);
        })
        .catch((error) => {
          // manejar la respuesta de error al intentar crear el pago
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
      Callback llamado cuando el Brick está listo.
      Aquí puede ocultar cargamentos de su sitio, por ejemplo.
    */
  };

  return (
    <Payment
      initialization={initialization}
      customization={customization}
      onSubmit={onSubmit}
      onReady={onReady}
      onError={onError}
    />
  );
};

export default PaymentBrick;
