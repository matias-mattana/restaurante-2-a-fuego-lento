// Capturar elementos del DOM
const formTurno = document.getElementById('form-turno');
const listaTurnos = document.getElementById('turnos');

// Cargar turnos desde localStorage
let turnos = JSON.parse(localStorage.getItem('turnos')) || [];

// Función para mostrar turnos en el DOM
function mostrarTurnos() {
    listaTurnos.innerHTML = '';
    turnos.forEach((turno, index) => {
        const li = document.createElement('li');
        li.textContent = `${turno.nombre} - ${turno.personas} personas - ${turno.fecha} ${turno.hora}`;
        
        const btnEliminar = document.createElement('button');
        btnEliminar.textContent = 'Eliminar';
        btnEliminar.addEventListener('click', () => {
            eliminarTurno(index);
        });

        li.appendChild(btnEliminar);
        listaTurnos.appendChild(li);
    });
}

// Función para agregar un turno
function agregarTurno(nombre, personas, fecha, hora) {
    turnos.push({ nombre, personas, fecha, hora });
    localStorage.setItem('turnos', JSON.stringify(turnos));
    mostrarTurnos();
}

// Función para eliminar un turno
function eliminarTurno(index) {
    turnos.splice(index, 1);
    localStorage.setItem('turnos', JSON.stringify(turnos));
    mostrarTurnos();
}

// Evento submit del formulario
formTurno.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const personas = document.getElementById('personas').value;
    const fecha = document.getElementById('fecha').value;
    const hora = document.getElementById('hora').value;

    agregarTurno(nombre, parseInt(personas), fecha, hora);
    formTurno.reset();
});

// Inicializar mostrando turnos guardados
mostrarTurnos();