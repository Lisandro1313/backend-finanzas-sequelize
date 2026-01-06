require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./models');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/ventas', require('./routes/ventas'));
app.use('/gastos', require('./routes/gastos'));
app.use('/dashboard', require('./routes/dashboard'));
app.use('/import-json', require('./routes/import'));

// Ruta de prueba
app.get('/', (req, res) => {
    res.json({ mensaje: 'Microservicio de Ventas/Gastos funcionando' });
});

// Sincronizar base de datos y arrancar servidor
db.sequelize.authenticate()
    .then(() => {
        console.log('Conexión a la base de datos exitosa');
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en puerto ${PORT}`);
        });
    })
    .catch(err => {
        console.error('No se pudo conectar a la base de datos:', err);
    });
