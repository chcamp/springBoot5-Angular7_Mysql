

import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';

@Component( {
    selector: 'paginator-nav',
    templateUrl: './paginator.component.html'

} )
export class PaginatorComponent implements OnInit, OnChanges {

    @Input() paginador: any;

    paginas: number[];

    //tributos o variables desde a hasta.

    //Para la paginacion creamos variables desde a hasta
    desde: number;

    hasta: number;


    constructor() { }

    ngOnInit() {

        this.initPaginator();

    }

    ngOnChanges( changes: SimpleChanges ) {

        let paginadorActualizado = changes['paginador'];

        //si solo tiene un estado anterior un
        //previousValue ahi es cuanod invocamos un
        //this.initPaginator()
        if ( paginadorActualizado.previousValue ) {
            this.initPaginator();
        }


    }

    //metodo para paginar

    private initPaginator(): void {

        this.desde = Math.min( Math.max( 1, this.paginador.number - 4 ), this.paginador.totalPages - 5 );
        this.hasta = Math.max( Math.min( this.paginador.totalPages, this.paginador.number + 4 ), 6 );
        //Vamos a calcular el paginador cuando sea mayor a 5
        //sino, lo dejamos como estaba
        if ( this.paginador.totalPages > 5 ) {

            this.paginas = new Array( this.hasta - this.desde + 1 ).fill( 0 )
                .map(( _valor, indice ) => indice + this.desde );

        } else {
            //por el constructor de new Array le pasaremos
            //El numero de elementos. Este totalPages
            //existe dentro de los atributos del paginador.
            this.paginas = new Array( this.paginador.totalPages ).fill( 0 )
                .map(( _valor, indice ) => indice + 1 );
        }
    }

}


