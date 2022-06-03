export interface User{
    
    _id: number,
    nombre: string,
    apellidop: string,
    apellidom: string,
    rut: string,
    password?: string,    
    correo: string,
    cpassword?: string,
    rol: string,
}