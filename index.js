const mongodb = require("mongodb")
const cors = require("cors")
const express = require("express");
const dotenv = require("dotenv")

const mongoClient = mongodb.MongoClient
const objectId = mongodb.ObjectID
const app = express();
let port = process.env.PORT || 3000;
app.listen(port, ()=>console.log(`The app is running on port: ${port}`))
app.use(express.json());
app.use(cors())
dotenv.config()

const url = process.env.DB_URL || 'mongodb://localhost:27017';

app.post("/add-hall", async(req, res)=>{
    try{
        let client = await mongoClient.connect(url)
        let db = client.db("halls_db")
        let result = await db.collection("halls").insertOne(req.body)
        res.status(200).json({
            message :"Hall is created"
        })
        client.close()
    }
    catch(error){
        res.status(500).json({
            message: "Not able to create hall"
        })
    }
})

app.get("/get-halls", async(req, res)=>{
    try{
        let client = await mongoClient.connect(url)
        let db = client.db("halls_db")
        let result = await db.collection("halls").find().toArray()
        res.status(200).json({
            data : result,
            message : "Recodrs fetched successfully"
        })
        client.close()
    }
    catch(error){
        res.status(500).json({
            message:"Error while fetching halls"
        })
    }

})


app.post("/book-room", async(req, res)=>{
    try{
        let client = await mongoClient.connect(url)
        let db = client.db("halls_db")
        let result = await db.collection("booking").insertOne(req.body)
        res.status(200).json({
            message :"Room Booked"
        })
        client.close()
    }
    catch(error){
        res.status(500).json({
            message: "Not able to book the room"
        })
    }
})

