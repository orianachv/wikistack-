var express = require('express');
var userRouter = express.Router();

userRouter.get('/', (req, res) => {
  res.send('trae todos los usuarios');
});

userRouter.get('/:id', (req, res) => {
  res.send('trae un usuario especifico ');
});

userRouter.post('/', (req, res) => {
  res.send('agrega un usuario');
});
userRouter.put('/:id', (req, res) => {
  res.send('modifica un usuario especificop ');
});

userRouter.delete('/:id', (req, res) => {
  res.send('elimina un usuario');
});
module.exports = userRouter;
