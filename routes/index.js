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

router.get('/signup', (req, res, next) => {
  res.render('auth/signup');
});

router.get('/login', (req, res, next) => {
  res.render('auth/login');
});

module.exports = router;
