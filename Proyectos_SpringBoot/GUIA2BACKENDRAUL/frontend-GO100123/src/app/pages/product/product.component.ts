import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-product',
  templateUrl:'./product.component.html',
  styleUrls: ['./product.component.css'],
  imports: [CommonModule],
})
export class ProductComponent {
  dropdownOpen = false;
  selectedFruit = '';
  fruits = ['Apple', 'Banana', 'Mango', 'Orange'];

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectFruit(fruit: string) {
    this.selectedFruit = fruit;
    this.dropdownOpen = false;
  }
}