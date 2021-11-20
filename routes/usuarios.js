const { Router }        = require('express');
const { check }         = require('express-validator');
const Rol = require('../models/role');

const { validarCampos } = require('../middlewares/validar-campos');


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
    check('correo','No es un correo valido').isEmail(),
    // check('rol','rol no valido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom( async(rol='')=>{
        const exiteRol = await Rol.findOne({ rol });
        if (!exiteRol) {
            throw new Error(`el rol ${ rol } no esta registrado en base de datos`)
        }
    })  ,
    validarCampos   
],usuariosPost );

//=============== Metodo Put  ===============
router.put('/:id', usuariosPut);

//=============== Metodo Patch  ==============
router.patch('/', usuariosPatch);

//=============== Metodo Delete  =============
router.delete('/', usuariosDelete   );


module.exports= router;