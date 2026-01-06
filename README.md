# Microservicio Ventas/Gastos (Sequelize)

![Node.js](https://img.shields.io/badge/Node.js-16+-green)
![Express](https://img.shields.io/badge/Express-4.18-blue)
![Sequelize](https://img.shields.io/badge/Sequelize-6.35-orange)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-12+-blue)
![JWT](https://img.shields.io/badge/JWT-Authentication-red)

Microservicio para gestión de ventas y gastos utilizando Node.js, Express y Sequelize ORM con PostgreSQL. Incluye autenticación JWT y rastreo de usuarios.

## 🚀 Características

- ✅ CRUD completo de Ventas y Gastos
- ✅ Autenticación JWT integrada
- ✅ Campo `usuario_id` para rastrear quién creó cada registro
- ✅ Soft delete (eliminación lógica)
- ✅ Filtros por período (día, semana, mes, año)
- ✅ Dashboard con datos agregados
- ✅ Importación masiva desde JSON
- ✅ Migraciones con Sequelize

## Requisitos

- Node.js 16+
- PostgreSQL 12+
- npm o yarn

## Instalación

1. Clonar el repositorio:

```bash
git clone <repository-url>
cd backend-finanzas-sequelize
```

2. Instalar dependencias:

```bash
npm install
```

3. Configurar variables de entorno:

```bash
cp .env.example .env
```

Editar el archivo `.env` con tus credenciales de PostgreSQL:

```
PORT=3001
DB_HOST=localhost
DB_PORT=5432
DB_NAME=finanzas_db
DB_USER=postgres
DB_PASSWORD=tu_password
```

4. Crear la base de datos:

```bash
createdb finanzas_db
```

5. Ejecutar migraciones:

```bash
npm run migrate
```

## Ejecución

### Modo desarrollo:

```bash
npm run dev
```

### Modo producción:

```bash
npm start
```

El servidor estará disponible en `http://localhost:3001`

## Endpoints

### Ventas

- **POST /ventas** - Crear una venta

  ```json
  {
    "fecha": "2026-01-06",
    "categoria": "Producto A",
    "monto": 1500.0,
    "descripcion": "Venta de producto"
  }
  ```

- **GET /ventas** - Listar ventas

  - Query params: `periodo` (dia, semana, mes, año)
  - Ejemplo: `GET /ventas?periodo=mes`

- **PUT /ventas/:id** - Actualizar venta

  ```json
  {
    "fecha": "2026-01-06",
    "categoria": "Producto B",
    "monto": 2000.0,
    "descripcion": "Venta actualizada"
  }
  ```

- **DELETE /ventas/:id** - Eliminar venta (soft delete)

### Gastos

- **POST /gastos** - Crear un gasto

  ```json
  {
    "fecha": "2026-01-06",
    "categoria": "Servicios",
    "monto": 500.0,
    "descripcion": "Pago de servicios"
  }
  ```

- **GET /gastos** - Listar gastos

  - Query params: `periodo` (dia, semana, mes, año)
  - Ejemplo: `GET /gastos?periodo=semana`

- **PUT /gastos/:id** - Actualizar gasto

  ```json
  {
    "fecha": "2026-01-06",
    "categoria": "Transporte",
    "monto": 300.0,
    "descripcion": "Gasto actualizado"
  }
  ```

- **DELETE /gastos/:id** - Eliminar gasto (soft delete)

### Dashboard

- **GET /dashboard/line-chart** - Obtener datos agregados para gráficos
  - Query params: `periodo` (semana, mes, año)
  - Ejemplo: `GET /dashboard/line-chart?periodo=mes`

### Importar datos

- **POST /import-json** - Importar datos desde JSON
  ```json
  {
    "tipo": "ventas",
    "datos": [
      {
        "fecha": "2026-01-01",
        "categoria": "Producto A",
        "monto": 1000,
        "descripcion": "Venta 1"
      },
      {
        "fecha": "2026-01-02",
        "categoria": "Producto B",
        "monto": 1500,
        "descripcion": "Venta 2"
      }
    ]
  }
  ```

## Migraciones

Crear una nueva migración:

```bash
npx sequelize-cli migration:generate --name nombre-migracion
```

Ejecutar migraciones:

```bash
npm run migrate
```

Revertir última migración:

```bash
npm run migrate:undo
```

## Estructura del proyecto

```
backend-finanzas-sequelize/
├── src/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── ventasController.js
│   │   ├── gastosController.js
│   │   ├── dashboardController.js
│   │   └── importController.js
│   ├── models/
│   │   ├── index.js
│   │   ├── venta.js
│   │   └── gasto.js
│   ├── migrations/
│   │   ├── 20260106000001-create-ventas.js
│   │   └── 20260106000002-create-gastos.js
│   ├── routes/
│   │   ├── ventas.js
│   │   ├── gastos.js
│   │   ├── dashboard.js
│   │   └── import.js
│   └── index.js
├── .env.example
├── .sequelizerc
├── package.json
└── README.md
```

## Pruebas con Postman

Importar la colección `postman_collection.json` en Postman para probar todos los endpoints.

## Notas

- Todos los endpoints de eliminación implementan soft delete (no borran físicamente)
- Los filtros de fecha funcionan con: dia, semana, mes, año
- El endpoint de importación acepta arrays de datos en formato JSON
