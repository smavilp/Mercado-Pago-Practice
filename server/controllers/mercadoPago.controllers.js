const mercadopago = require("mercadopago");

const processPayment = async (req, res) => {
  const paymentData = req.body;

  mercadopago.configurations.setAccessToken(
    "TEST-8724617724714809-072711-7967a67e9d7d60a3de7df9f6e0f6292e-418532500"
  ); //Access Token del vendedor asociado a la app, para conseguirlo debe seguir las instrucciones sobre OAuth. En este caso específico, ingrese al siguiente link con una cuenta difetente a la de integración: https://auth.mercadopago.com/authorization?client_id=8724617724714809&response_type=code&platform_id=mp&state=1&redirect_uri=https://mcvtest.com/auth_mercado_pago. Y a la página que redirige tome el token del parámetro CODE de la url y siga las instrucciones de OAuth.

  //Procesar pago con Efecty

  if (paymentData.payment_method_id === "efecty") {
    paymentData.metadata = { payment_mode: "online" };
    mercadopago.payment
      .create(paymentData)
      .then(function (response) {
        const { status, status_detail, id } = response.body;
        res.status(response.status).json({ status, status_detail, id });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  //Procesar pago con PSE

  if (paymentData.payment_method_id === "pse") {
    paymentData.description = "Descripción del producto";
    paymentData.additional_info = {
      ip_address: "190.29.251.21" //!¿Cómo obtener esta información de manera dinámica?
    };
    paymentData.callback_url = "http://google.com";
    mercadopago.payment
      .save(paymentData)
      .then(function (response) {
        res.status(response.status).json({
          status: response.body.status,
          status_detail: response.body.status_detail,
          id: response.body.id
        });
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
        res.status(error.status).send(error);
      });
  }

  if (paymentData.payment_method_id === "mercadoPago")
    //Procesar pago de tarjeta de crédito

    mercadopago.payment
      .save(paymentData)
      .then(function (response) {
        const { status, status_detail, id } = response.body;
        res.status(response.status).json({ status, status_detail, id });
        console.log(response);
      })
      .catch(function (error) {
        console.error(error);
      });
};

const createPreference = (req, res) => {
  mercadopago.configure({
    access_token:
      "APP_USR-8724617724714809-071917-e17bfdb5b800bc02ae553ca4da731118-548355142"
  });

  // let preference = {
  //   // el "purpose": "wallet_purchase" solo permite pagos registrados
  //   // para permitir pagos de guests puede omitir esta propiedad
  //   // purpose: "wallet_purchase",
  //   items: [
  //     {
  //       id: "item-ID-1234",
  //       title: "Meu produto",
  //       quantity: 1,
  //       unit_price: 75.76
  //     }
  //   ]
  // };

  mercadopago.preferences
    .create(req.body)
    .then(function (response) {
      // Este valor es el ID de preferencia que se enviará al Brick al inicio
      const preferenceId = response.body.id;
    })
    .catch(function (error) {
      console.log(error);
    });
};

module.exports = {
  processPayment,
  createPreference
};
