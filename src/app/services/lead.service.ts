import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Lead } from '../models/lead';



@Injectable({
  providedIn: 'root'
})
export class LeadService {

  private baseUrl = `${environment.apiUrl}/leads`;


  constructor(private http: HttpClient) { }

  get token(): string {
      return localStorage.getItem('token') || '';
    }
  
    get headers() {
      return {
        headers: {
          'x-token': this.token
        }
      }
    }

  // 1. Obtener todos los leads (admite opcionalmente filtrar por status)
  obtenerLeads(status?: string): Observable<{ ok: boolean, total: number, leads: Lead[] }> {
    const url = status ? `${this.baseUrl}?status=${status}` : this.baseUrl;
    return this.http.get<{ ok: boolean, total: number, leads: Lead[] }>(url);
  }

  // 2. Obtener un lead por su ID único
  obtenerLeadPorId(id: string): Observable<{ ok: boolean, lead: Lead }> {
    return this.http.get<{ ok: boolean, lead: Lead }>(`${this.baseUrl}/${id}`);
  }

  // 3. Disparar el flujo de aprobación interna hacia producción
  aprobarLead(id: string): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/aprobar/${id}`, {});
  }
}
