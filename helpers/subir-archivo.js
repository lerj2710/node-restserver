const path = require('path');
const { v4: uuidv4 } = require('uuid');

const subirArchivo = ( files , extensionValida = ['jpg','jpg' ,'png', 'jpeg', 'gif'], carpeta ='' ) =>{
    return new Promise( (resolve, reject)=>{

    //controlar mi archivo de cargas solo img -- validar la extension

    const { archivo } = files;
    const nombreCortado = archivo.name.split('.');
    const extension = nombreCortado[ nombreCortado.length -1 ];

    if( !extensionValida.includes( extension )) {
       return reject(`La extension ${ extension } no es permitida`)
    }
  
    //usar un identificador unico para mis archivos y no tener nombre duplicado
    const nombreTemporal = uuidv4() + '.' + extension; 
    //   este codigo ayuda a subir el archivo 
    const uploadPath = path.join(__dirname, '../uploads/', carpeta, nombreTemporal);

    archivo.mv(uploadPath, function(err) {
    if (err) {
        reject(err);
    }

    resolve(nombreTemporal);
    });
});

}


module.exports = {
    subirArchivo
}