import { test } from 'node:test';
import assert from 'node:assert/strict';
import { filtrarPorEstado } from '../js/incidencias.js';

const lista = [
  { id: 1, estado: 'Abierta' },
  { id: 2, estado: 'Cerrada' },
  { id: 3, estado: 'En progreso' },
  { id: 4, estado: 'Cerrada' },
];

test('"Todas" devuelve la lista completa', () => {
  assert.equal(filtrarPorEstado(lista, 'Todas').length, 4);
});

test('filtra solo las incidencias cerradas', () => {
  assert.deepEqual(filtrarPorEstado(lista, 'Cerrada').map((i) => i.id), [2, 4]);
});

test('no modifica la lista original', () => {
  filtrarPorEstado(lista, 'Abierta');
  assert.equal(lista.length, 4);
});
