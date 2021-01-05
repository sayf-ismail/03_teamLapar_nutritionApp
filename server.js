const express = require('express');
const bodyParser = require("body-parser");
const app = express ();
const passport = require('passport');
const brcypt = require('brcypt')

const initializePassport = require('./passport-config')

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Setting up DB connection
const pg = require('pg')
let pool = new pg.Pool({
    // database: 'food_nutrition'  <----change to actual name of DB
}) 

app.get('/', (req, res) => {
  res.render('index')
})

// API - Creating another route - pool.query takes two arguments, the SQL and function arguments, db_res is the actual result
// app.get('/api/food_nutrition', (req, res) => {
//   run_sql('SELECT * FROM services', db_res => {
//       res.json(db_res.rows)
//   })
// })

//Login
app.get('/login',(req,res) =>{

  var name = req.query.name
  var email = req.query.email 

  res.render('login.ejs',{name:name, email: email})
})

app.post('/login',(req,res) => {
  //params
  try{
    const hashedPassword = await brcypt.hash(req.body.password,10)
    var name = req.body.name;
    var email = req.body.email;
    var password = hashedPassword;
   //if succesful, direct to login.ejs
    res.redirect('login')
  //if unsucessful, direct to register.ejs
  } catch {
      res.redirect('/register')
  }
})




// Server port 
app.listen(4567, function(){
  console.log("Server started on port 4567")
})