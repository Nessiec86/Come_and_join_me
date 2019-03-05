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
    Trip.find()
    .then((trips) => {
    res.render('trips/list', {trips});
    })  
    .catch((error) => {
      next(error);
    })
});

router.get('/trips/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const trip = await Trip.findById(id);
    res.render('trips/trip', { trip });
  } catch (error) {
    next(error);
  }  
});

router.post('/trips/:id', (req, res, next) => {
  const UserId = req.session.currentUser._id;
  const { id } = req.params;
  Trip.findByIdAndUpdate(id, {$push: { listOfParticipants: UserId }})
    .then((trips) => {
      console.log(trips);
      res.render('/index');
    })
    .catch((error) => {
      next(error);
    })
});

router.get('/created', (req, res, next) => {
  const userID = res.locals.currentUser._id;
  Trip.find({userID})
    .then((trips) => {
      res.render('trips/created', { trips });
    })
    .catch((error) => {
      next(error);
    })
})

router.get('/created/:id/update', (req, res, next) => {
  const { id } = req.params;
  Trip.findById(id)
    .then((trip) => {
      res.render('trips/update', { trip });
    })
    .catch((error) => {
      next(error);
    })
})

router.post('/created/:id/update', (req, res, next) => {
  const userID = res.locals.currentUser._id;
  const { id } = req.params;
  const { description } = req.body;
  Trip.findByIdAndUpdate(id, { description })
    .then((trip) => {
      res.render('user/user', { userID });
    })
    .catch((error) => {
      next(error);
    })
});

router.post('/created/:id/delete', (req, res, next) => {
  const userID = res.locals.currentUser._id;
  const { id } = req.params;
  Trip.findByIdAndRemove(id)
   .then((trip) => {
     res.render('user/user', { userID });
   })
   .catch((error) => {
     next(error);
   });
});
 
router.get('/new', (req, res, next) => {
    const userID = res.locals.currentUser._id;
    const tripCategory = Trip.schema.obj.tripCategory.enum;
    res.render('trips/new', { userID, tripCategory });
});

/*doesn´t save tripCategory*/
router.post('/new', (req, res, next) => {
    const { tripCategory, tripName, description, duration, petfriendly, difficulty } = req.body;
    const userID = req.session.currentUser._id;
    const listOfParticipants = req.session.currentUser._id;
    Trip.create({
      tripCategory,
      tripName,
      description,
      duration,
      petfriendly,
      difficulty,
      userID,
      listOfParticipants
    })
      .then((createdObject) => {
        res.render('user/user', { userID });
      })
      .catch((error) => {
        next(error);
      });
  });
  
module.exports = router;