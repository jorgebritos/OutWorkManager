const { Router } = require("express");
const router = Router();
const usuariosControlador = require('../Controladores/usuariosControlador.js');

router.get('/', usuariosControlador.getUser);

router.post('/', usuariosControlador.postUser);

router.get('/:id', usuariosControlador.getUserByID);

router.put('/:id', usuariosControlador.putUser);

router.delete('/:id', usuariosControlador.deleteUser)

module.exports = router