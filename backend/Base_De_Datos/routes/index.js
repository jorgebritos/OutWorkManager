const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const empresasRutas = require("./empresas.js")
const mensajeriaRutas = require("./mensajeria.js")
const usuariosRutas = require("./usuarios.js")

const router = Router();

router.use('/empresas', empresasRutas)
router.use('/mensajeria', mensajeriaRutas)
router.use('/usuarios', usuariosRutas)

module.exports = router;