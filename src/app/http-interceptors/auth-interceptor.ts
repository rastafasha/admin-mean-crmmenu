import { HttpRequest, HttpHandlerFn, HttpEvent, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const router = inject(Router);
  
  let headers = new HttpHeaders();
  
  if (localStorage.getItem('auth_token')) {
    headers = headers.append('Accept', 'application/json')
      .append('Authorization', 'Bearer ' + localStorage.getItem('auth_token'));
  } else {
    headers = headers.append('Accept', 'application/json');
  }

  return next(req.clone({ headers })).pipe(
    catchError((error: HttpErrorResponse) => {
      // 401: Token vencido o inválido
      // 403: No tienes permisos
      if (error.status === 401 || error.status === 403) {
        // 1. Borramos el token para evitar bucles
        localStorage.removeItem('token');
        localStorage.removeItem('dark');
        localStorage.removeItem('user'); // Si guardas el usuario, bórralo también

        // 2. Mostrar un mensaje antes de redirigir
        Swal.fire({
          title: 'Sesión expirada',
          text: 'Tu sesión ha vencido, por favor inicia sesión nuevamente.',
          icon: 'warning',
          confirmButtonText: 'Ir al Login'
        }).then(() => {
          // 3. Redirigir al login
          router.navigate(['/login']);
        });
      }

      return throwError(() => error);
    })
  );
}
