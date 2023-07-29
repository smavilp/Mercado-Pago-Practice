const { Router } = require("express");
const {
  processPayment,
  createPreference
} = require("../controllers/mercadoPago.controllers");

const router = Router();

router.post("/process_payment", processPayment); //A este endpoint se deben dirigir las solicitudes desdel el frontend
router.post("/create_preference", createPreference);
module.exports = router;
