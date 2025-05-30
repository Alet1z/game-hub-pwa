const niveles = {
    facil: { filas: 8, columnas: 8, minas: 10, fondo: "url('../MEDIA/background/background-facil.jpg')" },
    medio: { filas: 12, columnas: 12, minas: 20, fondo: "url('../MEDIA/background/background-medio.jpg')" },
    dificil: { filas: 16, columnas: 16, minas: 30, fondo: "url('../MEDIA/background/background-dificil.jpg')" }
};

let nivelActual = niveles.facil;
let celdas = [], ubicacionMinas = [], descubiertas = 0;
const tablero = document.getElementById('tablero');

function iniciarTablero() {
    tablero.innerHTML = '';
    celdas = [];
    ubicacionMinas = [];
    mostrarMensaje('');
    descubiertas = 0;
    banderasUsadas = 0;
    actualizarContadorBanderas();
    tablero.style.gridTemplateColumns = `repeat(${nivelActual.columnas}, auto)`;

    for (let i = 0; i < nivelActual.filas; i++) {
        celdas[i] = [];
        for (let j = 0; j < nivelActual.columnas; j++) {
            let celda = document.createElement('div');
            celda.classList.add('celda');
            celda.dataset.fila = i;
            celda.dataset.columna = j;
            celda.dataset.estado = 'oculto';
            celda.dataset.bandera = 'false';
            celda.addEventListener('click', manejarClic);
            celda.addEventListener('contextmenu', manejarClicDerecho);
            tablero.appendChild(celda);
            celdas[i][j] = celda;
        }
    }
    colocarMinas();
}

function colocarMinas() {
    let { filas, columnas, minas } = nivelActual;
    while (ubicacionMinas.length < minas) {
        let fila = Math.floor(Math.random() * filas);
        let columna = Math.floor(Math.random() * columnas);
        if (!celdas[fila][columna].dataset.mina) {
            celdas[fila][columna].dataset.mina = 'true';
            ubicacionMinas.push({ fila, columna });
        }
    }
}

function manejarClic(e) {
    let celda = e.target;
    let fila = +celda.dataset.fila;
    let columna = +celda.dataset.columna;

    if (celda.dataset.bandera === 'true') return;

    if (celda.dataset.estado === 'oculto') {
        if (celda.dataset.mina) {
            revelarMinas();
            mostrarMensaje('¡Perdiste!', 'red');
            deshabilitarTablero();
        } else {
            let minasCerca = contarMinas(fila, columna);
            celda.textContent = minasCerca || '';
            celda.dataset.estado = 'descubierto';
            celda.classList.add('descubierto');
            descubiertas++;
            if (minasCerca === 0) revelarVacias(fila, columna);
            if (descubiertas === nivelActual.filas * nivelActual.columnas - nivelActual.minas) {
                mostrarMensaje('¡Ganaste!', 'green');
                deshabilitarTablero();
            }
        }
    }
}

function manejarClicDerecho(e) {

    e.preventDefault();

    let celda = e.target;

    if (celda.dataset.estado === 'descubierto') return;

    if (celda.dataset.bandera === 'true') {
        celda.dataset.bandera = 'false';
        celda.textContent = '';
        banderasUsadas--;
    } else {
        if (banderasUsadas < nivelActual.minas) {
            celda.dataset.bandera = 'true';
            celda.textContent = '🚩';
            banderasUsadas++;
        }
    }
    actualizarContadorBanderas();
}

function actualizarContadorBanderas() {
    const contadorElemento = document.getElementById('contador-banderas');
    contadorElemento.textContent = `Banderas: ${banderasUsadas}/${nivelActual.minas}`;
}

function contarMinas(f, c) {
    let total = 0;
    for (let i = f - 1; i <= f + 1; i++) {
        for (let j = c - 1; j <= c + 1; j++) {
            if (celdas[i]?.[j]?.dataset.mina) total++;
        }
    }
    return total;
}

function revelarVacias(f, c) {
    for (let i = f - 1; i <= f + 1; i++) {
        for (let j = c - 1; j <= c + 1; j++) {
            let celda = celdas[i]?.[j];
            if (celda && celda.dataset.estado === 'oculto') {
                let minasCerca = contarMinas(i, j);
                celda.textContent = minasCerca || '';
                celda.dataset.estado = 'descubierto';
                celda.classList.add('descubierto');
                descubiertas++;
                if (minasCerca === 0) revelarVacias(i, j);
            }
        }
    }
}

function revelarMinas() {
    ubicacionMinas.forEach(({ fila, columna }) => {
        celdas[fila][columna].textContent = '*';
        celdas[fila][columna].classList.add('mina');
    });
}

function mostrarMensaje(mensaje, color) {
    let mensajeElemento = document.getElementById('mensaje');
    mensajeElemento.textContent = mensaje;
    mensajeElemento.style.color = color;
}

function deshabilitarTablero() {
    tablero.style.pointerEvents = 'none';
}

function cambiarNivel(nivel) {
    nivelActual = niveles[nivel];
    document.body.style.backgroundImage = nivelActual.fondo;
    document.body.style.backgroundSize = "cover";
    iniciarTablero();
    tablero.style.pointerEvents = 'auto';
}

function reiniciarJuego() {
    tablero.innerHTML = '';
    celdas = [];
    ubicacionMinas = [];
    descubiertas = 0;

    iniciarTablero();
    tablero.style.pointerEvents = 'auto';
    tablero.addEventListener('click', handleCellClick);

}

