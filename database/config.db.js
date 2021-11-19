const mongoose = require('mongoose');


const dbConnection = async ()=>{

try {

    await mongoose.connect(process.env.MONGODB_CNN, {
        
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
        // useCreateIndex :true,
        // useFindAndModify:false

    });

    console.log('base de datos online');

} catch (error) {
    console.log(error);
   throw new Error('fallo la conexion al inicializar la base de datos');
}
}


module.exports= {
    
    dbConnection
};