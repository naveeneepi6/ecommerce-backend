const express = require("express");
var bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

const app = express();
let port = 3000;
// Connection URL
const url = 'mongodb+srv://test:test123@cluster0.jtdap.mongodb.net/';
const client =  new MongoClient(url);

const dbName = 'ecommerce';

async function connectToDB() {
    await client.connect();
    console.log("db connected succesfully");
}

connectToDB();

app.use(bodyParser.json())
let products = [{
    name: "Apple",
    price: 30,
    q: 100,
    meta: {
        size: "large",
        batchNo: "12dfkk3",
        expiry: "30/03/2024",
        units: "number"
    }
},{
    name: "Banana",
    price: 10,
    q: 200,
    meta: {
        size: "mediium",
        batchNo: "12dfkk3",
        expiry: "30/03/2024",
        units: "number"
    }
},{
    name: "Milk",
    price: 35,
    q: 100,
    meta: {
        size: "large",
        batchNo: "12dfkk3",
        expiry: "30/03/2024",
        units: "liters"
    }
},{
    name: "Oil",
    price: 300,
    q: 1000,
    meta: {
        size: "large",
        batchNo: "12dfkk3",
        expiry: "30/03/2024",
        units: "liters"
    }
}]
app.get('/products',async (req, res)=>{
    const db = client.db("ecommerce");
    const collection = db.collection("products");
    const result = await collection.find().toArray();
    res.send({products: result});
});

app.get('/products/:name',async(req, res)=>{
    const name = req.params.name;
    console.log(name);
    // let filteredProduct = products.find(product => product.name == name);
    const db = client.db("ecommerce");
    const collection = db.collection("products");
    const result = await collection.find({name: name}).toArray();
    // res.send({products: result});
    res.send({products: result});
});

app.post('/products',async (req, res)=>{

    const db = client.db(dbName);
    const collection = db.collection("products");

    const newProduct = req.body;
    console.log({newProduct});
    products.push(newProduct);
    const result = await collection.insertOne(req.body);
    res.send({message: result});
});

app.put('/products',(req, res)=>{
    const {name, price, q} = req.body;
    for (let index = 0; index < products.length; index++) {
        const element = products[index];
        if(name === element.name) {
            element.name = name;
            element.price = price;
            element.q = q;
        }
    }
    res.send({products});
})
app.delete('/products/:name',async (req, res)=>{
    // const name = req.params.name;
    
    // products = products.filter(product => product.name != name);
    // res.send({products})
    const name = req.params.name;
    console.log(name);
    // let filteredProduct = products.find(product => product.name == name);
    const db = client.db("ecommerce");
    const collection = db.collection("products");
    const result = await collection.deleteOne({name: name});
    // res.send({products: result});
    res.send({products: result});
})

app.listen(port, () => {
    console.log("server running on port"+port);
})