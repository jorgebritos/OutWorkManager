const { Router } = require("express");
const router = Router();
const mensajeriaControlador = require('../Controladores/mensajeriaControlador.js');

router.get('/', mensajeriaControlador.getChats);

router.post('/', mensajeriaControlador.postChats);

//no se si hace falta
// router.get('/:id', mensajeriaControlador.getChatByID);

//editar
router.put('/:id', mensajeriaControlador.putChats);

//puede servir
router.delete('/:id', mensajeriaControlador.deleteChat)

module.exports = router