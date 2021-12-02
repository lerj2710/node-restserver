const Rol = require('../models/role');
const { Usuario , Categoria, Producto } = require('../models');

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
};  
/**
 * 
 * categoria 
 */
  const exiteCategoriaPorId = async( id ) => {

    const exiteCategoria = await Categoria.findById(id);
        if ( !exiteCategoria) {
          throw new Error(`el id no exite ${ id } `)
        };
};
/**
 * 
 * producto s
 */
const exiteProductoPorId = async( id ) => {

  const exiteProducto = await Producto.findById(id);
      if ( !exiteProducto) {
        throw new Error(`el id no existe ${ id } `);
      };
};
module.exports= {
    esRolValido,
    emailExite,
    exitUserId,
    exiteCategoriaPorId,
    exiteProductoPorId
};