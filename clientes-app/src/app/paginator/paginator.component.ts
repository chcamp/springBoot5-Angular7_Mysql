

import { Component, OnInit, Input } from '@angular/core';

@Component( {
    selector: 'paginator-nav',
    templateUrl: './paginator.component.html'

} )
export class PaginatorComponent implements OnInit {

    @Input() paginador: any;

    paginas: number[];

    constructor() { }

    ngOnInit() {
        //por el constructor de new Array le pasaremos
        //El numero de elementos. Este totalPages
        //existe dentro de los atributos del paginador.
        this.paginas = new Array( this.paginador.totalPages ).fill( 0 )
        .map(( _valor, indice ) => indice + 1 );
    }

}


