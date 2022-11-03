module.exports = (req, res) => {
    console.log(req.query);
    let numerator = parseInt(req.params.num);
    let denominator = parseInt(req.query.denominator);
    console.log(numerator, denominator);
    if (denominator === 0) {
        console.log("Can't divide a number to zero");
    } else {
        console.log(numerator / denominator);
    }

    res.end();
}