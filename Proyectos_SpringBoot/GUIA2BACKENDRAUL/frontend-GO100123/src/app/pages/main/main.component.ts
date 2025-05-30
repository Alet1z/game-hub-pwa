import { Component, OnInit, inject } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { TitleCasePipe } from '@angular/common';
import { Product } from '../../interfaces/interfaces';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [ TitleCasePipe ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export default class MainComponent implements OnInit {
  title = 'Productos';
  categories: any = [];
  products: Product[] = [];

  private apiService = inject(ApiService);

  ngOnInit(): void {
    this.loadCategories();
    this.loadProducts();
  }

  loadCategories(){
    this.apiService.getCategories().subscribe({
      next: (res: any) => {
        this.categories = res;
      },
      error: (err: any) => {}
    });
  }

  loadProducts(){
    this.apiService.getAllProducts().subscribe({
      next: (res) => {
        this.products = res;
      },
      error: (err: any) => {}
    });
  }
}
