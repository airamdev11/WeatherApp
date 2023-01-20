const express = require("express");

const https = require("https");

const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req,res){
    
    res.sendFile(__dirname+"/index.html");
    
    
});

app.post("/", function(req,res){
    
    console.log(req.body.cityName);
    const query = req.body.cityName;
    const apiKey="e7a1750d4b6cf2ade21782353ae33abe";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&units="+unit+"&appid="+apiKey;

    

    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            console.log(data);
            const weatherInfo = JSON.parse(data);
            console.log(weatherInfo);

            const icon = weatherInfo.weather[0].icon;
            const iconUrl = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
            const temp = weatherInfo.main.temp;
            const description = weatherInfo.weather[0].description;
            res.set({ 'content-type': 'text/html; charset=utf-8' });

            res.write("<h1>The temperature in " + query + " is: "+description + " with "+temp+" degrees celsius.</h1>");
            res.write("<p>The weather is current.</p>");
            res.write("<img src='"+iconUrl+"'></img>");
            res.send();
            console.log(url);
        })
    });
    
});






app.listen(3000, function(){
    console.log("Server is running on port 3000");
});