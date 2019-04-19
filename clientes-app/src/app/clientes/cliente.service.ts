import { Injectable } from '@angular/core';
import { CLIENTES } from './clientes.json';
import { Cliente } from './cliente';

import { Observable, of, throwError } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import {map, catchError} from 'rxjs/operators';
import Swal from 'sweetalert2';

import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndpoint: string = 'http://localhost:8181/api/clientes';

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json' })

  constructor(private http: HttpClient, private router: Router) { }


  getClientes(): Observable<Cliente[]> {

    return this.http.get<Cliente[]>(this.urlEndpoint);
    // return of(CLIENTES);
  }

  //Este metodo create retorna un tipo Observable cliente
  //que se creo en el API REST
  create(cliente: Cliente) : Observable<any>{

    return this.http.post<Cliente>(this.urlEndpoint, cliente, {headers: this.httpHeaders}).pipe(
        catchError(e => {
          //si el estatos de error desde el backend es 400 BAD REQUEST
          if(e.status==400){
            //retornamos el error para que el componente se encarge
            //de manejar este error
            return throwError(e);
          }

          console.error(e.error.mensaje);
          Swal.fire(e.error.mensaje, e.error.error, 'error');
          //para que este tipo de error e se castee a un Observable usamos el throwError(e);
          return throwError(e);

        })
    );

  }

  //Para obtener por id de cliente el cliente y editarlo.
  getCliente(id): Observable<Cliente>{
    return this.http.get<Cliente>(`${this.urlEndpoint}/${id}`).pipe(
        //aca podemos tener todos los operadores del flujo
        catchError(e => {
          this.router.navigate(['/clientes']);
          console.error(e.error.mensaje);
          //el error lo canaliza a traves del estado de la respuesta.
          //desde el backen un 500 server error o un 404 not found.
          Swal.fire('Error al editar', e.error.mensaje, 'error');
          return throwError(e);
        }) 
    );
  }

  // Actualizar cliente
  update(cliente: Cliente): Observable<any>{

    return this.http.put<any>(`${this.urlEndpoint}/${cliente.id}`, cliente, {headers: this.httpHeaders}).pipe(
      catchError(e => {

         // si el estatos de error desde el backend es 400 BAD REQUEST
          if(e.status==400){
            //retornamos el error para que el componente se encarge
            //de manejar este error
            return throwError(e);
          }

        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        //para que este tipo de error e se castee a un Observable usamos el throwError(e);
        return throwError(e);

      })
    );
  }

  //Eliminar cliente
  delete(id: number): Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.urlEndpoint}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        //para que este tipo de error e se castee a un Observable usamos el throwError(e);
        return throwError(e);

      })
    );
  }

} 





