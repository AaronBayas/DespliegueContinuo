import { test } from 'node:test';
import assert from 'node:assert/strict';
import { cargarIncidencias, guardarIncidencias } from '../js/almacenamiento.js';

function storageFalso() {
  const datos = new Map();
  return {
    getItem: (k) => (datos.has(k) ? datos.get(k) : null),
    setItem: (k, v) => datos.set(k, String(v)),
  };
}

test('guarda y vuelve a cargar la lista', () => {
  const s = storageFalso();
  guardarIncidencias([{ id: 1, titulo: 'Prueba' }], s);
  assert.deepEqual(cargarIncidencias(s), [{ id: 1, titulo: 'Prueba' }]);
});

test('devuelve lista vacía si no hay datos o están corruptos', () => {
  const s = storageFalso();
  assert.deepEqual(cargarIncidencias(s), []);
  s.setItem('incidencias.v1', '{no es json');
  assert.deepEqual(cargarIncidencias(s), []);
});
