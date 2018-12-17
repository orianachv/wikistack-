const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const routes = require('./routes/index');
const models = require('./models');
// body parsing middleware
app.use(bodyParser.urlencoded({ extended: true })); // para HTML form submits
app.use(bodyParser.json()); // seria para AJAX requests

// templating boilerplate setup
app.engine('html', nunjucks.render); // como renderear templates html
app.set('view engine', 'html'); // que extensiones de archivo tienen los templates
nunjucks.configure('views', { noCache: true }); // donde encontrar las views

// rutas modulares
app.use('/', routes);

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public')));
models.User.sync({ force: false })
  .then(function() {
    return models.Page.sync({});
  })
  .then(function() {
    // asegurate de reemplazar el nombre de abajo con tu app de express
    app.listen(3002, function() {
      console.log('Server is listening on port 3002!👍 👍');
    });
  })
  .catch(console.error);
