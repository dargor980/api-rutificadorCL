# API Rutificador Chileno

Este proyecto expone una API REST construida con **Node.js** y **Express** que permite consultar datos de personas en Chile a partir de su RUT o nombre. Internamente realiza peticiones al sitio [rutificador.org](https://rutificador.org) para obtener la información.

## Tecnologías utilizadas

- Node.js
- Express
- Cheerio
- request-promise
- Winston (logging)
- Docker (opcional)

## Instalación y puesta en marcha

1. Clonar este repositorio.
2. Instalar las dependencias con `npm install`.
3. Iniciar el servidor con `npm start`.
4. La aplicación quedará disponible en `http://localhost:3000` por defecto.

También existe un **Dockerfile** y un ejemplo de `docker-compose.yml` para levantar el proyecto con contenedores.

## Endpoints principales

- `GET /api/v1/persona/rut/:rut` – Busca información de una persona a partir de su RUT.
- `GET /api/v1/persona/buscar/:nombre` – Devuelve un listado de personas que coincidan con el nombre indicado.
- `GET /` – Página de inicio con documentación y ejemplo de uso.

## Licencia

Distribuido bajo la licencia GNU GPL v3.
