const express = require('express');
const router = express.Router();
//export trip model

/* GET users listing. */
router.get('/index', (req, res, next) => {
  res.render('trips/home');
});

module.exports = router;
