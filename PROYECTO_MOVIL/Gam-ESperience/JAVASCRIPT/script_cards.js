const palos = ['♠️', '♥️', '♦️', '♣️'];
const valores = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

// Crear la baraja
let baraja = [];

function crearBaraja() {
    baraja = [];
    for (let palo of palos) {
        for (let valor of valores) {
            baraja.push(`${valor}${palo}`);
        }
    }
    baraja = baraja.sort(() => Math.random() - 0.5); // Mezclar
}

function robarCarta() {
    if (baraja.length === 0) {
        alert(" Reiniciando baraja...");
        crearBaraja();
    }
    const carta = baraja.pop();
    document.getElementById('carta').textContent = carta;
}
// Inicializar el juego
crearBaraja();