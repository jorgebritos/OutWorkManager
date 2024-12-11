const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const empresasRutas = require("./enterprises.js")
const mensajeriaRutas = require("./chats.js")
const usuariosRutas = require("./users.js")

const router = Router();

router.use('/empresas', empresasRutas)
router.use('/mensajeria', mensajeriaRutas)
router.use('/usuarios', usuariosRutas)

module.exports = router;