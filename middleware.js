module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()) {
        req.flash("error", "Anda harus login terlebih dahulu!");
        return res.redirect("/user/login");
    }
    next();
}

module.exports.isAdmin = async(req, res, next) => {
    if (req.user.role !== "admin") {
        req.flash("error", "Anda tidak bisa mengakses halaman tersebut!");
        return res.redirect("/user");
    }
    next();
}
