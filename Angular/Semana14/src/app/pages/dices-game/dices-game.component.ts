import { Component, computed, Signal, signal } from '@angular/core';
import { DiceComponent } from '../../components/dice/dice.component';

@Component({
  selector: 'app-dices-game',
  imports: [DiceComponent],
  templateUrl: './dices-game.component.html',
  styleUrl: './dices-game.component.css'
})
export default class DicesGameComponent {
  // Generar un número aleatorio para pasarselo como valor al compnente dado
  //dado: Signal<number> = computed(() => (Math.floor(Math.random() * 6)) + 1) // Señal computada
  resultado = signal('') // Señal simple
  valor1 = signal(0)
  valor2 = signal(0)
  valor3 = signal(0)

  retornarAleatorio(){
    // Es una expresión que genera aleatoriamente un número entero entre 1 y 6, simulando el resultado de lanzar un dado
    return Math.floor(Math.random() * 6) + 1
  }

  lanzar(){
    this.valor1.update(() => this.retornarAleatorio())
    this.valor2.update(() => this.retornarAleatorio())
    this.valor3.update(() => this.retornarAleatorio())

    if(this.valor1() == this.valor2() && this.valor1() == this.valor3())
    {
      this.resultado.update(value => 'Ganó 😃🤑')
    }
    else{
      this.resultado.update(value => 'Perdió 🙁😵‍💫')
    }
  }
}
