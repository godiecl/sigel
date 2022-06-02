import { User } from "../interfaces/user.interface";

export class UserModel implements User {
    _id: number;
    rut: string;
    correo: string;
    nombre: string;
    apellidop: string;
    apellidom: string;
    rol: string;

    constructor(data: User){

            this._id = 0;
            this.rut = data.rut;
            this.correo = data.correo;
            this.nombre = data.nombre;
            this.apellidop = data.apellidop;
            this.apellidom = data.apellidom;
            this.rol = data.rol;

    }
}