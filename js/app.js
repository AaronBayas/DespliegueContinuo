// Interfaz: conecta el formulario y la tabla con la lógica.
import { crearIncidencia } from './incidencias.js';
import { cargarIncidencias, guardarIncidencias } from './almacenamiento.js';

const formulario = document.getElementById('form-incidencia');
const cajaErrores = document.getElementById('errores');
const cuerpoTabla = document.getElementById('lista-incidencias');
const mensajeVacio = document.getElementById('mensaje-vacio');

let incidencias = cargarIncidencias();

const aClase = (texto) => texto.toLowerCase().replace(/\s+/g, '-');

function celda(texto, clase) {
  const td = document.createElement('td');
  if (clase) {
    const span = document.createElement('span');
    span.className = `badge ${clase}`;
    span.textContent = texto;
    td.appendChild(span);
  } else {
    td.textContent = texto;
  }
  return td;
}

function renderizar(lista) {
  cuerpoTabla.replaceChildren();
  [...lista].reverse().forEach((inc) => {
    const fila = document.createElement('tr');
    fila.append(
      celda(`#${inc.id}`),
      celda(inc.titulo),
      celda(inc.descripcion),
      celda(inc.prioridad, `prioridad-${aClase(inc.prioridad)}`),
      celda(inc.estado, `estado-${aClase(inc.estado)}`),
      celda(inc.reportadoPor),
      celda(new Date(inc.fecha).toLocaleString('es-EC')),
    );
    cuerpoTabla.appendChild(fila);
  });
  mensajeVacio.hidden = lista.length > 0;
}

function mostrarErrores(mensajes) {
  cajaErrores.replaceChildren();
  mensajes.forEach((m) => {
    const li = document.createElement('li');
    li.textContent = m;
    cajaErrores.appendChild(li);
  });
  cajaErrores.hidden = mensajes.length === 0;
}

formulario.addEventListener('submit', (evento) => {
  evento.preventDefault();
  const datos = Object.fromEntries(new FormData(formulario));
  try {
    const nueva = crearIncidencia(datos, incidencias);
    incidencias = [...incidencias, nueva];
    guardarIncidencias(incidencias);
    mostrarErrores([]);
    formulario.reset();
    renderizar(incidencias);
  } catch (error) {
    mostrarErrores(error.errores ?? [error.message]);
  }
});

renderizar(incidencias);
