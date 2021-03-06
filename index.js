const express = require('express')
const mongoose = require('mongoose')
const app = express()
const session = require('express-session')
var MongoDBStore = require('connect-mongodb-session')(session);
require('dotenv').config()
const routes = require('./routes/route')

// const uri = 'mongodb://localhost:27017/extramile'
const uri = process.env.MONGO_URL
const PORT = process.env.PORT || 8080

var store = new MongoDBStore({
  uri: uri,
  collection: 'sessions'
});


app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))

app.set('views','views')
app.set('view engine','ejs')


app.use(session({
  secret: 'cnauy789hy8',
  store: store,
  resave: true,
  saveUninitialized: true
}));

app.use('/',routes)

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).
    then(result => {
      console.log("DB Connected!");
      app.listen(PORT, () => {
        console.log("App Is Running On 8080.");
      })
    }).
    catch(err => {
      console.log(err);
    });