import { User } from "../interfaces/user.interface";

export class UserModel implements User {
    id: number;
    nombre: string;
    apellidop: string;
    apellidom: string;
    rut: string;
    correo: string;
    roles: string[] = [];

    constructor(data: User){

            this.id = data.id;
            this.nombre = data.nombre;
            this.apellidop = data.apellidop;
            this.apellidom = data.apellidom;
            this.rut = data.rut;
            this.correo = data.correo;

    }
}