const { Router } = require('express');
const { check } = require('express-validator');
const { cargarArchivo, ActulizarImagen } = require('../controllers/uploads');
const { colecionesPermitidas } = require('../helpers');

const { validarCampos } = require('../middlewares');

const router = Router();

router.post('/', cargarArchivo );

router.put('/:coleccion/:id', [
    check('id', 'el id debe de ser un id de mongo').isMongoId(),
    check('coleccion').custom(c => colecionesPermitidas( c , ['usuarios', 'productos'])),
    validarCampos
], ActulizarImagen);



module.exports= router;