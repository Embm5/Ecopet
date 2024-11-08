import { Credential } from "./credenciales"
export interface Persona {
    cedula: number,
    Primer_nombre: string,
    Segundo_nombre: string,
    Primer_Apellido: string,
    Segundo_Apellido: string,
    IdRol: number
    email: string,
    password: string,
    createdAt?: string,
    updatedAt?: string
    Credential?: Credential
}