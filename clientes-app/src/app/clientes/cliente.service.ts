import { Injectable } from '@angular/core';
import { formatDate, DatePipe } from '@angular/common';
import { CLIENTES } from './clientes.json';
import { Cliente } from './cliente';



import { Observable, of, throwError } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map, catchError, tap } from 'rxjs/operators';

import Swal from 'sweetalert2';

import { Router } from '@angular/router';





@Injectable( {
    providedIn: 'root'
} )
export class ClienteService {

    private urlEndpoint: string = 'http://localhost:8181/api/clientes';

    private httpHeaders = new HttpHeaders( { 'Content-Type': 'application/json' } )

    constructor( private http: HttpClient, private router: Router ) { }

    /*

      getClientes(): Observable<Cliente[]> {

        return this.http.get<Cliente[]>(this.urlEndpoint);
        // return of(CLIENTES);
      }
      */

    getClientes( page: number ): Observable<any> {
        return this.http.get( this.urlEndpoint + '/page/' + page ).pipe(
            //response: any porque la rpta puede ser
            //cualquier tipo de dato un JSON
            tap(( response: any ) => {
                console.log( 'ClienteService: tap1' );

                ( response.content as Cliente[] ).forEach( cliente => {
                    //Y aca podemos moostrar para el log los datos
                    //de todos los clientes

                    console.log( cliente.nombre );
                }

                )
            } ),

            map(( response: any ) => {

                //el map tambien se puede usar para modificar sus valores
                //internos cada item de este array.
                ( response.content as Cliente[] ).map( cliente => {
                    cliente.nombre = cliente.nombre.toUpperCase();
                    let datePipe = new DatePipe( 'es' );

                    //cliente.createAt = datePipe.transform( cliente.createAt, 'EEEE dd, MMMM, yyyy' );

                    //formatDate( cliente.createAt, 'dd-MM-yyyy', 'en-US' );
                    return cliente;
                } );
                return response;

            } ),

            tap( response => {
                console.log( 'ClienteService: tap2' );
                ( response.content as Cliente[] ).forEach( cliente => {
                    //Y aca podemos moostrar para el log los datos
                    //de todos los clientes

                    console.log( cliente.nombre );
                }

                )
            } )
        );
    }

    //que se creo en el API REST
    create( cliente: Cliente ): Observable<any> {

        return this.http.post<Cliente>( this.urlEndpoint, cliente, { headers: this.httpHeaders } ).pipe(
            catchError( e => {
                //si el estatos de error desde el backend es 400 BAD REQUEST
                if ( e.status == 400 ) {
                    //retornamos el error para que el componente se encarge
                    //de manejar este error
                    return throwError( e );
                }

                console.error( e.error.mensaje );
                Swal.fire( e.error.mensaje, e.error.error, 'error' );
                //para que este tipo de error e se castee a un Observable usamos el throwError(e);
                return throwError( e );

            } )
        );

    }

    //Para obtener por id de cliente el cliente y editarlo.
    getCliente( id ): Observable<Cliente> {
        return this.http.get<Cliente>( `${this.urlEndpoint}/${id}` ).pipe(
            //aca podemos tener todos los operadores del flujo
            catchError( e => {
                this.router.navigate( ['/clientes'] );
                console.error( e.error.mensaje );
                //el error lo canaliza a traves del estado de la respuesta.
                //desde el backen un 500 server error o un 404 not found.
                Swal.fire( 'Error al editar', e.error.mensaje, 'error' );
                return throwError( e );
            } )
        );
    }

    // Actualizar cliente
    update( cliente: Cliente ): Observable<any> {

        return this.http.put<any>( `${this.urlEndpoint}/${cliente.id}`, cliente, { headers: this.httpHeaders } ).pipe(
            catchError( e => {

                // si el estatos de error desde el backend es 400 BAD REQUEST
                if ( e.status == 400 ) {
                    //retornamos el error para que el componente se encarge
                    //de manejar este error
                    return throwError( e );
                }

                console.error( e.error.mensaje );
                Swal.fire( e.error.mensaje, e.error.error, 'error' );
                //para que este tipo de error e se castee a un Observable usamos el throwError(e);
                return throwError( e );

            } )
        );
    }

    //Eliminar cliente
    delete( id: number ): Observable<Cliente> {
        return this.http.delete<Cliente>( `${this.urlEndpoint}/${id}`, { headers: this.httpHeaders } ).pipe(
            catchError( e => {
                console.error( e.error.mensaje );
                Swal.fire( e.error.mensaje, e.error.error, 'error' );
                //para que este tipo de error e se castee a un Observable usamos el throwError(e);
                return throwError( e );

            } )
        );
    }

}
