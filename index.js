//To start running, type 'node index.js'

import dotenv from 'dotenv'

import app from "./server.js"
import mongodb from "mongodb"//makes it easier to use mongoDB
import ReviewsDAO from "./dao/reviewsDAO.js"//DAO = Data Access Object
const MongoClient = mongodb.MongoClient

dotenv.config()

const mongo_username = process.env['MONGO_USERNAME']//environment variables so these will not be shared
const mongo_password = process.env['MONGO_PASSWORD']


const uri = `mongodb+srv://${mongo_username}:${mongo_password}@cluster0.uttfwkz.mongodb.net/?retryWrites=true&w=majority`
const port = 8000 

MongoClient.connect(
    uri,
    {
        maxPoolSize: 50, //max people allowed at once
        wtimeoutMS: 2500,// milliseconds to connect
        useNewUrlParser: true 
    }) 
    .catch(err => {//will catch any errors that occur in connection
        console.error(err.stack)//logs the error that comes from the connection
        process.exit(1)//will end the program
    })
    .then(async client => {//can run at the same time as other things
        await ReviewsDAO.injectDB(client)//function will send the db to the ReviewsDAO
        app.listen(port, () => {
            console.log(`listneing on port ${port}`)
        })//passed in the port and the function
    })