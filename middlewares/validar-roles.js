const { response } = require("express");



const adminRole = (req, res= response, next)=>{

    if(!req.usuario){
        return res.status(500).json({
            msg: 'se quiere verificar el role sin obtener un token primero'
        })
    }
    const { rol, nombre }= req.usuario;
    if( rol !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: `${ nombre } no es administrador -- NO esta autorizado`
        });
    }
    next()
}


module.exports= {
    adminRole
};