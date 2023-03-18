import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PersonasService {
  private apiUrl = 'http://api.example.com/users';

  constructor(private _http: HttpClient) {}

  public getSkillsByPersonaId(id: number) {
    return this._http
      .get<any>(
        environment.apiUrl + environment.personas.getSkillsByPersonaId + id
      )
      .pipe(
        map((lista) => {
          const retorno = lista;
          return retorno;
        })
      );
  }

  public getPersonas(data: any) {
    return this._http
      .post<any>(environment.apiUrl + environment.personas.getPersonas, data)
      .pipe(
        map((lista) => {
          const retorno = lista;
          return retorno;
        })
      );
  }

  getUserssss(): Observable<any[]> {
    return this._http.get<any[]>(this.apiUrl);
  }

  getUser(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this._http.get<any>(url);
  }

  addUser(user: any): Observable<any> {
    return this._http.post<any>(this.apiUrl, user);
  }

  updateUser(user: any): Observable<any> {
    const url = `${this.apiUrl}/${user.id}`;
    return this._http.put<any>(url, user);
  }

  deleteUser(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this._http.delete<any>(url);
  }
}
