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
