export interface User{
    
    id: number,
    nombre: string,
    apellidop: string,
    apellidom: string,
    rut: string,
    password?: string,    
    correo: string,
    cpassword?: string,
    roles: string[],
    estado?: boolean
}