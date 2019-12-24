# Fullstack-challenge-server
- [x] Seed a database of your choice with the provided explorations.
- [x] Implement an API REST written in NodeJS with a framework of your choice that implements the required endpoint.
- [X] Your api endpoint should not be public (Authentication).
- [x] Your api endpoint should be documented.
- [x] At least a unit test of the ideal flow should be implemented.
- [x] It should be easy for your teammates to understand your repo and use your code in the unfortunate case of your sudden combustion.


### Software requirements
```bash
* Node JS ver. ~ 8^
* MongoDB ver. ~ 4^
```


### Import mongo database
```bash
  Unix systems (bash, zsh)
    $ cd seeds
    $ mongoimport --db=eva --collection=bookings --file=bookings.json
    $ mongoimport --db=eva --collection=explorations --file=explorations.json

  Windows (cmd) especify your own route change username and json directory
   $ C:\Program Files\MongoDB\Server\4.2\bin>mongoimport --db=eva --collection=bookings--file=C:\Users\AngelZepeda\Documents\Dev\EVA\eva-fullstack-challenge-server\seeds\bookings.json
   $ C:\Program Files\MongoDB\Server\4.2\bin>mongoimport --db=eva --collection=explorations--file=C:\Users\AngelZepeda\Documents\Dev\EVA\eva-fullstack-challenge-server\seeds\explorations.json
```

## Overview

The API structure contains the following content: 
##### controllers/
  This folder contains all controllers for every model established
  - "booking_controller.js": This controller has one function to list all bookings stored in DB
  - "exploration_controller.js": This controller contains 3 functions to list explorations, filter explorations by clinic and find medications by bookingId.
  - "user_controller.js": This controller contains 4 functions; index function list all users registered, register function store a new user in DB and encrypt the password provided with "bcrypt" package, loginUser function find a user by email and return status code: 200 if the user is found and the password is correct, if you need a user token, send getToken: true as parameter.

##### middlewares/
This folder contains all middlewares, in this case authentication middleware,auth middleware verify if the user token is valid to make a request to endpoints established.


##### models/
  This folder contains all models for every collection in database
  - "Booking.js": This model especify the fields that booking collection needs to be stored in database:
  ```bash
    datetime: String,
    name: String,
    email: String,
    clinicName: String
  ```
  - "Exploration.js" This model especify the fields that exploration collection needs to be stored in database
  ```bash
    consumedMedications: [String],
    bookingId: { type: Schema.Types.ObjectId, ref: 'Booking' }
  ```
  - "User.js" This model especify the fields that user collection needs to be stored in database
   ```bash
      email: String,
      password: String,
      role: {
        type: String,
        default: 'user'
      }
   ```
##### routes/
 This folder contains all routes especified for every controller


#### Exploration routes

- List paginate explorations 
```bash
  GET: /api/v1/explorations/?page=0&limit=2
```

- Search explorations by clinic, medications with strict or lax mode (strict param: TRUE, or FALSE for LAX mode)

```bash
  GET: /api/v1/explorations/search/?clinic=SANTA_FE&medications=HORMONE_THERAPY&page=0&limit=10&strict=true
```

#### Bookings routes

- List paginate bookings 
```bash
  GET: /api/v1/bookings/?page=0&limit=2
```

#### User routes

- Register route, POST example: {email: 'admin@example.com', password: 'admin123'}
```bash
  POST: /api/v1/register
```
- Login route, POST example: {email: 'admin@example.com', password: 'admin123', getToken: true}
```bash
  POST: /api/v1/login
```
- List registered users
```bash
  GET: /api/v1/users
```
- Get USER by id
```bash
  GET: /api/v1/user/:id
```

##### seeds/
 This folder contains two json file, in this files are the bookings and explorations registers ready to import to a Mongo database.

##### services/
This folder contains the service or function to generate a JWT  with (jwt-simple) package, in this file is the secret key to generate it.

##### tests/
This folder contains a test file for some API endpoints
- For tests run these commands
```bash
  $ cd tests
  $ mocha
```
### Usage
```bash
  $ npm i -g nodemon
  $ npm i
  $ npm run dev 
  $ npm i -g mocha (package for run tests)
```






