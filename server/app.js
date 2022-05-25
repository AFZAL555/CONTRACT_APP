var express=require('express');
var logger=require('morgan');
const cors=require("cors");
const mongoose=require("mongoose");
const bodyParser=require('body-parser');
require('dotenv').config();

var adminRouter=require('./routes/Admin');
var usersRouter=require('./routes/users');

var app=express();

app.use(cors({Credential: true, origin: true}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/api/admin', adminRouter);
app.use('/api/users', usersRouter);


//DB Connection
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() =>
{
  console.log("Database Connected Successfully.....");
}).catch((error) =>
{
  console.log("Database Conection Failed.....");
  console.log(error.message);
});


module.exports=app;
