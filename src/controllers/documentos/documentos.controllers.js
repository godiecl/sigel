import multer from "multer";
import util from 'util';
import fs from 'fs';
import { InformePractica } from "../../models/documentos/InformePractica.js";

//Contenido practica
export const storagePractica = multer.diskStorage({
    filename: function(res, file, cb){
        const ext = file.originalname.split('.').pop(); //extencion final
        //const fileName = Date.now();
        const fileName="ContenidoPractica"; //que tenga un nombre determinado
        cb(null, `${fileName}.${ext}`); 
        //cb(null,file.originalname);
    },
    destination:function(res,file, cb){
        cb(null,'./public/contenido/practica')
    }
});

//Contenido Capstone
export const storageCapstone = multer.diskStorage({
    filename: function(res, file, cb){
        const ext = file.originalname.split('.').pop();
        //const fileName = Date.now();
        const fileName="ContenidoCapstone"; //que tenga un nombre determinado
        //cb(null,file.originalname);       //nombre original
        cb(null, `${fileName}.${ext}`); 
    },
    destination:function(res,file, cb){
        cb(null,'./public/contenido/capstone')
    }
});

//subir documentos practica estudiante funciona
export const storageDocPracticaEstudiante = multer.diskStorage({
    filename: function(res, file, cb){
        //const ext = file.originalname.split('.').pop();//
        //const fileName = Date.now();
        //const fileName="ContenidoCapstone"; //que tenga un nombre determinado
        cb(null,file.originalname);       //nombre original
        //cb(null, `${fileName}.${ext}`); 
    },
    destination:function(res,file, cb){
        cb(null,'./documentos/practica-estudiante')
    }
    
});

//ver archivos de carpeta practica estudiante
export const getListFilesDocPE = (req, res) => {
    const directoryPath = "./documentos/practica-estudiante";
    fs.readdir(directoryPath, function (err, files) {
      if (err) {
        res.status(500).send({
          message: "Unable to scan files!",
        });
      }
      let fileInfos = [];
      files.forEach((file) => {
        fileInfos.push({
          name: file
        });
      });
      res.status(200).send(fileInfos);
    });
  };

//descargar documentos practica estudiantes
export const downloadDocPE=(req,res,next)=>{
    // console.log('recibiendo: ',req);
    res.download('./documentos/practica-estudiante'+'/'+ req.body.filename);
}

//eliminar documentos practica estudiantes
export const deleteFileDocPE=(req,res)=>{
    const directoryPath = "./documentos/practica-estudiante";
    fs.readdir(directoryPath, function (err, files) {
      if (err) {
        res.status(500).send({
          message: "Unable to scan files!",
        });
      }
      fs.unlink('./documentos/practica-estudiante/'+req.body.filename,(err)=>{
        if(err){
            // console.log(err);
        }
      });
    });
}
//contenido capstone-estudiante
//subir documentos practica estudiante funciona
export const storageDocCapstoneEstudiante = multer.diskStorage({
    filename: function(res, file, cb){
        //const ext = file.originalname.split('.').pop();//
        //const fileName = Date.now();
        //const fileName="ContenidoCapstone"; //que tenga un nombre determinado
        cb(null,file.originalname);       //nombre original
        //cb(null, `${fileName}.${ext}`); 
    },
    destination:function(res,file, cb){
        cb(null,'./documentos/capstone-estudiante')
    }
});

//ver archivos de carpeta Capstone estudiante
export const getListFilesDocCE = (req, res) => {
    const directoryPath = "./documentos/capstone-estudiante";
    fs.readdir(directoryPath, function (err, files) {
      if (err) {
        res.status(500).send({
          message: "Unable to scan files!",
        });
      }
      let fileInfos = [];
      files.forEach((file) => {
        fileInfos.push({
          name: file
        });
      });
      res.status(200).send(fileInfos);
    });
  };

//descargar documentos Capstone estudiantes
export const downloadDocCE=(req,res,next)=>{
    // console.log('recibiendo: ',req);
    res.download('./documentos/capstone-estudiante'+'/'+ req.body.filename);
}

//eliminar documentos Capstone estudiantes
export const deleteFileDocCE=(req,res)=>{
    const directoryPath = "./documentos/capstone-estudiante";
    fs.readdir(directoryPath, function (err, files) {
      if (err) {
        res.status(500).send({
          message: "Unable to scan files!",
        });
      }
      fs.unlink('./documentos/capstone-estudiante/'+req.body.filename,(err)=>{
        if(err){
            // console.log(err);
        }
      });
    });
} 

