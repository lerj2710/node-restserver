const { Router }        = require('express');
const { check }         = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

// == controller
const { login, googleSignin } = require('../controllers/auth');


const router = Router();
//=============== Metodo Post  ===============
router.post('/login',[
    check('correo', 'el correo es obligatorio').isEmail(),
    check('password', 'la contraseña es obligatoria').not().isEmpty(),
    validarCampos
], login);

//=============== Google Signin Post  ===============
router.post('/google',[
    check('id_token', 'el id_token es necesrario').not().isEmpty(),
    validarCampos
], googleSignin );


module.exports= router;