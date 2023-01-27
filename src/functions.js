import { ObjectId } from "mongodb";
import { dbConnect } from "./dbConnect.js";

const collectionName = process.env.COLLECTION

//! Get ALL
export const getAllDoc = async (req,res) => {
    const db = dbConnect()
    const collection = await db.collection(collectionName).find({}).limit(2).toArray()

    console.table(collection)
    res.send(collection)
}

//! Get Search
export const findDoc = async (req,res) => {
    // destructures from index.js
    const { search } = req.params

    const db = dbConnect()
    // if want to search by a certain column make sure that it matches the data type
    // in this case id is a integer so we have to convert search to a Number
    const collection = await db.collection(collectionName).find({ id: Number(search) }).toArray()

    console.table(collection)
    res.send(collection)
}

//TODO: CREATE UPDATE QUERY
//! UPDATE
export const updateDoc = async (req,res) => {
    const updateId  = { _id: new ObjectId("63d2cb70a9a41d7d5666b76c")}
    
    const db = dbConnect()
    const update = { $set: {'last_name': 'Angel'}}
    const collection = await db.collection(collectionName).findOneAndUpdate( updateId,update )

        console.log(collection)
        res.send('Doc Updated')
}


//! POST DOC
export const postDoc = async (req,res) => {
    // req.body looks for the body in post man
    const newDoc = req.body

    const db = dbConnect()
    await db.collection(collectionName).insertOne(newDoc)
        .catch(err => {
            res.status(500).send(err)
            return
        })
        
        res.status(201).send( {message: 'New Doc Inserted'})
}

//! DELETE DOC
export const deleteDoc = async (req,res) => {
    const { docId } = req.params

    const db = dbConnect()
    const collection = await db.collection(collectionName).deleteOne({ id: Number(docId) })

    console.table(collection)
    res.send(collection)
}