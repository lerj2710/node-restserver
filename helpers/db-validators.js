const Rol     = require('../models/role');
const Usuario = require('../models/usuario');

//extraer un rol valido de la base de datos
const esRolValido = async(rol='')=>{
    const exiteRol = await Rol.findOne({ rol });
    if (!exiteRol) {
        throw new Error(`el rol ${ rol } no esta registrado en base de datos`)
    }
};

  //utenticar correo duplicado
  const emailExite = async (correo ='')=>{

      const exiteEmail = await Usuario.findOne({ correo });
          if (exiteEmail) {
            throw new Error(`el correo: ${ correo } ya se registrado`)
          }
  };
    // identicar si el usuario tiene un id
  const exitUserId = async ( id )=>{

    const exitUser = await Usuario.findById(id);
        if ( !exitUser) {
          throw new Error(`el id: ${ id } no exite`)
        }
}

module.exports= {
    esRolValido,
    emailExite,
    exitUserId
};