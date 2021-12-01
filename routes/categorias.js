const { Router, response }  = require('express');
const { check }  = require('express-validator');

const validarJWT  = require('../middlewares/validar-jwt');
// const validarJWT = require('../middlewares/validar-jwt');


const router = Router();

//obtener categorias get - publico
router.get('/', (req, res)=>{
        res.json('get ')
});

//obtener categorias por id - publico
router.get('/:id', (req, res)=>{
    res.json('get id')
});

//crear categoria - privado -  cualquier persona con token valido
router.post('/', [ validarJWT ], (req, res = response)=>{
    res.json('post')
});

// actualizar categoria - privado
router.put('/:id', (req, res)=>{
    res.json('put')
});

//eliminar categoria tipo delete  - admin
router.delete('/:id', (req, res)=>{
    res.json('delete')
});


module.exports= router;