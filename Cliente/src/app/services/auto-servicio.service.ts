import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Autos } from '../menu/Autos';
@Injectable({
  providedIn: 'root'
})
export class AutoServicioService {


  private apiUrl = 'http://localhost:3000'; // URL de tu servidor Node.js

  constructor(private http: HttpClient) {}

  getAutos(): Observable<Autos[]> {
    return this.http.get<Autos[]>(this.apiUrl + '/list');
  }

  getAuto(codigo: number): Observable<Autos> {
    return this.http.get<Autos>(`${this.apiUrl}/${codigo}`);
  }

  addAuto(auto: Autos): Observable<Autos> {
    return this.http.post<Autos>(this.apiUrl, auto);
  }

  updateAuto(auto: Autos): Observable<Autos> {
    return this.http.put<Autos>(`${this.apiUrl}`, auto);
  }

  deleteAuto(codigo: number | undefined): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/?id=${codigo}`);
  }
}
