const express = require('express');
const Trip = require('../models/trip');
const User = require('../models/user');
const middlewares = require('../middlewares');

const router = express.Router();

router.use(middlewares.protectedRoute);

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
  let usernames = [];
 
  try {
    const allUsers = await User.find()
    allUsers.forEach(user => {
      user.tripJoined.forEach(trip => {
        if (trip == id) {
          usernames.push(user.username)
        }
      })
    })
    Trip.findById(id).then(trip => {
      res.render('trips/trip', { allUsers, id, trip, usernames });
    });
  } catch (error) {
    next(error);
  }
});

router.post('/trips/:id', (req, res, next) => {
  const userId = res.locals.currentUser._id;
  const {id} = req.params;
  const user = res.locals.currentUser;
  User.findByIdAndUpdate(userId, {$push: { tripJoined: id }})
  .then((id) => {
         res.redirect('/user/joined');
        })
    .catch((error) => {
      next(error);
    })
})
  

router.get('/joined', (req, res, next) => {
  const userId = res.locals.currentUser._id;
  const tripJoined = res.locals.currentUser.tripJoined;
  const user = User.findById(userId).populate('tripJoined')
    .then((user) => {
      res.render('trips/joined', { tripJoined, user })
   })
   .catch((error) => {
    next(error);
   })
 })

 router.post('/joined/:id/remove', async (req, res, next) => {
  const { id } = req.params;
  const userId = req.session.currentUser._id;
  try {
    await
    User.findByIdAndUpdate(userId, { $pull: { tripJoined: id }})
    res.redirect('/user/joined');
  } catch (error) {
      next(error);
    }
 })

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
  const tripCategory = Trip.schema.obj.tripCategory.enum;
  const difficulty = Trip.schema.obj.difficulty.enum;
  Trip.findById(id)
    .then((trip) => {
      res.render('trips/update', { trip, tripCategory, difficulty });
    })
    .catch((error) => {
      next(error);
    })
})

router.post('/created/:id/update', (req, res, next) => {
  const userID = res.locals.currentUser._id;
  const { id } = req.params;
  const { tripCategory, tripName, description, duration, necessaryEquipment, petfriendly, difficulty } = req.body;
  Trip.findByIdAndUpdate(id, { tripCategory, tripName, description, duration, necessaryEquipment, petfriendly, difficulty })
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
    const difficulty = Trip.schema.obj.difficulty.enum;
    const duration = Trip.schema.obj.duration;
    res.render('trips/new', { userID, tripCategory, difficulty, duration });
});

router.post('/new', (req, res, next) => {
    const { tripCategory, tripName, description, hours, mins, necessaryEquipment, petfriendly, difficulty, date } = req.body;
    const userID = req.session.currentUser._id;
    const listOfParticipants = req.session.currentUser._id;
    Trip.create({
      tripCategory,
      tripName,
      date,
      description,
      duration: {
        hours,
        mins
      },
      necessaryEquipment,
      petfriendly,
      difficulty,
      userID,
      listOfParticipants
    })
      .then((trip) => {
        req.flash('success', 'Trip created!');
        res.render('user/user', { userID });
      })
      .catch((error) => {
        next(error);
      });
  });

router.get('/profile', (req, res, next) => {
  const user = req.session.currentUser;
  User.find(user)
    .then ((user) => {
      res.render('user/profile', {user});
    })
    .catch((error) => {
      next(error);
    })
})

router.get('/profile/update', (req, res, next) => {
  const user = req.session.currentUser;
  Trip.find(user)
    .then((user) => {
      res.render('user/profileupdate', { user });
    })
    .catch((error) => {
      next(error);
    })
})

router.post('/profile/update', (req, res, next) => {
  const userId = req.session.currentUser._id;
  const { firstName, surname, email } = req.body;
  User.findByIdAndUpdate(userId, { firstName, surname, email })
    .then((userId) => {
      res.render('user/profile');
    })
    .catch((error) => {
      next(error);
    })
});


module.exports = router;