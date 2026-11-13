// Validación estática que ejecuta GitHub Actions antes de desplegar.
// Revisa que existan los archivos del sitio y que la versión sea coherente.
import { readFileSync, existsSync } from 'node:fs';

const errores = [];
const requeridos = ['index.html', 'css/styles.css', 'js/app.js', 'js/incidencias.js', 'js/almacenamiento.js', 'README.md', 'CHANGELOG.md'];

for (const archivo of requeridos) {
  if (!existsSync(archivo)) errores.push(`Falta el archivo ${archivo}`);
}

if (existsSync('index.html')) {
  const html = readFileSync('index.html', 'utf8');
  if (!html.includes('href="css/styles.css"')) errores.push('index.html no enlaza css/styles.css');
  if (!html.includes('src="js/app.js"')) errores.push('index.html no carga js/app.js');
  if (!/<html lang="es">/.test(html)) errores.push('index.html debe declarar lang="es"');

  const { version } = JSON.parse(readFileSync('package.json', 'utf8'));
  const enPie = html.match(/id="version">v([\d.]+)</)?.[1];
  if (enPie !== version) errores.push(`La versión del pie (v${enPie}) no coincide con package.json (v${version})`);

  if (existsSync('CHANGELOG.md') && !readFileSync('CHANGELOG.md', 'utf8').includes(`[${version}]`)) {
    errores.push(`CHANGELOG.md no documenta la versión ${version}`);
  }
}

if (errores.length > 0) {
  console.error('Validación fallida:');
  errores.forEach((e) => console.error(`  - ${e}`));
  process.exit(1);
}
console.log('Validación correcta: estructura y versión coherentes.');
