import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';

import { ClienteService } from './cliente.service';

import {Router, ActivatedRoute} from '@angular/router';

import swal from 'sweetalert2';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
  
})
export class FormComponent implements OnInit {

  private cliente : Cliente =  new Cliente;

  private titulo:string = "Crear Cliente";

  private errores: string[];

  constructor(private clienteService: ClienteService,
                      private router: Router,
                      private activatedRouted: ActivatedRoute) { }

  ngOnInit() {
    this.cargarCliente()
  }

  cargarCliente(): void{
    // Vamos a subscribir un observador que esta observado cuando
    // obtengamos el id de cliente que le pasamos por parametro.
    this.activatedRouted.params.subscribe(params => {
      let id = params['id']
      if(id){
        this.clienteService.getCliente(id).subscribe(
          (cliente) => this.cliente = cliente)
      }
    })
  }

   create(): void{
      
      this.clienteService.create(this.cliente).subscribe(
        // una vez que se haya creado el objeto cliente con
        // este response va a retornar la respuesta que va a contener
        // el nuevo objeto creado y redirige al listado de vuelta
        // para mostrar los cambios y la fila creada del nuevo cliente.
        // con router va a dirigir al listado de cliente con la url /clientes
          json => {
          this.router.navigate(['/clientes'])

          //aca vamos a configurar el sweetalert 2 
          swal.fire('Cliente Guardado',`${json.mensaje}: ${json.cliente.nombre} se ha creado con exito`,'success')
          },

          err => {
            //en el json guardamos los errores en el 
            //parametro errors en el backend            
            this.errores = err.error.errors as string[];
            //y tambien el estatus
            console.error('Código de error desde el Backend: ' + err.status);

            //Opcional si queremos, podemos mostrar los
            //tipos de error tambien en la consola del navegador
            console.error(err.error.errors);
            //y tambien el estatus
            console.error('Código de error: ' + err.status);

          }
      );

  }

  // actualizar ussario    
  update(): void{
    this.clienteService.update(this.cliente).subscribe(

      json => {
        this.router.navigate(['/clientes'])

        //aca vamos a configurar el sweetalert 2
        swal.fire('Cliente Actualizado',`${json.mensaje}: ${json.cliente.nombre}`,'success')
        },

          err => {
            //en el json guardamos los errores en el 
            //parametro errors en el backend            
            this.errores = err.error.errors as string[];
            //y tambien el estatus
            console.error('Código de error desde el Backend: ' + err.status);

            //Opcional si queremos, podemos mostrar los
            //tipos de error tambien en la consola del navegador
            console.error(err.error.errors);
            //y tambien el estatus
            console.error('Código de error: ' + err.status);

          }

    )
    
  }

}

