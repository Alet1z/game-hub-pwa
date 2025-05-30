import { Component, Input, Signal } from '@angular/core';

@Component({
  selector: 'app-dice',
  imports: [],
  templateUrl: './dice.component.html',
  styleUrl: './dice.component.css'
})
export class DiceComponent {
  // Con una propiedad tradicional
  // @Input()  valor: number = 0

  // Con señales
  @Input() valor!: Signal<number>
}
