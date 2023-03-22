const model = require('../models/event')
const { DateTime } = require("luxon");

function findByCategory(events, category) {
    return events.filter((event) => event.category === category);
};

exports.index = (req, res, next)=>{
    model.find()
    .then((events) => res.render("./event/index", {
        events,
        Hiking: findByCategory(events, "Hiking"),
        Camping: findByCategory(events,"Camping"),
        Biking: findByCategory(events,"Mountain Biking"),
        Backpacking: findByCategory(events,"Backpacking"),
        Other: findByCategory(events,"Other"),
    })
    )
    .catch((err) => next(err));
};


exports.new = (req, res)=>{
    res.render('./event/new');
};

exports.create = (req, res, next)=>{
    //res.send('Created a new story');
    let event = new model(req.body); //create a new event document
    let startdate = new Date(req.body.startdate);
    let enddate = new Date(req.body.enddate);
    let imageFilepath = "/images/" + req.file.filename;
    event.image = imageFilepath;
    event.startdate = startdate;
    event.enddate = enddate;
    event.save() 
    .then((event) => {
        event.image = imageFilepath;
        console.log(event.image);
        console.log(event.enddate);
        console.log(event.startdate);
        res.redirect("/events");
    })
    .catch((err) => {
        if (err.name === "ValidationError") {
        err.status = 400;
        }
        next(err);
    });
};

exports.show = (req, res, next)=>{ id = req.params.id;
    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        let err = new Error('Invalid event id');
        err.status = 400;
        return next(err);
    }
    model.findById(id)
    .then(event=>{
        if(event) {
            return res.render('./event/show', {event});
        } else {
            let err = new Error('Cannot find a event with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>next(err));
};


exports.edit = (req, res, next)=>{
let id = req.params.id;
    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        let err = new Error('Invalid event id');
        err.status = 400;
        return next(err);
    }
    model.findById(id)
    .then(event=>{
        if(event) {
            startdate = DateTime.fromJSDate(event.startdate).toISO({suppressSeconds: true, includeOffset: false});
            enddate = event.end = DateTime.fromJSDate(event.enddate).toISO({suppressSeconds: true, includeOffset: false});
            console.log(startdate);
            console.log(enddate);
            
            return res.render('./event/edit', {event, startdate,enddate});
        } else {
            let err = new Error('Cannot find a event with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>next(err));
};

exports.update = (req, res, next)=>{
    let event =  req.body;
    let id = req.params.id;
    if (req.file){
        event.image = "/images/" + req.file.filename;
        }
    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        let err = new Error('Invalid event id');
        err.status = 400;
        return next(err);
    }
    model.findByIdAndUpdate(id, event, {useFindAndModify: false, runValidators: true})
    .then(event=>{
        if(event){
            res.redirect('/events/' + id);
        } else {
            let err = new Error('Cannot find a event with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>{
        if(err.name === 'ValidationError')
            err.status = 400;
            next(err);
    });

};

exports.delete = (req, res, next)=>{
    let event =  req.body;
    let id = req.params.id;
    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        let err = new Error('Invalid event id');
        err.status = 400;
        return next(err);
    }
    model.findByIdAndDelete(id, {useFindAndModify: false, runValidators: true})
    .then(event=>{
        if(event){
            res.redirect('/events');
        } else {
            let err = new Error('Cannot find a event with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>{
        if(err.name === 'ValidationError')
            err.status = 400;
            next(err);
    });
}
