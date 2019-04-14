import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html',
  styleUrls: ['./directiva.component.css']
})
export class DirectivaComponent {

  habilitar:boolean = true;


  listaCurso: string[] = [
    'TypeScript', 'JavaScript', 'JAva EE', 'C#', 'PHP'
  ]
  constructor() { }  

  setHabilitar():void{
    this.habilitar = (this.habilitar == true)?false : true
  }

}
 