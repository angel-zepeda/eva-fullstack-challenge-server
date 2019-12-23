# Fullstack-challenge-server
- [x] Seed a database of your choice with the provided explorations.
- [x] Implement an API REST written in NodeJS with a framework of your choice that implements the required endpoint.
- [X] Your api endpoint should not be public (Authentication).
- [x] Your api endpoint should be documented.
- [x] At least a unit test of the ideal flow should be implemented.
- [x] It should be easy for your teammates to understand your repo and use your code in the unfortunate case of your sudden combustion.

### Main commands
```bash
  npm i
  npm i -g mocha (package for run tests)
  npm run dev
```

### Import mongo database
```bash
  cd seeds
  1) mongoimport --db=eva --collection=bookings --file=bookings.json
  2) mongoimport --db=eva --collection=explorations --file=explorations.json
```
### Exploration routes

- List paginate explorations 
```bash
  GET: /api/v1/explorations/?page=0&limit=2
```

- Search explorations by clinic, medications with strict or lax mode (strict param: TRUE, or FALSE for LAX mode)

```bash
  GET: /api/v1/explorations/search/?clinic=SANTA_FE&medications=HORMONE_THERAPY&page=0&limit=10&strict=true
```

### Bookings routes

- List paginate bookings 
```bash
  GET: /api/v1/bookings/?page=0&limit=2
```

### User routes

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

### Test

- For run test for some routes
```bash
  cd tests
  mocha
```





