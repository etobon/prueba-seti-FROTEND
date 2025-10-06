import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common'; // 👈 Importante
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AlertController, ToastController } from '@ionic/angular';
import { map } from "rxjs/operators";

interface Task {
  id: number;
  name: string;
  status: string;
  category: string;
}


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule]
})
export class HomePage implements OnInit {

  tasks: Task[] = [];

  constructor( private http: HttpClient,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController ) {
   ;
  }

  ngOnInit() {
    console.log("hola");
    this.loadTasks();
    
  }

    // Carga desde LocalStorage o JSON base
  loadTasks() {
    const saved = localStorage.getItem('tasks');
    if (saved) {
      this.tasks = JSON.parse(saved);
    } else {
      this.http.get<Task[]>('assets/files/tasks.json').subscribe(data => {
        this.tasks = data;
        this.saveTasks();
      });
    }
  }

  // Guarda en localStorage
  saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  // Mostrar Toast
  async showToast(message: string, color: string = 'primary') {
    const toast = await this.toastCtrl.create({
      message,
      duration: 1500,
      color,
      position: 'bottom',
    });
    await toast.present();
  }


  // Agregar nueva task
  async addTask() {
    const alert = await this.alertCtrl.create({
      header: 'Nueva Tarea',
      inputs: [
        { name: 'id', type: 'number', placeholder: 'ID' },
        { name: 'name', type: 'text', placeholder: 'Nombre' },
        { name: 'category', type: 'text', placeholder: 'Categoria' },
        { name: 'status', type: 'text', placeholder: 'Estado' },
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Guardar',
          handler: data => {
            if (data.id && data.name && data.status) {
              this.tasks.push({ id: Number(data.id), name: data.name, category: data.category, status: data.status});
              this.saveTasks();
              this.showToast('Tarea agregada', 'success');
            } else {
              this.showToast('Datos incompletos', 'warning');
            }
          },
        },
      ],
    });
    await alert.present();
  }


  // Eliminar tarea
  async deleteTask(id: number) {
    const alert = await this.alertCtrl.create({
      header: 'Eliminar Tarea',
      message: '¿Seguro que quieres eliminar esta tarea?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            this.tasks = this.tasks.filter(c => c.id !== id);
            this.saveTasks();
            this.showToast('Tarearía eliminada', 'danger');
          },
        },
      ],
    });
    await alert.present();
  }


  // Editar categoría existente
  async finalizeTask(task: Task) {
    const alert = await this.alertCtrl.create({
      header: 'Finalizar Tarea',
      inputs: [
        { name: 'status', type: 'text', value: task.status, placeholder: 'Estado' },
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Actualizar',
          handler: data => {
            task.status = data.status;
            this.saveTasks();
            this.showToast('Tarea finalizada', 'success');
          },
        },
      ],
    });
    await alert.present();
  }


}
