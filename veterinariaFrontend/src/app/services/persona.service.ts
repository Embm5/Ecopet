import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Persona } from '../interfaces/persona';
import { msg } from '../interfaces/pet';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  private myAppUrl: string
  private myApiUrl: string
  constructor(private http: HttpClient) {
    this.myAppUrl = environment.appUrl || 'http://localhost:3000/'
    this.myApiUrl = 'api/client'
  }

  getAllPerson(): Observable<Persona[] | msg> {
    return this.http.get<Persona[] | msg>(`${this.myAppUrl}${this.myApiUrl}/`)
  }

  getById(cedula: string): Observable<Persona> {
    return this.http.get<Persona>(`${this.myAppUrl}${this.myApiUrl}/${cedula}`)
  }

  updatePersona(id: string, Persona: Persona): Observable<void> {
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}/${id}`, Persona)
  }

  agregar(Persona: Persona): Observable<Persona[]> {
    return this.http.post<Persona[]>(`${this.myAppUrl}${this.myApiUrl}/`, Persona)
  }

  deletePerson(cedula: string): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/${cedula}`)
  }
}
