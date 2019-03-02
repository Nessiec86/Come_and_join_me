const express = require('express');
const router = express.Router();

router.get('/user/:id', (req, res, next) => {
    const { id } = req.params;
  
});

module.exports = router;