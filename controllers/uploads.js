const path = require('path')
const { response } = require("express");
const { subirArchivo } = require('../helpers/subir-archivo');


const cargarArchivo = async (req, res = response)=>{


  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo ) {
    res.status(400).json({ msg: 'no hay archivos que subir.'});
    return;
  }

  const { archivo } = req.files;

const  uploadPath  = path.join( __dirname , '../uploads/' , archivo.name);

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