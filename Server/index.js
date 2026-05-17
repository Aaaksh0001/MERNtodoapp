const express = require('express')
const mongoose = require('mongoose')
const cors = require("cors");
require('dotenv').config()

const {
    addtodocontroller,
    gettodocontroller,
    updatetodocontroller,
    deletetodocontroller
 } = require('./controller/addController')

const app = express()



mongoose.connect(process.env.dburl)
.then(() => console.log("db connected"))

app.use(express.json())
app.use(cors())



app.post('/api/addtodo', addtodocontroller)
app.get('/api/gettodo', gettodocontroller)
app.put('/api/updatetodo/:id', updatetodocontroller)
app.delete('/api/deletetodo/:id', deletetodocontroller)




app.listen(process.env.port, () => {
    console.log("Server running on Port no-", process.env.port)
})