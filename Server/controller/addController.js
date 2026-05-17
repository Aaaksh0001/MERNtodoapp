const express = require('express')

const addModel = require('../model/addTodo')

const addtodocontroller = async (req, res) => {

    try {

        let { text, priority } = req.body

        let addSchema = new addModel({
            text,
            priority
        })

        await addSchema.save()

        res.json({
            data: addSchema
        })

    } catch (error) {

        console.log(error)

        res.status(500).json({
            message: error.message
        })

    }
}

const gettodocontroller = async (req,res) =>{
    let data = await addModel.find();
    res.json({
        data
    })
}

const updatetodocontroller = async (req,res)=>{
    let todoid = req.params.id;

    let updatedata = await addModel.findByIdAndUpdate(
        todoid,
        req.body,
        { new: true }
    );

    res.json({
        data: updatedata
    });
}

const deletetodocontroller = async (req,res)=>{
    let todoid = req.params.id;
    let deletetodo = await addModel.deleteOne({"_id":todoid})
    res.json({
        deletetodo
    })
}

module.exports = {addtodocontroller,gettodocontroller,updatetodocontroller,deletetodocontroller}