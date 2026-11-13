// Persistencia local de las incidencias usando localStorage del navegador.
const CLAVE = 'incidencias.v1';

export function cargarIncidencias(storage = globalThis.localStorage) {
  try {
    const texto = storage?.getItem(CLAVE);
    const datos = texto ? JSON.parse(texto) : [];
    return Array.isArray(datos) ? datos : [];
  } catch {
    return [];
  }
}

export function guardarIncidencias(lista, storage = globalThis.localStorage) {
  try {
    storage?.setItem(CLAVE, JSON.stringify(lista));
    return true;
  } catch {
    return false;
  }
}
