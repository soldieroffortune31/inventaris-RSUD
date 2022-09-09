module.exports = {
    home : (req, res) => {
        console.log(req.user.dataValues);
        res.render('home')
    }
}