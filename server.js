const express = require('express')
const bodyParser = require("body-parser")
const app = express ()
const passport = require('passport')
const bcrypt = require('bcrypt')
// const router = express.Router()
const session = require('express-session')

const PORT = 4567

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/public', express.static('public'));

// methods for password hashing
const generateHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)

// methods for authentication
const validPassword = (plainTextPassword, passwordHash) => bcrypt.compareSync(plainTextPassword, passwordHash)

// enabling sessions - this block enables sessions in middleware
app.use(session({
  key: 'user_sid',
  secret: process.env['EXPRESS_SESSION_SECRET_KEY'],
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 600000 }
}))

// HOMEPAGE
app.get('/', (req, res) => {
  res.render('index', {userId: req.session.userId})
})

// LOG IN PAGE
app.get('/login', (req, res) => {
  res.render('login')
})

// REGISTRATION PAGE
app.get('/register', (req, res) => {
  res.render('register')
})

//SECTION 1
// Logging a user in
app.post('/session', (req, res) => {
  const email = req.body.email_address
  const password = req.body.password
  run_sql('SELECT * FROM users WHERE email_address = $1', [email], db_res => {
    if (db_res.rows.length == 0) {
      res.render('login')
    } else {
      const user = db_res.rows[0]
      if (validPassword(password, user.password_digest)) {
        req.session.userId = user.id
        res.redirect('/')
      } else {
        res.render('login')
      }
    }
  })
})

// Logging a user out
app.delete('/session', (req, res) => {
  req.session.userId = undefined
  req.session.destroy();
  res.redirect('/')
})

//SECTION 2
// Creating a new user
app.post('/users', (req, res) => {
  const email = req.body.email
  const password = req.body.password
  const password_digest = generateHash(password)
  run_sql('INSERT INTO users(email, password_digest) VALUES($1, $2)', [email, password_digest], db_res => {
    res.redirect('/')
  })
})

//SECTION 3
// Setting up database connection
const pg = require('pg')
let pool = new pg.Pool({
    database: 'food_db'  
}) 

// making requests to the database
function run_sql(sql, values = [], cb) {
  pool.query(sql, values, (err, res) => {
    cb(res)
  })
}





// Start the server
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))