import { Component, OnInit } from '@angular/core';
import {Cliente} from './cliente';
import { ClienteService } from './cliente.service';

import swal from 'sweetalert2';

//Prueba gitHub
//Prueba de cambios

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
  
})
export class ClientesComponent implements OnInit {  

  clientes: Cliente[];
  constructor(private clienteService: ClienteService) { }

  ngOnInit() {

    this.clienteService.getClientes().subscribe(
      //aca tenemos quye suscribir al observador asignar en el atributo clientes
      //el valor que se esta recibiendo desde el clienteService que seria el
      //listado de clientes con los cambios.
      //una funcion anonima que se encarga de asignar
      //el valor al cliente.component
      //clientes => es una variable que se le asigna el this.clientes = clientes
      //osea lo guarda en clientes lo vas guardando en this.clientes pero con los cambios

      clientes => this.clientes = clientes
     

    );

  }

  //metodo que elimina el cliente.
  //usa el codiogo de los botones con estilos estos de sweetalert 2
  delete(cliente: Cliente): void {
    const swalWithBootstrapButtons = swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false,
    })
    
    swalWithBootstrapButtons.fire({
      title: '¿Estas seguro?',
      text: `¿Seguro que deseas eliminar a cliente ${cliente.nombre} ${cliente.apellido}`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        //cuando se hace clic en el boton 'Si, eliminar'
        //aca ejecutamos la accion de eliminar.
        this.clienteService.delete(cliente.id).subscribe(
          //registramos al subscriptor y como respuesta o
          //response, vamos a mandar el mensaje:
          respose => {
            this.clientes = this.clientes.filter(cli => cli !== cliente)
            swalWithBootstrapButtons.fire(
              'Cliente eliminado!',
              `Cliente  ${cliente.nombre} eliminado con éxito.`,
              'success'
            )
          }
        )
        
      } 
    })
  }

}
