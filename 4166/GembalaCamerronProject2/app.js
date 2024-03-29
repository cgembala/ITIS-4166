// require modules
const express = require('express');
const multer = require('multer');
const morgan = require('morgan');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const eventRoutes = require('./routes/eventRoutes');
const mainRoutes = require("./routes/mainRoutes");




//create application
const app = express();



//configure application
let port = 3000;
let host = 'localhost';
let url = 'mongodb://0.0.0.0:27017/demos'
app.set('view engine', 'ejs');

//connect to Mongodb
mongoose.connect(url)
.then(()=>{
    //start the server
    app.listen(port, host, ()=>{
    console.log('Server is running on port', port);
});
})
.catch(err=>console.log(err.message));

//mount middleware
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



