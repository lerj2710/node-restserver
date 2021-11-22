const { Router }        = require('express');
const { check }         = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

// == controller
const { login } = require('../controllers/auth');


const router = Router();
//=============== Metodo Get  ===============
router.post('/login',[
    check('correo', 'el correo es obligatorio').isEmail(),
    check('password', 'la contraseña es obligatoria').not().isEmpty(),
    validarCampos
], login);



module.exports= router;