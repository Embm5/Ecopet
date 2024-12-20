import { Client } from "./user"

export interface Pet {
    IDMascota?: string,
    Nombre: string,
    Edad: number,
    Especie: string,
    Raza: string,
    Color: string,
    Tamanio: number,
    Peso: number,
    personId: number,
}
export interface Pet2 {
    mascotaId?: number,
    Nombre: string,
    Edad: number,
    Especie: string,
    Raza: string,
    Color: string,
    Tamanio: number,
    Peso: number,
    cedula: number,
    createdAt?: string,
    updatedAt?: string,
    Client: Client
}
export interface msg {
    mgs: string
}