//-----------------subir documentos practica profesor funciona
export const storageDocPracticaProfesor = multer.diskStorage({
    filename: function(res, file, cb){
        //const ext = file.originalname.split('.').pop();//
        //const fileName = Date.now();
        //const fileName="ContenidoCapstone"; //que tenga un nombre determinado
        cb(null,file.originalname);       //nombre original
        //cb(null, `${fileName}.${ext}`); 
    },
    destination:function(res,file, cb){
        cb(null,'./documentos/practica-profesor')
    }
});

//ver archivos de carpeta practica profesor
export const getListFilesDocPP = (req, res) => {
    const directoryPath = "./documentos/practica-profesor";
    fs.readdir(directoryPath, function (err, files) {
      if (err) {
        res.status(500).send({
          message: "Unable to scan files!",
        });
      }
      let fileInfos = [];
      files.forEach((file) => {
        fileInfos.push({
          name: file
        });
      });
      res.status(200).send(fileInfos);
    });
  };

//descargar documentos practica profesor
export const downloadDocPP=(req,res,next)=>{
    // console.log('recibiendo: ',req);
    res.download('./documentos/practica-profesor'+'/'+ req.body.filename);
}

//eliminar documentos practica profesor
export const deleteFileDocPP=(req,res)=>{
    const directoryPath = "./documentos/practica-profesor";
    fs.readdir(directoryPath, function (err, files) {
      if (err) {
        res.status(500).send({
          message: "Unable to scan files!",
        });
      }
      fs.unlink('./documentos/practica-profesor/'+req.body.filename,(err)=>{
        if(err){
            // console.log(err);
        }
      });
    });
}
//contenido capstone-estudiante
//subir documentos practica estudiante funciona
export const storageDocCapstoneProfesor = multer.diskStorage({
    filename: function(res, file, cb){
        //const ext = file.originalname.split('.').pop();//
        //const fileName = Date.now();
        //const fileName="ContenidoCapstone"; //que tenga un nombre determinado
        cb(null,file.originalname);       //nombre original
        //cb(null, `${fileName}.${ext}`); 
    },
    destination:function(res,file, cb){
        cb(null,'./documentos/capstone-profesor')
    }
});

//ver archivos de carpeta Capstone estudiante
export const getListFilesDocCP = (req, res) => {
    const directoryPath = "./documentos/capstone-profesor";
    fs.readdir(directoryPath, function (err, files) {
      if (err) {
        res.status(500).send({
          message: "Unable to scan files!",
        });
      }
      let fileInfos = [];
      files.forEach((file) => {
        fileInfos.push({
          name: file
        });
      });
      res.status(200).send(fileInfos);
    });
  };

//descargar documentos Capstone estudiantes
export const downloadDocCP=(req,res,next)=>{
    // console.log('recibiendo: ',req);
    res.download('./documentos/capstone-profesor'+'/'+ req.body.filename);
}

//eliminar documentos Capstone estudiantes
export const deleteFileDocCP=(req,res)=>{
    const directoryPath = "./documentos/capstone-profesor";
    fs.readdir(directoryPath, function (err, files) {
      if (err) {
        res.status(500).send({
          message: "Unable to scan files!",
        });
      }
      fs.unlink('./documentos/capstone-profesor/'+req.body.filename,(err)=>{
        if(err){
            // console.log(err);
        }
      });
    });
} 
//Informe estudiante práctica
//subir documentos práctica estudiante funciona
export const storageInformePractica = multer.diskStorage({  
  filename: function(res, file, cb){
      // const ext = file.originalname.split('.').pop();//
      // const fileName = Date.now();
      //const fileName="ContenidoCapstone"; //que tenga un nombre determinado
      cb(null,file.originalname);       //nombre original
      // cb(null, `${fileName}.${ext}`); 
  },
  destination:function(res,file, cb){
    const ubicacion =  './documentos/informe-practica';
      cb(null,ubicacion)
  }
});

//ver archivos de carpeta Capstone estudiante
export const getListFilesInformeEstudiante = (req, res) => {
  const directoryPath = "./documentos/informe-practica";
  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      res.status(500).send({
        message: "Unable to scan files!",
      });
    }
    let fileInfos = [];
    files.forEach((file) => {
      fileInfos.push({
        name: file
      });
    });
    res.status(200).send(fileInfos);
  });
};

//descargar documentos Capstone estudiantes
export const downloadInformeEstudiante=(req,res,next)=>{
  // console.log('recibiendo: ',req);
  res.download('./documentos/informe-practica'+'/'+ req.body.filename);
}

//eliminar documentos Capstone estudiantes
export const deleteFileInformeEstudiante=(req,res)=>{
  const directoryPath = "./documentos/informe-practica";
  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      res.status(500).send({
        message: "Unable to scan files!",
      });
    }
    fs.unlink('./documentos/informe-practica/'+req.body.filename,(err)=>{
      if(err){
          // console.log(err);
      }
    });
  });
} 
