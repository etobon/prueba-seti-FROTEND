import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,

})
export class AppComponent {
  public appPages = [    
    { title: 'Tasks', url: '/home', icon: 'warning' },
    { title: 'Categories', url: '/categories', icon: 'warning' },
  ];
  constructor() {}
}
