const mongoose = require('mongoose');

const studentsSchema = mongoose.Schema({
    ID: String,
    LastName: String,
    FistName: String,
    City: String,
    State: String,
    Gender: String,
    StudentStatus: String,
    Major: String,
    Country: String,
    Age: String,
    SAT: String,
    'Grade ': String,
    Height: String
});

mongoose.model("students", studentsSchema, "students");