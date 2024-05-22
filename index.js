// start express  server
var express = require('express');
var app = express(); 
require('dotenv').config()
const path = require("path")

// connect with mongoose database 
const mongoose = require("mongoose");
mongoose.connect(process.env.mongo_URL).then(() => {
    console.log("Connected to MongoDB")    
})

// enable static path
app.use('/Uploads' , express.static(path.join(__dirname, "Uploads")))


//  enable CORS for all origins
const cors = require('cors')
app.use(cors());

// parse incoming requests data
app.use(express.json())

// import routes file
const p_routes = require('./Routes/Products_routes')
const u_routes = require('./Routes/Users_routes')
const person_routes = require('./Routes/Person_routes')

app.use('/',p_routes)
app.use('/',u_routes)
app.use('/',person_routes)


//  Start the server
app.listen(process.env.port, () => 
{
    console.log(`Express server run on --> ${process.env.port}`)
});
