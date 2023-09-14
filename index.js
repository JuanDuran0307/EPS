const express = require("express");
require('dotenv').config();
const routerEPS = require('./routes/routes.js')

const app = express();

const port = process.env.PORT307;

app.use('/EPS',routerEPS) 
app.use(express.json())
app.listen (port, ()=>{
    console.log("Was Running in port:",port);
})



