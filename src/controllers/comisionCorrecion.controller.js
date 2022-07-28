import { ComisionCorreccion } from "../models/ComisionCorreccionPractica.js"
import { Estudiante } from "../models/Estudiante.js";
import { ProfesorComisionCorrecion } from "../models/ProfesorComisionCorreccion.js";
import { Usuario } from "../models/Usuario.js";

export const createComisionCorreccion = async (req, res) =>{

    try {

        const estudiantes = req.body.data.idEstudiantes;
        const profesores = req.body.data.idProfesores;
        console.log('profesores', profesores);
        // console.log(data[0][2])

        const newComisionCorreccion = await ComisionCorreccion.create({
            estadoDisponible: true
        })

        for(let i = 0; i < estudiantes.length; i++){
            // console.log(estudiantes[i])
            let id_estudiante = estudiantes[i];
            
            let estudiante = await Estudiante.findByPk(id_estudiante);
            
            estudiante.id_comisionCorreccion = newComisionCorreccion.id_comisionCorreccion;
            
            estudiante.estadoDisponibleCC = 'asignado';
            
            await estudiante.save()
            
            // console.log('Se ha añadido un estudiante')

        }

        for(let j = 0; j < profesores.length; j++){
            const id_profesor = profesores[j].idProfesor;
            let profesorCC = await ProfesorComisionCorrecion.findByPk(id_profesor);
            profesorCC.id_comisionCorreccion = newComisionCorreccion.id_comisionCorreccion;
            profesorCC.estadoDisponible = 'asignado';
            profesorCC.secretario = profesores[j].secretario;
            await profesorCC.save()
            console.log('Se ha añadido un profesor')
        }
        
        // data.array.forEach(element => {
        //     element.idEstudiante, console.log('si')
        // });

        return res.status(200).json({ok: true, msg: 'Se ha creado una comision de corrección de práctica.'})
        
        } catch (error) {
            return res.status(500).json({ok: false, msg: error.msg})
        }

}

export const deleteComision = async (req, res)=>{

    try {

        const id = req.params.id;
        console.log('delete comision id:',req.params)

        const comisionBorrar = await ComisionCorreccion.findByPk(id)

        if(!comisionBorrar){
            return res.json({ok:false, msg: 'Comision no existe'});
        }

        let estudiantes = await Estudiante.findAll({
            where: {
                id_comisionCorreccion: comisionBorrar.id_comisionCorreccion
            }
        })

        for(let i = 0; i < estudiantes.length; i++){

            estudiantes[i].id_comisionCorreccion = null;
            estudiantes[i].estadoDisponibleCC = 'disponible';
            
            await estudiantes[i].save()

        }

        let profesores = await ProfesorComisionCorrecion.findAll({
            where: {
                id_comisionCorreccion: comisionBorrar.id_comisionCorreccion
            }
        })

        for(let i = 0; i < profesores.length; i++){

            profesores[i].id_comisionCorreccion = null;
            profesores[i].estadoDisponible = 'disponible';
            await profesores[i].save()
        }

       

        await comisionBorrar.destroy();

        res.json({ok: true, msg: 'Se borró exitósamente la comisión'})

        
    } catch (error) {
        return res.json({ok:false, msg: error.msg})
    }
}

export const getListaComisiones = async (req, res) =>{

    try {

        // console.log('Get lista de comisiones de correccion')

        const comisiones = await ComisionCorreccion.findAll()

        let comisionesArr = [];

        let profesoresArr = [];
        let estudiantesArr = [];

        console.log('Get lista de comisiones de correccion')

        for(let i = 0; i < comisiones.length; i++){

            const profesores = await ProfesorComisionCorrecion.findAll({
                where: {
                    id_comisionCorreccion: comisiones[i].id_comisionCorreccion
                }
            })

            

            for(let o = 0; o < profesores.length; o++ ){
                
                const profesor = await Usuario.findByPk(profesores[o].id_usuario)

                profesoresArr.push({
                    nombre: profesor.nombre,
                    apellidop: profesor.apellidop,
                    apellidom: profesor.apellidom
                })
            }

            

            const estudiantes = await Estudiante.findAll({
                where: {
                    id_comisionCorreccion: comisiones[i].id_comisionCorreccion
                }
            })

            for(let u= 0; u < estudiantes.length; u++ ){
                
                const estudiante = await Usuario.findByPk(estudiantes[u].id_usuario)

                estudiantesArr.push({
                    nombre: estudiante.nombre,
                    apellidop: estudiante.apellidop,
                    apellidom: estudiante.apellidom
                })
            }

            

            comisionesArr.push({
                id_comisionCorreccion: comisiones[i].id_comisionCorreccion,
                profesores: profesoresArr,
                estudiantes: estudiantesArr,
            })

            estudiantesArr = [];
            profesoresArr = [];

        }

        console.log(comisionesArr);

        res.json({ok: true, comisiones: comisionesArr})
        
    } catch (error) {
        res.json({ok: false, msg: error.msg})
    }   

}