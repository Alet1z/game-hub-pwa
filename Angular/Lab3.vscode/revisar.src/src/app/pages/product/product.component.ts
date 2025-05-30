import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Product } from '../../interfaces/interfaces';

@Component({
  selector: 'app-product',
  imports: [ReactiveFormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export default class ProductComponent implements OnInit {
  /**
   * En Angular se utiliza @ViewChild para acceder a un elemento del DOM
   * o a una directiva hija dentro del template del componente.
   * El argumento 'selectElement' es una referencia a un elemento en el
   * template marcado con el atributo #selectElement
   */
  @ViewChild('selectElement') selectElement: any;

  // Inyecciones de dependencias
  private frmBuilder = inject(FormBuilder);
  private productSrv = inject(ApiService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

// Definición de la propiedad para el formulario
frmProduct?:FormGroup

// Definición de la propiedad Producto
product?: Product

categories = [
  {id: "electronics", cat: "Electronics"},
  {id: "jewelery", cat: "Jewelery"},
  {id: "men's clothing", cat: "Men's clothing"},
  {id: "women's clothing", cat: "Women's clothing"},
]

ngOnInit(): void {
  /*
  Esta instrucción es muy común en aplicaciones Angular que utilizan
  enrutamiento basado en parámetros para cargar diferentes vistas o
  componentes basados en la URL actual
  */
  const id = parseInt(this.route.snapshot.paramMap.get('id')!)

  // Si requieren modificar un producto lo buscamos por medio del Id
  if (id) {
    this.productSrv.getProductById(id).subscribe((resp) => {
      console.log(resp)

      this.product = resp

      // Si el producto existe se construye el formulario con la data
      this.frmProduct = this.frmBuilder.group({
        category: [resp.category, Validators.required],
        title: [resp.title, Validators.required],
        price: [resp.price, Validators.required],
        description: [resp.description, Validators.required]
      })

      // Si el producto posee una categoria se le asigna al ViewChild
      if (resp.category !== null) {
        this.selectElement.nativeElement.value = resp.category.toString()
      }
    })
  } else { // Si requieren agregar un producto se construye el formulario vacío
    this.frmProduct = this.frmBuilder.group({
      category: ['', Validators.required],
      title: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required]
    })
  }
}

onSave() {
  // console.log(this.frmProduct?.value)
  const productData = this.frmProduct?.value;

  // El id será generado por el servidor, así que lo dejamos como nulo
  // los campos rating_rate y rating_count deberían ser actualizados posteriormente
  const product: Product = {
    id: null,
    title: productData.title!,
    price: parseFloat(productData.price),
    description: productData.description!,
    category: productData.category!,
    image: 'https://loremflickr.com/320/480/business',
    rating_rate: null,
    rating_count: null,
  }

  // Si la propiedad product existe, entonces actualizamos
  if (this.product) {
    this.productSrv.updateProduct(this.product.id!, product).subscribe(() => this.router.navigate(['/']))
  } else { // De lo contrario ingresamos un nuevo producto
    this.productSrv.createProduct(product).subscribe(() => this.router.navigate(['/']))
  }
}
}


