// require modules
const express = require('express');
const multer = require('multer');
const morgan = require('morgan');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const eventRoutes = require('./routes/eventRoutes');
const mainRoutes = require("./routes/mainRoutes");
const userRoutes = require('./routes/userRoutes');




//create application
const app = express();



//configure application
let port = 3000;
let host = 'localhost';
let url = 'mongodb+srv://cgembala:project3!@cluster0.zifsbo6.mongodb.net/nbda-project3?retryWrites=true&w=majority'
app.set('view engine', 'ejs');

//connect to Mongodb
mongoose.connect(url)
    .then(()=>{
        //start app
        app.listen(port, host, ()=>{
            console.log('Server is running on port', port);
        });
    })
    .catch(err=>console.log(err.message));

//mount middleware
app.use(
    session({
        secret: "ajfeirf90aeu9eroejfoefj",
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({mongoUrl: 'mongodb+srv://cgembala:project3!@cluster0.zifsbo6.mongodb.net/nbda-project3?retryWrites=true&w=majority'}),
        cookie: {maxAge: 60*60*1000}
        })
);
app.use(flash());

app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    res.locals.errorMessages = req.flash('error');
    res.locals.successMessages = req.flash('success');
    next();
});

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('tiny'));
app.use(methodOverride('_method'));


//setup routes
app.get('/', (req, res)=>{
    res.render('index');
});

app.use("/", mainRoutes);
app.use('/events', eventRoutes);

app.use('/users', userRoutes);

app.use((req, res, next) => {
    let err = new Error('The server cannot locate ' + req.url);
    err.status = 404;
    next(err);
});

app.use((err, req, res, next)=>{
    console.log(err.stack);
    if(!err.status) {
        err.status = 500;
        err.message = ('Internal Server Error')
    }
    res.status(err.status);
    res.render('error', {error:err});
});



