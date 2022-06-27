export interface AuthResponse {
    ok: boolean;
    id?: string;
    nombre?: string;
    roles: string[];
    apellidop: string;
    apellidom: string;
    token?: string;
    msg?: string;
}