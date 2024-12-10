const { Router } = require("express");
const router = Router();
const empresasControlador = require('../Controladores/empresasControlador.js');

router.get('/', empresasControlador.getEnterprise);

router.post('/', empresasControlador.postEnterprise);

router.get('/:id', empresasControlador.getEnterpriseByID);

//editar
router.put('/:id', empresasControlador.putEnterprise);

router.delete('/:id', empresasControlador.deleteEnterprise)

module.exports = router