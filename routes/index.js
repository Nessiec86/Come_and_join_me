const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const saltRounds = 10;
const router = express.Router();
//exportar user models

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index');
});
// SIGN UP !
router.get('/signup', (req, res, next) => {
  res.render('auth/signup', /*{ errorMessage: req.flash('error') }*/);
});
  
router.post('/signup', /*middlewares.anonRoute,*/ (req, res, next) => {
  const { username, password } = req.body;

  if (username === '' || password === '') {
    return res.redirect('/signup');
  }
  User.findOne({ username })
    .then((user) => {
      if (user) {
        //req.flash('error', 'el usuario no existe');
        res.redirect('/signup');
      } else {
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = bcrypt.hashSync(password, salt);
        User.create({ username, password: hashedPassword })
          .then(() => {
            res.redirect('/user');
          }).catch((error) => {
            next(error);
          });
      }
    })
    .catch((error) => {
      next(error);
    });
});




router.get('/login', (req, res, next) => {
  res.render('auth/login');
});

module.exports = router;
