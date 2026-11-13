// Lógica de negocio del Sistema de Registro de Incidencias.
// No depende del navegador, por eso se puede probar con `node --test`.

export const ESTADOS = ['Abierta', 'En progreso', 'Cerrada'];
export const PRIORIDADES = ['Baja', 'Media', 'Alta'];

const limpiar = (valor) => String(valor ?? '').trim();

export function validarIncidencia(datos = {}) {
  const errores = [];
  const titulo = limpiar(datos.titulo);
  const descripcion = limpiar(datos.descripcion);
  const reportadoPor = limpiar(datos.reportadoPor);

  if (titulo.length < 5) errores.push('El título debe tener al menos 5 caracteres.');
  if (titulo.length > 80) errores.push('El título no puede superar los 80 caracteres.');
  if (descripcion.length < 10) errores.push('La descripción debe tener al menos 10 caracteres.');
  if (!reportadoPor) errores.push('Debe indicar quién reporta la incidencia.');
  if (!PRIORIDADES.includes(datos.prioridad)) errores.push('La prioridad seleccionada no es válida.');
  if (!ESTADOS.includes(datos.estado)) errores.push('El estado seleccionado no es válido.');

  return errores;
}

export function crearIncidencia(datos, listaActual = [], ahora = new Date()) {
  const errores = validarIncidencia(datos);
  if (errores.length > 0) {
    const error = new Error(errores.join(' '));
    error.errores = errores;
    throw error;
  }
  const siguienteId = listaActual.reduce((max, inc) => Math.max(max, inc.id), 0) + 1;
  return {
    id: siguienteId,
    titulo: limpiar(datos.titulo),
    descripcion: limpiar(datos.descripcion),
    reportadoPor: limpiar(datos.reportadoPor),
    prioridad: datos.prioridad,
    estado: datos.estado,
    fecha: ahora.toISOString(),
  };
}

// v1.1.0: filtro por estado
export function filtrarPorEstado(lista, estado) {
  if (!estado || estado === 'Todas') return [...lista];
  return lista.filter((inc) => inc.estado === estado);
}
