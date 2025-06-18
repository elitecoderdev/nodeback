# Documentación de la API de Prescripciones

## Tabla de Contenidos

1. [Requisitos](#requisitos)
2. [Instalación y Configuración](#instalación-y-configuración)
3. [Estructura del Proyecto](#estructura-del-proyecto)
4. [Endpoints de la API](#endpoints-de-la-api)
5. [Estructura de Datos](#estructura-de-datos)
6. [Variables de Entorno](#variables-de-entorno)
7. [Ejemplos con Postman y cURL](#ejemplos-con-postman-y-curl)
8. [Despliegue](#despliegue)
9. [Resumen de Versiones](#resumen-de-versiones)

---

## Requisitos

* **Node.js Versión:** 14.x o superior
* **NPM Versión:** 6.x o superior
* **Opcional:** Docker 20.x o superior

---

## Instalación y Configuración

1. **Clonar el repositorio**

   ```bash
   git clone https://github.com/elitecoderdev/nodeback
   cd nodeback
   ```

2. **Instalar dependencias**

   ```bash
   npm install
   ```

3. **Generar datos de prueba**

   ```bash
   npm run generate-data
   ```

   Esto crea `src/data/prescriptions.json` con un conjunto estático de datos.

4. **Iniciar el servidor (desarrollo)**

   ```bash
   npm run dev
   ```

   La API estará disponible en `http://localhost:8000`.

5. **Iniciar el servidor (producción)**

   ```bash
   npm start
   ```

---

## Estructura del Proyecto

```
prescription-api/
├── src/
│   ├── controllers/
│   │   └── prescriptionController.js
│   ├── data/
│   │   └── prescriptions.json
│   ├── routes/
│   │   └── prescriptionRoutes.js
│   ├── scripts/
│   │   └── generatePrescriptions.js
│   ├── services/
│   │   └── prescriptionService.js
│   ├── app.js
│   └── server.js
├── package.json
├── .gitignore
└── README.md
```

---

## Endpoints de la API

### GET `/recipes`

Obtiene registros de prescripciones con paginación y filtros.

* **Parámetros de consulta (query):**

  * `page` (entero, por defecto `1`)
  * `limit` (entero, por defecto `20`)
  * `search` (cadena) — busca en `medication`, `doctor` o `notes`
  * `startDate` (YYYY-MM-DD)
  * `endDate` (YYYY-MM-DD)

* **Respuesta:**

  ```json
  {
    "data": [
      {
        "id": "uuid",
        "patientId": "uuid",
        "medication": "Amoxicillin 250mg",
        "issuedAt": "2025-02-13",
        "doctor": "Dr. Jane Doe",
        "notes": "Take twice daily"
      }
      // …
    ],
    "meta": {
      "totalRecords": 120,
      "totalPages": 6,
      "currentPage": 2,
      "pageSize": 20
    }
  }
  ```

---

## Estructura de Datos

La API utiliza un conjunto estático de JSON (`src/data/prescriptions.json`) con objetos de la siguiente forma:

| Campo        | Tipo   | Descripción                                   |
| ------------ | ------ | --------------------------------------------- |
| `id`         | String | UUID de la prescripción                       |
| `patientId`  | String | UUID del paciente                             |
| `medication` | String | Nombre del medicamento + dosis (e.g. “500mg”) |
| `issuedAt`   | String | Fecha ISO (YYYY-MM-DD)                        |
| `doctor`     | String | Nombre del doctor                             |
| `notes`      | String | Notas adicionales                             |

---

## Variables de Entorno

| Variable | Valor por Defecto | Descripción                                  |
| -------- | ----------------- | -------------------------------------------- |
| `PORT`   | `8000`            | Puerto en el que escucha el servidor Express |

Para sobrescribir el valor, crea un archivo `.env` en la raíz:

```bash
PORT=8000
```

---

## Ejemplos con Postman y cURL

### 1. Solicitud por defecto (page 1, limit 20)

```bash
curl -X GET "http://localhost:8000/recipes"
```

### 2. Paginación (page 2, limit 10)

```bash
curl -X GET "http://localhost:8000/recipes?page=2&limit=10"
```

### 3. Búsqueda por medicamento/doctor/notas

```bash
curl -G "http://localhost:8000/recipes" \
     --data-urlencode "search=Aspirin"
```

### 4. Filtro por rango de fechas

```bash
curl -X GET "http://localhost:8000/recipes?startDate=2025-01-01&endDate=2025-03-31"
```

### 5. Parámetros combinados

```bash
curl -G "http://localhost:8000/recipes" \
     --data-urlencode "page=3" \
     --data-urlencode "limit=5" \
     --data-urlencode "search=Dr.%20Jane%20Doe" \
     --data-urlencode "startDate=2024-06-01" \
     --data-urlencode "endDate=2025-06-17"
```

#### Postman

1. **Importar** los comandos cURL en Postman (File → Import → Raw Text).
2. **Enviar** las solicitudes para inspeccionar `data` y `meta` en la respuesta JSON.

---

## Despliegue

### Usando Docker Compose

```bash
docker-compose up --build
docker-compose down
```

---

## Resumen de Versiones

* **Node.js:** 14.x o superior
* **NPM:** 6.x o superior
* **Dependencias:**

  * express
  * date-fns
  * @faker-js/faker
  * uuid
  * cors
* **Herramientas de desarrollo:**

  * nodemon

---
