require("dotenv").config();

//Create express js instance
const express = require("express");
const app = require("express")();
const bodyParser = require("body-parser");
//Create http server
const http = require("http").createServer(app);
//Set cors true for websocket connection
const options = { cors: true };
//Allows restricted requested resources to the webserver when http request is intiated
const cors = require("cors");
//Use a conection pool to connect to postgres database
const { pool } = require("./database");
//Set port for backend local server
const PORT = process.env.PORT || 5000;

var Users = require("./Routes/Users");
var Database = require("./Routes/DatabaseEndpoints")



//Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:8080",
  })
);

app.use(express.json());

//Start the http server and log that server has started
http.listen(PORT, () => {
  console.log(`Backend listening at http://localhost:${PORT}`);
});



//Routes
app.post(`/api/user/register`, Users);
app.post(`/api/user/login`, Users);
app.post(`/api/stock/uploadForm`, Database)
app.post('/api/option/uploadForm', Database)
app.post(`/api/realEstate/uploadForm`, Database)
app.get(`/api/stock/getForm/:username`, Database)
app.get(`/api/option/getForm/:username`, Database)
app.get(`/api/realEstate/getForm/:username`, Database)
app.get(`/api/portfolio/getData/:username`, Database)
app.post(`/api/portfolio/clearTable`, Database)
