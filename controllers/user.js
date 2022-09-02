const User = require("../models/user");

module.exports.index = async(req, res) => {
    res.render("user/")
}

module.exports.renderRegisterForm = async(req, res) => {
    res.render("user/register")
};

module.exports.register = async(req, res) => {
    try {
        const {email, username, password, nama, role} = req.body.user;
        const user = new User({email, username, nama, role});
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) {return next(err);}
            req.flash("success", `Selamat datang. ${req.user.username}`);
            res.redirect("/alumni");
        })
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/user/register");    
    }
};

module.exports.renderLoginForm = (req, res) => {
    res.render("user/login")
};

module.exports.login = async(req, res) => {
    req.flash("success", `Selamat datang, ${req.user.username}`);
    if (req.user.role === "admin") {
        res.redirect('/alumni');
    } else {
        res.redirect("/user")
    }
};

module.exports.logout = (req, res) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        req.flash("success", "Berhasil Logout");
        res.redirect('/alumni');
      });

};