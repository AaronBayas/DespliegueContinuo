// Prueba de regresión agregada en v1.1.1 para el issue #7.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { registrarIncidencia } from '../js/incidencias.js';

const base = [{ id: 1, titulo: 'Caída del servidor', estado: 'Cerrada' }];
const nueva = {
  titulo: 'Botón guardar no responde',
  descripcion: 'Al pulsar guardar no ocurre nada.',
  reportadoPor: 'Usuario QA',
  prioridad: 'Media',
  estado: 'Abierta',
};

test('con filtro "Cerrada" activo, una incidencia "Abierta" nueva no aparece en la vista', () => {
  const { lista, visibles } = registrarIncidencia(base, nueva, 'Cerrada');
  assert.equal(lista.length, 2);
  assert.deepEqual(visibles.map((i) => i.estado), ['Cerrada']);
});

test('con filtro "Todas" la vista incluye la incidencia nueva', () => {
  const { visibles } = registrarIncidencia(base, nueva, 'Todas');
  assert.equal(visibles.length, 2);
});
