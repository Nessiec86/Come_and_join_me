# Project Name
Who´ll come with me?
## Description

The application consists of the possibility to create or participated in a trip. As a user you can create different sport activities such as hiking, skiing, bike trip etc. or participate in an activity.
 
## User Stories
- **Homepage** - As a user I want to be able to open the Homepage so that I see what the app is about and have the login and signup options.
- **Sign up** - As a user I want to be able to sign up on the webpage so that I can create/attend trips.
- **Login** - As a user I want to be able to log in on the webpage so that I can get to my account/user page.
- **Logout** - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account.
- **Trip Search** - As a user I want to have the search option to be able to find a trip based on given criteria.
- **Trips List** - As a user I want to be able to see a list of all trips based on the search criteria.
- **Create Trip** - As a user I want to have the possibility to create a trip so that other users can join me.
- **Join Trip** - As a user I want to have the possibility to join a trip.
- **Trips I Joined** - As a user I want to be able to see a list of trips in which I participate.
- **Trips I Created** - As a user I want to be able to see a list of trips I created.
- **Delete participation** - As a user I want to have the option to sign out of a trip.
- **Trip Detail** - As a user I want to be able to see the trip details (Trip Name, Activity Type, Difficulty, Dates, Duration, Description, Organizer, Necessary equipment, List of participants).
- **Trip Update** - As a user I want to be able to modify/update a trip that I created.
- **Profile Information** - As a user I want to have a profile site to see my user information.
- **Calendar** - As a user I want to see the trip date.
- **404** - As a user I want to see a 404 page when I go to a page that doesn´t exist so that I know it was my fault.
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that it is not my fault.

## Backlog

List of other features outside of the MVP scope:

User Profile:
- Forgot Password option.
- Messages from/to other users.
- Average star punctuation based on the accomplished trips.
- Search trip creators.
- Confirm password while creating a new account.
- Notifications in case a trip in which I participate has been    modified.

Trip Definition:
- Pet friendly search criteria.
- Geo location.
- Needed equipment – link to where necessary equipment can be     bought (Amazon? Decathlon?).
- Link to average year weather.

Geo Location:
- Add geolocation to trips when creating a trip.
- See a map where a trip takes place (apart from the location     description in Trip Description Field).
- Show all trips in a map in the trip list page.

Trip expiry:
- Once a trip date passed, trip would be deleted (with enough     time for the users to give a feedback about the creator).

Trip feedback:
- Star punctuation of a trip creator.
  

## ROUTES:  Ejemplo de tabla de cómo debe quedar

| Method      | Description | Test Text     |
| :---        |    :----:   |          :---:|
| GET         | /home       | Renders the homepage   |
| GET         | /signup|redirects to /:userid if user logged in|
| POST        | /signup|redirects to /:userid if user logged in|
| GET         | /login |redirects to /signup if user don't have account|
| POST        | /login |redirects to /signup if user don't hace account|
| GET         | /:userid    | Renders the userpage|
| GET         | /:userid/createtrip | 
| POST        | /:userid/createtrip |
| GET         | /:userid/tripsicreated |
| GET         | /:userid/tripsicreated/:tripid |
| GET         | /:userid/tripsisignedin |
| GET         | /:userid/tripsisignedin/:tripid |
| GET         | /:userid/search |
| POST        | /:userid/search |
| GET         | /:userid/search/searchresults |
| GET         | /:userid/search/searchresults/:tripid |
| GET         | /:userid/profile |


- GET /home
  - renders the homepage
- GET /auth/signup
  - redirects to /home if user logged in
  - renders the signup form
- POST /auth/signup
  - redirects to /home if user logged in
  - body:
    - username
    - firstname
    - lastname
    - email
    - password
  - validation
    - fields not empty
    - user not exists
  - create user with encrypted password
  - store user in session
  - redirect to /user
- GET /auth/login
  - redirects to /home user logged in
  - renders the login form
- POST /auth/login
  - redirects to /home if user logged in
  - body:
    - username
    - password
  - validation
    - fields not empty
    - user exists
    - passdword matches
  - store user in session
  - redirect to /user
- POST /auth/logout
  - body: (empty)
  - redirect to /home

- GET /:userid
  - redirects to /home if user is anonymous
  - renders user profile + control buttons
- GET /:userid/createtrip 
  - redirects to /home if user is anonymous
  - trip model: 
    - name
    - type
    - duration
    - date
    - description
    - dificulty
    - list of participants
    - organizer
    - necessary equipment
  - validation
    - fields not empty
- POST /:userid/createtrip
  - create trip
  - redirect to /user/:userid/tripsicreated details

- GET /user/:userid/tripsicreated/:tripid
  - redirects to /home if user is anonymous
  - validation
    - id is valid (next to 404)
    - id exists (next to 404)
  - renders the trip detail page
  - includes the list of attendees
  - attend button if user not attending yet
- POST /user/:userid/tripsicreated/:tripid
  - redirects to /home if user is anonymous
  - validation
    - id is valid (next to 404)
    - id exists (next to 404)
  - search trip:id and add user:id to List of participans
  - body: (empty - the user is already stored in the session)
  - store if not there yet
  - redirect to /user/:userid details

- GET  /:userid/tripsisignedin
  - redirects to /home if user is anonymous
  - validation
    - id is valid (next to 404)
    - id exists (next to 404)
  - render the (trip I signed in) list page
- GET /:userid/tripsisignedin/:tripid
  - redirects to /home if user is anonymous
  - validation
    - id is valid (next to 404)
    - id exists (next to 404)
  - search :tripid and render the page

- GET /:userid/search 
  - redirects to /home if user is anonymous
  - render search form to filter trips
- POST /:userid/search 
  - redirects to /home if user is anonymous
  - redirects to /:userid/search/searchresults 
- GET /:userid/search/searchresults
  - render list of results based on the search criteria
- GET /:userid/search/searchresults/:tripid
  - search :tripid and render the page
- GET /:userid/profile 
  - render the user profile page
  

## Models


Trip Model
```javascript
{
_id: ObjectId,
tripName: String required: true, default: 'new trip',
type: [String],
date: Date,
duration: Number,
description: String,
difficulty: Number,
listOfParticipants: [ObjectId, ref: 'Users'],
organizer: ObjectId,
necessaryEquipment: [String]
}
```
User Model
```javascript
{
_id: ObjectId,
username: String,
firstName: String,
surname: String,
eMail: String,
TripIdCreated: [ObjectId],
TripIdJoined: Array
}
```

## Links

### Trello

[Link to your trello board](https://trello.com/b/niPqHEhC/trip) or picture of your physical board

### Git

The url to your repository and to your deployed project

[Repository Link](http://github.com)

[Deploy Link](http://heroku.com)

### Slides

The url to your presentation slides

[Slides Link](http://slides.com)


