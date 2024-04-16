// start express  server
var express = require('express');
var app = express(); 


// connect with mongoose database 
const mongoose = require("mongoose");
const url = "mongodb+srv://mohamedmamdouh546:mmmmmmmmmm@learn-mongodb.uapmupr.mongodb.net/Task1" //Task1 refers to the Database name in your Cluster
mongoose.connect(url).then(() => {
    console.log("Connected to MongoDB")    
})


// parse incoming requests data
app.use(express.json())

const port = 612;

const p_routes = require('./Routes/Products_routes')

app.use('/',p_routes )
app.listen(port, () => 
{
    console.log(`Express server run on --> ${port}`)
});
