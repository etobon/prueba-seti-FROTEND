import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common'; // 👈 Importante
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AlertController, ToastController } from '@ionic/angular';
import { map } from "rxjs/operators";


interface Category {
  id: number;
  name: string;
}


@Component({
  selector: 'app-home',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule]
})
export class CategoriesPage implements OnInit {

  categories: Category[] = [];

  constructor( 
    private http: HttpClient,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController) {
   ;
  }

  ngOnInit() {
    console.log("hola");
    this.loadCategories();

  }

  // Carga desde LocalStorage o JSON base
  loadCategories() {
    const saved = localStorage.getItem('categories');
    if (saved) {
      this.categories = JSON.parse(saved);
    } else {
      this.http.get<Category[]>('assets/files/categories.json').subscribe(data => {
        this.categories = data;
        this.saveCategories();
      });
    }
  }

  // Guarda en localStorage
  saveCategories() {
    localStorage.setItem('categories', JSON.stringify(this.categories));
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


  // Agregar nueva categoría
  async addCategory() {
    const alert = await this.alertCtrl.create({
      header: 'Nueva Categoría',
      inputs: [
        { name: 'id', type: 'number', placeholder: 'ID' },
        { name: 'name', type: 'text', placeholder: 'Nombre' },
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Guardar',
          handler: data => {
            if (data.id && data.name) {
              this.categories.push({ id: Number(data.id), name: data.name });
              this.saveCategories();
              this.showToast('Categoría agregada', 'success');
            } else {
              this.showToast('Datos incompletos', 'warning');
            }
          },
        },
      ],
    });
    await alert.present();
  }


  // Editar categoría existente
  async editCategory(cat: Category) {
    const alert = await this.alertCtrl.create({
      header: 'Editar Categoría',
      inputs: [
        { name: 'name', type: 'text', value: cat.name, placeholder: 'Nombre' },
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Actualizar',
          handler: data => {
            cat.name = data.name;
            this.saveCategories();
            this.showToast('Categoría actualizada', 'success');
          },
        },
      ],
    });
    await alert.present();
  }

  // Eliminar categoría
  async deleteCategory(id: number) {
    const alert = await this.alertCtrl.create({
      header: 'Eliminar Categoría',
      message: '¿Seguro que quieres eliminar esta categoría?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            this.categories = this.categories.filter(c => c.id !== id);
            this.saveCategories();
            this.showToast('Categoría eliminada', 'danger');
          },
        },
      ],
    });
    await alert.present();
  }
  

}
