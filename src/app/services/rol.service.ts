import { Injectable } from '@angular/core';
import { Rol } from '../models/rol.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { AutenticacionService } from './autenticacion.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class RolService {
  rolURL = `${environment.apiURL}/rol`;

  constructor(
    private http: HttpClient,
    private autenticacioService: AutenticacionService
  ) { }

  obtenerRolesUsuarioConectado(): Rol[] {
    const roles = JSON.parse(localStorage.getItem('roles'));
    if (!roles) {
      this.autenticacioService.cerrarSesion();
      Swal.fire('Algo salió mal. Por favor vuelva a iniciar sesión');
    } else {
      return roles;
    }
  }

  cargarRolSeleccionado(): Rol {
    return JSON.parse(localStorage.getItem('rolSeleccionado'));
  }

  obtenerRolUsuario(idRol: number, idUsuario: number): Observable<Rol> {
    const url = `${environment.apiURL}/rol-usuario/${idRol}/${idUsuario}`;

    return this.http.get<Rol>(url);
  }

  obtenerRoles(
    skip: number,
    take: number,
    termino: string = ''
  ): Observable<{ roles: Rol[], total: number }> {
    const url = `${this.rolURL}?skip=${skip}&take=${take}&termino=${termino}`;

    return this.http.get<{ roles: Rol[], total: number }>(url);
  }

  obtenerRol(id: number): Observable<Rol> {
    const url = `${this.rolURL}/${id}`;

    return this.http.get<Rol>(url);
  }

  crearRol(rol: Rol): Observable<{ mensaje: string }> {
    return this.http.post<{mensaje: string}>(this.rolURL, rol);
  }

  actualiarRol(id: number, rol: Rol): Observable<{ mensaje: string }> {
    const url = `${this.rolURL}/${id}`;

    return this.http.put<{ mensaje: string }>(url, rol);
  }

  eliminarRol(id: number): Observable<{ mensaje: string }> {
    const url = `${this.rolURL}/${id}`;

    return this.http.delete<{ mensaje: string }>(url);
  }
}
