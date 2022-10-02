require('dotenv').config()
const express = require('express')
const app = express()
const ejs = require('ejs')
const path = require('path')
const mongoose = require('mongoose')
const session = require('express-session')
const expressLayout = require('express-ejs-layouts')
const flash = require('express-flash')
const { json } = require('express')
const MongoDbStore = require('connect-mongo')(session)
const PORT = process.env.PORT || 3000
app.use(express.static('public'))
app.use(express.json())

 
// Database connection
const url='mongodb://localhost/Pizza'
mongoose.connect(url, { useNewUrlParser: true, useCreateIndex:true, useUnifiedTopology: true, useFindAndModify : true });
const connections = mongoose.connection;
mongoose.connection
    .once('open', function () {
      console.log('MongoDB running');
    })
    .on('error', function (err) {
      console.log(err);
    });



// Session store
let mongoStore = new MongoDbStore({
  mongooseConnection: mongoose.connection,
  collection: 'sessions'
})


// Session config
app.use(session({
  secret: process.env.COOKIE_SECRET,
  resave: false,
  store:mongoStore,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 } // 24 hour
}))

app.use(flash())

// Global middleware
app.use((req, res, next) => {
  res.locals.session = req.session
  res.locals.user = req.user
  next()
})




// set Template engine
app.use(expressLayout)
app.set('views', path.join(__dirname, '/resources/views'))
app.set('view engine', 'ejs')


require('./routes/web')(app)



app.listen(PORT , ()=>{
    console.log(`listening on port ${PORT}`)
})
