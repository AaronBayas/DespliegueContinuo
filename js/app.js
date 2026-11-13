// Interfaz: conecta el formulario, el filtro y la tabla con la lógica.
import { registrarIncidencia, filtrarPorEstado } from './incidencias.js';
import { cargarIncidencias, guardarIncidencias } from './almacenamiento.js';

const formulario = document.getElementById('form-incidencia');
const cajaErrores = document.getElementById('errores');
const cuerpoTabla = document.getElementById('lista-incidencias');
const filtroEstado = document.getElementById('filtro-estado');
const contador = document.getElementById('contador');
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
  contador.textContent = `Mostrando ${lista.length} de ${incidencias.length} incidencias`;
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
    const resultado = registrarIncidencia(incidencias, datos, filtroEstado.value);
    incidencias = resultado.lista;
    guardarIncidencias(incidencias);
    mostrarErrores([]);
    formulario.reset();
    renderizar(resultado.visibles);
  } catch (error) {
    mostrarErrores(error.errores ?? [error.message]);
  }
});

filtroEstado.addEventListener('change', () => {
  renderizar(filtrarPorEstado(incidencias, filtroEstado.value));
});

renderizar(filtrarPorEstado(incidencias, filtroEstado.value));
