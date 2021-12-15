const { Router } = require('express');
const { check } = require('express-validator');
const { cargarArchivo, ActulizarImagen, mostrarImagen } = require('../controllers/uploads');
const { colecionesPermitidas } = require('../helpers');

const { validarCampos, validarArchivoSubir } = require('../middlewares');

const router = Router();

router.post('/', cargarArchivo );

router.put('/:coleccion/:id', [
    validarArchivoSubir,
    check('id', 'el id debe de ser un id de mongo').isMongoId(),
    check('coleccion').custom(c => colecionesPermitidas( c , ['usuarios', 'productos'])),
    validarCampos
], ActulizarImagen);

router.get('/:coleccion/:id',[
    check('id', 'el id debe de ser un id de mongo').isMongoId(),
    check('coleccion').custom(c => colecionesPermitidas( c , ['usuarios', 'productos'])),
    validarCampos
], mostrarImagen);



module.exports= router;