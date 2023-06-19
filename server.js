//server code

import express from "express"
import cors from "cors"

import reviews from "./api/reviews.route.js"

const app = express();

app.use(cors());
app.use(express.json())//allows to server to accept json in a body

app.use("/api/v1/reviews", reviews)//for that url, we will use the reviews route

app.use('*', (req, res) =>
res.status(404).json({error: "not found"}))//if someuse uses a url that is not a path

export default app;//will export so i can import in a different file