const express = require('express')
const app = express ()

app.set('view engine', 'ejs')

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



// Server port 
app.listen(4567, function(){
  console.log("Server started on port 4567")
})