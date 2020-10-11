import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-changelog',
  templateUrl: './menu-changelog.component.html',
  styleUrls: ['./menu-changelog.component.css']
})
export class MenuChangelogComponent implements OnInit {

  options = [
    { "name": "Tareas pendientes", "icon": "far fa-clock", "route": "tareas-pendientes" },
    { "name": "Tareas canceladas", "icon": "fas fa-ban", "route": "tareas-canceladas" },
    { "name": "Tareas verificadas", "icon": "far fa-check-circle", "route": "tareas-verificadas" },
    { "name": "Agregar tarea", "icon": "far fa-check-circle", "route": "agregar-tarea" },
  ];

  bodyText: string;

  constructor() { }

  ngOnInit() {
    console.log(this.options);
    this.bodyText = 'This text can be updated in modal 1';
  }

}
