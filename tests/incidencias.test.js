import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validarIncidencia, crearIncidencia } from '../js/incidencias.js';

const valida = {
  titulo: 'Error al iniciar sesión',
  descripcion: 'El botón ingresar no responde en Chrome.',
  reportadoPor: 'María López',
  prioridad: 'Alta',
  estado: 'Abierta',
};

test('una incidencia completa no tiene errores', () => {
  assert.deepEqual(validarIncidencia(valida), []);
});

test('rechaza título corto, descripción vacía y reportante vacío', () => {
  const errores = validarIncidencia({ ...valida, titulo: 'abc', descripcion: '', reportadoPor: '  ' });
  assert.equal(errores.length, 3);
});

test('rechaza prioridad o estado fuera de catálogo', () => {
  const errores = validarIncidencia({ ...valida, prioridad: 'Urgente', estado: 'Pendiente' });
  assert.equal(errores.length, 2);
});

test('crearIncidencia asigna id consecutivo, recorta espacios y guarda la fecha', () => {
  const ahora = new Date('2026-11-12T10:00:00Z');
  const inc = crearIncidencia({ ...valida, titulo: '  Error al iniciar sesión  ' }, [{ id: 1 }, { id: 4 }], ahora);
  assert.equal(inc.id, 5);
  assert.equal(inc.titulo, 'Error al iniciar sesión');
  assert.equal(inc.fecha, '2026-11-12T10:00:00.000Z');
});

test('crearIncidencia lanza error con la lista de mensajes si los datos no son válidos', () => {
  assert.throws(() => crearIncidencia({ ...valida, titulo: '' }), (e) => Array.isArray(e.errores) && e.errores.length === 1);
});
