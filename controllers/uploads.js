const path = require('path')
const { v4: uuidv4 } = require('uuid');
const { response } = require("express");
const { subirArchivo } = require('../helpers/subir-archivo');


const cargarArchivo = async (req, res = response)=>{


  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo ) {
    res.status(400).json({ msg: 'no hay archivos que subir.'});
    return;
  }

  const { archivo } = req.files;
  const nombreCortado = archivo.name.split('.');  
  const extension = nombreCortado[ nombreCortado.length - 1 ];

  //====== validar la extension ===
  const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];

    if(!extensionesValidas.includes(extension)){
      return res.status(400).json({
        msg: `la extensiom ${ extension } no es valida. - extensiones validas son ${ extensionesValidas}` 
      })
    }
    
const nombreTemp = uuidv4() + '.' + extension ; 
const  uploadPath  = path.join( __dirname , '../uploads/' , nombreTemp );

  archivo.mv(uploadPath, (err) => {
    if (err) {
      return res.status(500).json({ err });
    }

    res.json({ msg: 'File uploaded to ' + uploadPath });
  });

};


module.exports={
cargarArchivo
};