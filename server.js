const express = require('express')
const bodyParser = require("body-parser")
const app = express ()
const passport = require('passport')
const bcrypt = require('bcrypt')
// const router = express.Router()
const methodOverride = require('method-override')
const session = require('express-session')

const port = process.env.PORT || 3000

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/public', express.static('public'));

// allowing PATCH and DELETE requests to come through
app.use(methodOverride('_method'))

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

// API food db
app.get('/api/food_db', (req, res) => {
  var dish = req.query.searchText
  run_sql(`SELECT * FROM food_details WHERE dish LIKE '%${dish}%'`, [], db_res => {

    console.log(db_res)
    res.json(db_res.rows)
  })
  
})

// HOMEPAGE
app.get('/', (req, res) => {
  res.render('index', {userId: req.session.userId, firstName: req.session.firstName})
})

// LOG IN PAGE
app.get('/login', (req, res) => {
  res.render('login')
})

// REGISTRATION PAGE
app.get('/register', (req, res) => {
  res.render('register')
})

// CALCULATOR PAGE
app.get('/calculator', (req, res) => {
  res.render('calculator')
})

//SECTION 1
// Logging a user in
app.post('/session', (req, res) => {
  const email = req.body.email
  const password = req.body.password
  console.log(password)
  run_sql('SELECT * FROM users WHERE email_address = $1', [email], db_res => {
    if (db_res.rows.length == 0) {
      res.render('login')
      console.log("no records returned from database")

    } else {
      console.log("records ARE returned from db")

      const user = db_res.rows[0]
      if (validPassword(password, user.password_digest)) {
        req.session.userId = user.id
        req.session.firstName = user.first_name
        res.redirect('/')
        console.log("password is CORRECT")

      } else {
        res.render('login')
        console.log("password is NOT correct")

      }
    }
  })
})

// Logging a user out
// app.get('/logout',function(req,res){    
//   req.session.destroy(function(err){  
//       if(err){  
//           console.log(err);  
//       }  
//       else  
//       {  
//           res.redirect('/');  
//       }  
//   });  

// });  

app.delete('/session', (req, res) => {
  req.session.userId = undefined
  req.session.destroy();
  res.redirect('/')
})


//SECTION 2
// Creating a new user
app.post('/users', (req, res) => {
  const first_name = req.body.first_name
  const email = req.body.email
  const password = req.body.password
  const password_digest = generateHash(password)
  run_sql('INSERT INTO users(first_name, email_address, password_digest) VALUES($1, $2, $3)', [first_name, email, password_digest], db_res => {
    res.redirect('/')
  })
})

//SECTION 3
// Setting up database connection
const pg = require('pg')
let pool;
if (process.env.PRODUCTION) {
  pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL + "?ssl=true",
  })
} else {
  pool = new pg.Pool({
    database: 'food_db',
    user: 'sayf',
    password: 'abc123',
  })
}
 

// making requests to the database
function run_sql(sql, values = [], cb) {
  pool.query(sql, values, (err, res) => {
    cb(res)
  })
}

// Start the server
app.listen(port, () => console.log(`Listening on port: ${port}`))