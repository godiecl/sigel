export interface User{
    
    _id: number,
    rut: string,    
    correo: string,
    nombre: string,
    apellidop: string,
    apellidom: string,
    password?: string,
    cpassword?: string,
    rol: string,
}