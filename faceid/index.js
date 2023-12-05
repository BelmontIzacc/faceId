const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const favicon = require('serve-favicon');
const handleError = require('./middleware/error.middleware');

const app = express();

const faviconPath = path.join(__dirname, '', 'favicon.ico');
app.use(favicon(faviconPath)); 

// Puerto de conexion
app.set('port', process.env.PORT || 3030);

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Motor de plantillas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static( path.join(__dirname, '/views/static')));

//path principal
const name = "/api/v1";

// Rutas
app.use(name + '/', require('./routers/faceId.routers'));

// Esta ruta será una vista por defecto para rutas no definidas
app.use((req, res) => { res.render(path.join(__dirname, '/views/error404.ejs')) });

// Middleware de manejo de errores personalizado
app.use(handleError);

// Inicia el servidor
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});