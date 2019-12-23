# Fullstack-challenge-server

### Main commands
```bash
  npm i
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

### Exploration routes

- List paginate bookings 
```bash
  GET: /api/v1/bookings/?page=0&limit=2
```






