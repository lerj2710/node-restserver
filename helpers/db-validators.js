const Rol = require('../models/role');


const esRolValido = async(rol='')=>{
    const exiteRol = await Rol.findOne({ rol });
    if (!exiteRol) {
        throw new Error(`el rol ${ rol } no esta registrado en base de datos`)
    }
}

module.exports= {
    esRolValido
};