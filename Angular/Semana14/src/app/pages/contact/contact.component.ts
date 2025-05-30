import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule], //! Importante!!! Lo primero que debes agregar es la importación del ReactiveFormsModule
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export default class ContactComponent {
  /* ¿Qué es FormGroup?
    Es una clase de Angular que representa un grupo de controles de formulario.
    Piensa en él como un contenedor que agrupa varios campos (como nombre, email, mensaje, etc.)
  */

  /*
    ¿Qué es FormControl?
    Cada FormControl representa un campo individual del formulario (como un <input>),
    y se puede configurar con un valor inicial y una lista de validaciones.
  */

  /*
    frmContacto es la variable del componente que representa el formulario.
    Se inicializa con un FormGroup que contiene 3 controles: name, email, y message.
  */
  frmContacto = new FormGroup({
    /*
      Crea un campo llamado name.
      Valor inicial: '' (vacío).
      Validador: Validators.required, es decir, este campo es obligatorio.
    */
    name: new FormControl('', Validators.required),
    /*
      Crea un campo llamado email.
      Valor inicial: ''.
      Validadores:
        Validators.required: obligatorio.
        Validators.email: debe tener un formato de correo válido (ej. ejemplo@correo.com).
   */
    email: new FormControl('', [Validators.required, Validators.email]),
    /*
      Crea un campo llamado message.
      Valor inicial: '' (vacío).
      Validador: Validators.required, es decir, este campo es obligatorio.
    */
    message: new FormControl('', Validators.required),
  });

  // Esta es una función llamada onSubmit, se ejecuta cuando se envía el formulario (gracias a (ngSubmit)="onSubmit()" en la plantilla HTML).
  onSubmit() {
    /**
     * this.frmContacto hace referencia al FormGroup que está vinculado al formulario.
     * .value obtiene los valores actuales de todos los campos del formulario como un objeto.
     * console.log(...) imprime ese objeto completo en la consola, útil para depurar y ver qué datos están presentes al enviar.
     */
    console.log(this.frmContacto.value);

    // Aquí se guarda un objeto con los valores del formulario en una constante llamada formValues, para usarlo más cómodamente.
    const formValues = this.frmContacto.value;

    // Imprime en consola el valor del campo name.
    console.log(formValues.name);
    // Imprime en consola el valor del campo email.
    console.log(formValues.email);
    // Imprime en consola el valor del campo message.
    console.log(formValues.message);
  }
}
