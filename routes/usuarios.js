const { Router }        = require('express');
const { check }         = require('express-validator');


const { validarCampos } = require('../middlewares/validar-campos');
const { esRolValido, emailExite } = require('../helpers/db-validators');


const { usuariosGet,
        usuariosPost,
        usuariosPut,
        usuariosPatch,
        usuariosDelete
} = require('../controllers/usuarios');

const router = Router();
//=============== Metodo Get  ===============
router.get('/', usuariosGet);

//=============== Metodo Post  ===============
router.post('/', [

    //MIDDELWARES DEL POST PERSONALIZADOS
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','El password debe tener mas de 6 campos').isLength({ min: 6}),
    check('correo').custom( emailExite ),
    // check('rol','rol no valido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom( esRolValido )  ,
    validarCampos   
],usuariosPost );

//=============== Metodo Put  ===============
router.put('/:id', usuariosPut);

//=============== Metodo Patch  ==============
router.patch('/', usuariosPatch);

//=============== Metodo Delete  =============
router.delete('/', usuariosDelete   );


module.exports= router;