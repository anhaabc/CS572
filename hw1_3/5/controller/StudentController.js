const studentData = require('../data/school.json')

module.exports.getAllStudents = (req, res) => {
    res.status(parseInt(process.env.HTTP_SUCCESS_STATUS)).json(studentData);
};

module.exports.getOneStudent = (req, res) => {
    let id = req.params.id;
    if (0 < id && id <= studentData.length)
        res.status(parseInt(process.env.HTTP_SUCCESS_STATUS)).json(studentData[id - 1]);
    else
        res.status(parseInt(process.env.HTTP_NOT_FOUND_STATUS)).end();
};