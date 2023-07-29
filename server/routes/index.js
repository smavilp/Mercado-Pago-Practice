const mercadoPagoRoutes = require("./mercadoPago.routes");

const apiRoutes = (app) => {
  app.use(mercadoPagoRoutes);
};

module.exports = apiRoutes;
