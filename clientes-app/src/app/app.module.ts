import { BrowserModule } from '@angular/platform-browser';

import { NgModule, LOCALE_ID } from '@angular/core';

import { AppComponent } from './app.component';

import { HeaderComponent } from './header/header.component';

import { FooterComponent } from './footer/footer.component';

import { DirectivaComponent } from './directiva/directiva.component';
import { ClientesComponent } from './clientes/clientes.component';

import { formatDate, DatePipe } from '@angular/common';

import { ClienteService } from './clientes/cliente.service';

import { RouterModule, Routes } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';

import { FormComponent } from './clientes/form.component';

import { FormsModule } from '@angular/forms';

import { registerLocaleData } from '@angular/common';

//importar locales
import localeEs from '@angular/common/locales/es';

import { PaginatorComponent } from './paginator/paginator.component';

//registrar los locales con el nombre que quieras utilizar a la hora de proveer
registerLocaleData( localeEs, 'es' );

//vamos a crear una constante que contiene el arrelgo con las rutas
//de cada componente de nuestra aplicacion.
const routes: Routes = [

    { path: '', redirectTo: '/clientes', pathMatch: 'full' },
    { path: 'directivas', component: DirectivaComponent },

    { path: 'clientes', component: ClientesComponent },

    { path: 'clientes/page/:page', component: ClientesComponent },

    { path: 'clientes/form', component: FormComponent },

    { path: 'clientes/form/:id', component: FormComponent }
];

@NgModule( {
    declarations: [

        AppComponent,
        HeaderComponent,
        FooterComponent,
        DirectivaComponent,
        ClientesComponent,
        FormComponent,
        PaginatorComponent
    ],
    imports: [
        BrowserModule,

        HttpClientModule,

        RouterModule.forRoot( routes ),

        FormsModule
    ],
    providers: [ClienteService,
        { provide: LOCALE_ID, useValue: 'es' }],
    bootstrap: [AppComponent]
} )
export class AppModule { }
