const express = require("express");

const bodyParser = require("body-parser");

const date = require(__dirname+"/date"); 

const app = express();

var items = []

var workList = []

app.set("view engine",'ejs');

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static(__dirname+"/public"));

app.get("/",function(req,res)
{
    res.render("index",{title:date.getDate(),itemList:items});
});

app.get("/work",function(req,res)
{
    res.render("index",{title:"work",itemList:workList})
});

app.post("/work",function(req,res)
{
    var item = req.body.newItem;
    workList.push(item);
    res.redirect("/work");
});

app.post("/",function(req,res)
{
    var newItem = req.body.newItem;
    items.push(newItem);
    res.redirect("/");
});

app.listen("3000",function()
{
    console.log("server is running on port 3000");
});

