if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}  

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');
const ExpressError = require("./utils/ExpressError");
const methodOverride = require('method-override');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require("./models/user")

const userRoutes = require("./routes/user");
const alumniRoutes = require("./routes/alumni");
const programRoutes = require("./routes/program");
const lowonganRoutes = require("./routes/lowongan");

// const MongoDBStore = require("connect-mongo");
const MongoStore = require("connect-mongo");

const dbUrl = process.env.DB_URL;
// 'mongodb://localhost:27017/dth'
// process.env.DB_URL
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
    console.log("Database connected");
});

const app = express();
const PORT = 4000;

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, "public")));

// const store = new MongoDBStore({
//     url: dbUrl,
//     secret: "thisisashouldabettersecret",
//     touchAfter: 24 * 60 * 60
// });

// store.on("error", function(e) {
//     console.log("Session Store Error", e)
// })

const sessionConfig = {
    store: MongoStore.create({ mongoUrl: dbUrl }),
    name: "session",
    secret: "thisshouldbeabettersecret",
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly:true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7,
    }
}
app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
})

app.use("/alumni", alumniRoutes);
app.use("/program", programRoutes);
app.use("/user", userRoutes);
app.use("/lowongan", lowonganRoutes);

app.get("/", (req, res) => {
    res.render('home');
});

// app.get("/fakeUser", async(req, res) => {
//     const user = new User({
//         email: "info@tuw.co.id",
//         username: "admin",
//         role: "admin",
//         nama: "Admin",
//     });
//     const newUser = await User.register(user, "Cemara3dK6No33");
//     res.send(newUser);
// });

app.all("*", (req, res, next) => {
    next(new ExpressError("Page not found", 404))
})

app.use((err, req, res, next) => {
    const {statusCode = 500} = err;
    if(!err.message) err.message = "Oh no, something went wrong!";
    res.status(statusCode).render("error", { err });
})

app.listen(PORT, ()=> {
    console.log('App listening on port', PORT);
});