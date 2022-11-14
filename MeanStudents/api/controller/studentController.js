const mongoose = require('mongoose')

const Student = mongoose.model("students");

const _buildResponse = (err, docs, status) => {
    const response = {
        status: status,
        message: docs
    }

    if (err) {
        response.status = 500;
        response.message = err;
    } else if (!docs) {
        response.status = 404;
        response.message = "not found";
    }

    return response;
}


const getAll = (req, res) => {
    console.log("getAll");

    Student.find().exec((err, student) => {
        const response = _buildResponse(err, student, 200);
        res.status(parseInt(response.status)).json(response.message);
    });
    
}

const getOne = (req, res) => {
    console.log("getOne");
    
    Student.findById(req.params.id).exec((err, student) => {
        const response = _buildResponse(err, student, 200);
        res.status(parseInt(response.status)).json(response.message);
    })
}

const deleteOne = (req, res) => {
    console.log("deleteOne");
    
    Student.findByIdAndDelete(req.params.id).exec((err, student) => {
        const response = _buildResponse(err, student, 201);
        res.status(parseInt(response.status)).json(response.message);
    })
}

module.exports = {
    getAll,
    getOne,
    deleteOne
}