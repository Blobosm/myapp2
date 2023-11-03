import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { usuario } from '../modelo/usuario';
import { alumnos } from '../modelo/aluumnos';

@Injectable({
  providedIn: 'root'
})
export class ConsumoAPIService {
  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) }

  url: string = 'http://127.0.0.1:5000/';

  public login(usuario: string, pass: string): Observable<HttpResponse<usuario>> {
    const body = {
      user: usuario,
      password: pass
    };

    return this.http.post<usuario>(this.url + "login", body, { ...this.httpOptions, observe: 'response' });
  }

  public obtenerCursosPorProfesor(profesorId: number): Observable<any> {
    return this.http.get<any>(this.url + 'profesores/' + profesorId + '/cursos', this.httpOptions);
  }

  public obtenerAlumnosPorCurso(profesorId: number, cursoId: number): Observable<alumnos[]> {
    return this.http.get<alumnos[]>(this.url + 'profesores/' + profesorId + '/cursos/' + cursoId + '/alumnos', this.httpOptions);
  }
  public obtenerAlumnos(Alumnoid: number, cursoId: number): Observable<alumnos[]> {
    const url = `URL_DEL_SERVICIO_API_AQUI`; // Reemplaza con la URL de tu servicio API
    return this.http.get<alumnos[]>(`${url}/profesores/${Alumnoid}/cursos/${cursoId}/alumnos`);
  }

  
  

  


  constructor(private http: HttpClient) {
  }
}
