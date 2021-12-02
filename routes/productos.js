const { Router }  = require('express');
const { check }  = require('express-validator');

//middlewares
const validarJWT  = require('../middlewares/validar-jwt');
const { validarCampos, adminRole } = require('../middlewares');

const { crearProducto,
        obtenerProductos, 
        obtenerProducto,
        actualizarProducto,
        borrarProducto } = require('../controllers/productos');

const { exiteCategoriaPorId, exiteProductoPorId } =require('../helpers/db-validators');


const router = Router();
/**
 * {{url}}/api/productos
 */
//obtener categorias get - publico
router.get('/', obtenerProductos );

//obtener categorias por id - publico
router.get('/:id',[
    check( 'id', 'NO es un id valido de mongo' ).isMongoId(),
    check('id').custom( exiteProductoPorId ),
    validarCampos,
] ,obtenerProducto);

//crear categoria - privado -  cualquier persona con token valido
router.post('/', [
     validarJWT,
     check('nombre', 'el nombre es obligatorio').not().isEmpty(),
     check('categoria', 'no es un id de Mongo').isMongoId(),
     check('categoria').custom( exiteCategoriaPorId ),
     validarCampos
], crearProducto );

// actualizar cualquier token valido - privado
router.put('/:id',[
    validarJWT,
    // check('categoria', 'no es un id de Mongo').isMongoId(),
    check('id').custom( exiteProductoPorId ),
    validarCampos
], actualizarProducto );

//eliminar categoria tipo delete  - admin
router.delete('/:id',[
    validarJWT,
    adminRole,
    check( 'id', 'NO es un id valido de mongo' ).isMongoId(),
    check('id').custom( exiteProductoPorId ),
    validarCampos
], borrarProducto);


module.exports= router;