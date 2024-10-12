var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usuariosRouter = require('./routes/usuario');  
var empresaRouter = require('./routes/empresa');
var medioTransporteRouter = require('./routes/medioTransporte');
var reservaRouter = require('./routes/reserva');
var ventasRouter = require('./routes/ventas');
var viajesRouter = require('./routes/viajes');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/usuarios', usuariosRouter);
app.use('/empresa', empresaRouter);
app.use('/medioTransporte', medioTransporteRouter);
app.use('/reserva', reservaRouter);
app.use('/ventas', ventasRouter);
app.use('/viajes', viajesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

// Configuración del puerto y servidor
var port = process.env.PORT || '3000';
app.set('port', port);

var server = app.listen(port, function() {
  console.log('Server is listening on port ' + port);
});

// Manejo de errores en el servidor
server.on('error', function(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

 // Manejo de errores específicos
switch (error.code) {
  case 'EACCES':
    console.error(bind + ' requiere privilegios elevados');
    process.exit(1);
    break;
  case 'EADDRINUSE':
    console.error(bind + ' ya está en uso');
    process.exit(1);
    break;
  default:
    throw error;
}
});