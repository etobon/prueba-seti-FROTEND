import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common'; // 👈 Importante
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { map } from "rxjs/operators";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule]
})
export class HomePage implements OnInit {

  tasks: any = [];

  constructor( private http: HttpClient) {
   ;
  }

  ngOnInit() {
    console.log("hola");
    this.getTasks().subscribe( res => {
      console.log("Res: ", res);
      this.tasks = res;
    })
  }

  getTasks(){
    return this.http
    .get("assets/files/tasks.json")
    .pipe(
      map((res:any) => {
        return res;
      })
    )
  }




}
