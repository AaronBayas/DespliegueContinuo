# Sistema de Registro de Incidencias

Aplicación web sencilla para registrar las incidencias que reportan los usuarios de un sistema y consultarlas por estado. Está hecha con HTML, CSS y JavaScript sin dependencias: no necesita base de datos ni servidor, porque guarda la información en el `localStorage` del navegador.

Proyecto académico de la asignatura **Gestión de la Configuración del Software** (Unidad 3, Tema 3: Despliegue continuo).

## Aplicación publicada

https://aaronbayas.github.io/DespliegueContinuo/

## Funcionalidades por versión

| Versión | Cambios |
|---------|---------|
| v1.0.0 | Registro de incidencias con validación y listado en tabla |
| v1.1.0 | Filtro de incidencias por estado (Abierta, En progreso, Cerrada) |

## Estructura

```
├── index.html               Interfaz principal
├── css/styles.css           Estilos
├── js/incidencias.js        Lógica: validar, crear, filtrar y registrar
├── js/almacenamiento.js     Persistencia en localStorage
├── js/app.js                Conexión entre la interfaz y la lógica
├── tests/                   Pruebas unitarias (node --test)
├── scripts/validar.js       Validación de estructura y versión
├── docs/releases/           Notas de cada release
└── .github/workflows/       Flujo de CI/CD con GitHub Actions
```

## Cómo ejecutarla en local

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/AaronBayas/DespliegueContinuo.git
   cd DespliegueContinuo
   ```
2. Levantar un servidor estático (los módulos de JavaScript no cargan con `file://`):
   ```bash
   python3 -m http.server 8080
   # o bien: npx serve .
   ```
3. Abrir http://localhost:8080 en el navegador.

## Pruebas y validación

Requiere Node.js 20 o superior.

```bash
npm run validar   # revisa archivos, enlaces y coherencia de versión
npm test          # ejecuta las pruebas unitarias
```

## Despliegue continuo

Cada push a `main` ejecuta el workflow `.github/workflows/deploy.yml`:

1. **validar**: corre `npm run validar` y `npm test`.
2. **desplegar**: si la validación pasa, publica `index.html`, `css/` y `js/` en GitHub Pages.

En los pull requests solo se ejecuta la validación.

## Flujo de trabajo del equipo

- `main` contiene siempre la versión estable y desplegada.
- Cada integrante trabaja en su rama (`feature/...` o `fix/...`) y entrega mediante pull request.
- Los mensajes de commit siguen Conventional Commits (`feat:`, `fix:`, `test:`, `docs:`, `ci:`, `chore:`, `style:`).
- Las versiones siguen SemVer (`MAJOR.MINOR.PATCH`) y se publican como releases con etiqueta `vX.Y.Z`.

## Integrantes

| Integrante | Usuario GitHub | Responsabilidad |
|------------|----------------|-----------------|
| Jostin Fernando Chalan Mora | @jostin49 | Configuración del repositorio y CI/CD |
| Jefferson Antonio Zambrano Jama | @Ing-Jeff-Zambrano | Lógica de registro y pruebas |
| Aaron Alejandro Bayas Caicedo | @AaronBayas | Formulario HTML |
| Jean Suarez Acevedo | @jeandaly20 | Estilos y listado de incidencias |
| Mayerly Anabela Piloso Muñoz | @Piloso-Mayerly | Filtro por estado (v1.1.0) |
