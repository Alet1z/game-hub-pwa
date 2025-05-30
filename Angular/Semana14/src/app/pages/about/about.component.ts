import { Component, computed, Signal, signal } from '@angular/core';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
}) // La exportación por defecto (default) es necesaria para optimizar la configuración de rutas
export default class AboutComponent {
  // Definición de propiedades para la interpolación
  username: string = 'John Doe' // Definición de una propiedad tradicional de tipo cadena
  email = signal('john@doe.com') // Definición de una señal de tipo cadena
}
