const express = require("express");

const dotenv = require("dotenv");

dotenv.config()

const mongoose = require("mongoose");

const bodyParser = require("body-parser");
const { redirect } = require("express/lib/response");

const date = require(__dirname+"/date"); 

const app = express();

PORT = process.env.PORT || 3000

mongoose.connect("mongodb+srv://"+process.env.USERID+":"+process.env.PASSWORD+"@cluster0.ypfh3.mongodb.net/ToDoListDB",function(err)
{
    if(!err)
        console.log("connected to database");
    else
        console.log("error occured while connecting to database:"+err);
});

app.set("view engine",'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));



app.use(express.static(__dirname+"/public"));
// app.use(express.json({strict: false}));


const itemSchema = new mongoose.Schema({
    name:String
});

const listSchema = new mongoose.Schema({
    name:String,
    listItems:[itemSchema]
})



const Item = mongoose.model("Item",itemSchema);

const List = mongoose.model("List",listSchema);


app.get("/",function(req,res)
{
    Item.find(function(err,result)
    {
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.render("index",{title:"Today"/*date.getDate()*/,itemList:result});
        }
    })
});


app.post("/",function(req,res)
{
    const newitem = new Item({
        name:req.body.newItem
    }); 

    newitem.save(function(err)
    {
        if(!err)
        {
            console.log("inserted successfully");
            res.redirect("/");    
        }
        else
        {
            console.log("data not inserted");
        }
    });
    
});


app.post("/deleteToday",function(req,res)
{
    Item.deleteOne({_id:req.body.number},function(err)
    {
        if(!err)
        {
            res.redirect("/");
        }    
        else
        {
            console.log(err);
        }
    });
    
})



app.get("/:customListName",function(req,res)
{
    var customListName = req.params.customListName;
    List.findOne({name:customListName},function(err,result)
    {
        if(!err)
        {
            if(result==undefined)
                resultItems=[]
            else
                resultItems = result.listItems
            //console.log(resultItems);
            res.render("index",{title:customListName,itemList:resultItems} );
        }
        else
        {
            console.log(err);
        }
    })
});

app.post("/:customListName",function(req,res)
{
    var customListName =req.params.customListName.slice(6,);
    console.log(customListName);
    if(req.params.customListName.slice(0,6)=="delete")
        {
            console.log("if block");
            console.log(req.params.customListName.slice(6,));
            List.updateOne({name:customListName},{$pull:{listItems:{_id:req.body.number}}},function(err)
                {
                    if(err)
                    {
                        console.log(err);
                    }
                    else
                    {
                       console.log("pulled old list");
                       res.redirect("/"+customListName);
                    }
                });
        }
    else
    {
        console.log("else block")
        var customListName = req.params.customListName;
        var newList = req.body.newItem;
        List.find({name:customListName},function(err,result)
        {
            if(!err)
            {
                if(result.length==0)
                {
                    const newlist = new List(
                        {
                            name:customListName,
                            listItems:[{name:newList}]
                        })
                    newlist.save(function(err)
                    {
                        if(!err)
                            res.redirect("/"+customListName);
                        else
                            console.log("not inserted");


                    });
                    //console.log("inserted new list");
                }
                else
                {
                    //console.log("No records found");
                    List.updateOne({name:customListName},{$push:{listItems:{name:newList}}},function(err)
                    {
                        if(err)
                        {
                            console.log(err);
                        }
                        else
                        {
                        // console.log("updated new list");
                            res.redirect("/"+customListName);
                        }
                    });
                }
                //console.log("/"+customListName);
            }
            else
            {
                console.log("error occured"+err);
            }
        });
    }
});




app.listen(PORT,function()
{
    console.log(`server is running on port ${PORT}`);
});

