const { Router }  = require('express');
const { check }  = require('express-validator');

//middlewares
const validarJWT  = require('../middlewares/validar-jwt');
const { validarCampos, adminRole } = require('../middlewares');

const { crearCategoria,
     obtenerCategorias, 
     obtenerCategoria,
     actualizarCategoria,
     borrarCategoria
} = require('../controllers/categorias');
const { exiteCategoriaPorId } =require('../helpers/db-validators');


const router = Router();

//obtener categorias get - publico
router.get('/', obtenerCategorias );

//obtener categorias por id - publico
router.get('/:id',[
    check( 'id', 'NO es un id valido de mongo' ).isMongoId(),
    check('id').custom( exiteCategoriaPorId ),
    validarCampos,
] ,obtenerCategoria);

//crear categoria - privado -  cualquier persona con token valido
router.post('/', [
     validarJWT,
     check('nombre', 'el nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria );

// actualizar cualquier token valido - privado
router.put('/:id',[
    validarJWT,
    check('nombre', 'el nombre es obligatorio').not().isEmpty(),
    check('id').custom( exiteCategoriaPorId ),
    validarCampos,
], actualizarCategoria );

//eliminar categoria tipo delete  - admin
router.delete('/:id',[
    validarJWT,
    adminRole,
    check( 'id', 'NO es un id valido de mongo' ).isMongoId(),
    check('id').custom( exiteCategoriaPorId ),
    validarCampos
], borrarCategoria);


module.exports= router;