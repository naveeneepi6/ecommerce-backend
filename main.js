var express = require("express");
var app = express();
const { MongoClient } = require('mongodb');
const bodyParser = require("body-parser");
const cors = require("cors");
const uri = "mongodb+srv://test:test123@cluster0.i23v9og.mongodb.net/";
const client  = new MongoClient(uri);

app.use(bodyParser.json());
app.use(cors());

async function connectTODataBase(){
    try {
        await client.connect();
        console.log("mongodb connected!");
    } catch (error) {
        console.log(error);
    }
}

connectTODataBase();

app.get("/",(req, res) => {
    res.send("my first api");
})
app.get("/product",async (req, res) => {
    const db = client.db("ecommerce");
    const collection = db.collection("products");
    const result = await collection.find().toArray();
    res.send(result);
})
app.post("/product",async (req, res) => {
    const data = req.body;

    const db = client.db("ecommerce");
    const collection = db.collection("products");
    const result = await collection.insertOne(data);
    res.send(result);
})
app.put("/product",(req, res) => {
    res.send("my first put api");
})
app.delete("/product",(req, res) => {
    res.send("my first delete api");
})
app.listen(3000, ()=>{
    console.log("server lsitening on port 3000");
})