const express = require('express');
const Trip = require('../models/trip');

const router = express.Router();

// router.use(function timeLog (req, res, next) {
//     console.log('Time: ', Date.now())
//     next()
//    }) //crear carpeta de middlewares


router.get('/', (req, res, next) => {
    const userID = res.locals.currentUser._id;
    res.render('user/user', { userID });
});


router.get('/trips', (req, res, next) => {
    const userID = res.locals.currentUser._id;
    res.render('trips/list', { userID });
});

router.get('/trips/new', (req, res, next) => {
    const userID = res.locals.currentUser._id;
    const tripCategory = Trip.schema.obj.type.enum;
    res.render('trips/new', { userID, tripCategory });
});

router.post('/trips', (req, res, next) => {
    const { tripName, description, duration, petfriendly, difficulty } = req.body;
    const userID = req.session.currentUser._id;
    Trip.create({
      tripName,
      description,
      duration,
      petfriendly,
      difficulty,
      userID,
    })
      .then(() => {
        res.redirect('/user');
      })
      .catch((error) => {
        next(error);
      });
  });
  


  
//   router.get('/', (req, res, next) => {
//     const userID = res.locals.currentUser._id;
//     Move.find({ userID })
//       .then((moves) => {
//         res.render('moves/list', { moves });
//       })
//       .catch((error) => {
//         next(error);
//       });
//   });
  

// router.get('/trips', (req, res, next) => {
//     const userID = res.locals.currentUser._id;
//     Trip.find({ userID })
//       .then((trips) => {
//         res.render('trips/list', { trips });
//       })
//       .catch((error) => {
//         next(error);
//       });
//   });



// router.post('/', (req, res, next) => {
//     const { name, origin, destination } = req.body;
//     const userID = req.session.currentUser._id;
//     Trip.create({
//       name,
//       origin,
//       destination,
//       userID,
//     })
//       .then((createdObject) => {
//         res.redirect('/user');
//       })
//       .catch((error) => {
//         next(error);
//       });
//   });

// router.get('/:id/trips/new', (req, res, next) => {
//     const { id } = req.params;
    
// });

// router.get('/', (req, res, next) => {
//     const userID = res.locals.currentUser._id;
//     res.locals.name = 'asdf';
//     Move.find({ userID })
//       .then((moves) => {
//         res.render('moves/list', { moves });
//       })
//       .catch((error) => {
//         next(error);
//       });
//   });
module.exports = router;