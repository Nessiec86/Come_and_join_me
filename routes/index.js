const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const saltRounds = 10;
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index');
});

// SIGN UP !
router.get('/signup', (req, res, next) => {
  res.render('auth/signup', /*{ errorMessage: req.flash('error') }*/);
});
  
router.post('/signup', /*middlewares.anonRoute,*/ (req, res, next) => {
  const { username, surname, firstName, password, email } = req.body;

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
        User.create({ username, surname, firstName, password: hashedPassword, email })
          .then(() => {
            res.redirect('/login');
          }).catch((error) => {
            next(error);
          });
      }
    })
    .catch((error) => {
      next(error);
    });
});

// LOGIN!!
router.get('/login', (req, res, next) => {
  res.render('auth/login');
});

router.post('/login', /*middlewares.anonRoute,*/ (req, res, next) => {
  const { username, password } = req.body;
  if (username === '' || password === '') {
    //req.flash('error', 'no empty fields');
    //req.flash('info', 'no empty fields');
    return res.redirect('/login');
  } else {
    User.findOne({ username })
      .then((user) => {
        if (!user) {
         // req.flash('error', 'usuario no existe');
         console.log('usuario no existe');
          return res.redirect('/login');
        } else if (bcrypt.compareSync(password, user.password)) {
          req.session.currentUser = user;
          //req.flash('success', 'usuario logeado correctamente');
          res.redirect('/user');
        } else {
          //req.flash('error', 'usuario incorrecto');
          return res.redirect('/login');
        }
      })
      .catch((error) => {
        next(error);
      });
  }
});

//LOGOUT!!
router.get('/logout', (req, res, next) => {
  req.session.destroy((err) => {
    res.redirect('/');
  });
});

module.exports = router;
