// const petugas = require('./../models');
const passport = require('../lib/passport');

module.exports = {
    login : passport.authenticate('local',{
        successRedirect : '/distribusi/pilih',
        failureRedirect : '/login',
        failureFlash : true
    })
    // login : (req, res) => {
    //     console.log(req.body.username);
    //     console.log(req.body.password)
    // }
}