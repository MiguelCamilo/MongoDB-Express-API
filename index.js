import express from "express"
import cors from "cors"
import dotenv from "dotenv"

import { getAllDoc, postDoc, findDoc, deleteDoc, updateDoc } from "./src/functions.js"

const PORT = process.env.PORT

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())


//! Get ALL
app.get('/getall', getAllDoc)

//! GET SEARCH
// search has to match the function parameter
app.get('/search/:search', findDoc)

//! POST 
app.post('/post', postDoc)

//! UPDATE
app.put('/update', updateDoc)

//! DELETE
app.delete('/delete/:docId', deleteDoc)

app.listen(PORT, () => console.log(`Server is listening on port...${PORT}`))