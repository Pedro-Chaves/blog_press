function adminAuth(req, res, next) {
    if(req.session.user == undefined) res.redirect('/users/login');

    next();
}

module.exports = adminAuth;