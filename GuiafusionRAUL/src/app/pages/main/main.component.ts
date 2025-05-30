import { Component, OnInit, inject } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { TitleCasePipe } from '@angular/common';
import { Product } from '../../interfaces/interfaces';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [ TitleCasePipe, RouterLink ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export default class MainComponent implements OnInit {
  title = 'Productos';
  categories: any = [];
  products: Product[] = [];
  isLoggedIn = true

  private productSrv = inject(ApiService);

  ngOnInit(): void {
    this.loadCategories();
    this.loadProducts();
  }

  loadCategories(){
    this.productSrv.getCategories().subscribe({
      next: (res: any) => {
        this.categories = res;
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }

  loadProducts(){
    this.productSrv.getAllProducts().subscribe({
      next: (res: any) => {
        this.products = res;
      },
      error: (err: any) => {
        console.error(err);
      },
    })
  }
  delete(product: Product){
    this.productSrv.deleteProduct(product.id!).subscribe(()=> this.loadProducts)
  }
  generateArray(rate: number): any[]{
    const roundedRate = Math.ceil(rate)
    return Array(roundedRate).fill(0)
  }
}
