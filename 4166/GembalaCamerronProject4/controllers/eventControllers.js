const model = require('../models/event');
const { DateTime } = require("luxon");
const rsvpModel = require('../models/rsvp');

function findByCategory(events, category) {
    return events.filter((event) => event.category === category);
};

exports.index = (req, res, next) => {
    model.find()
        .then((events) => res.render("./event/index", {
            events,
            Hiking: findByCategory(events, "Hiking"),
            Camping: findByCategory(events, "Camping"),
            Biking: findByCategory(events, "Mountain Biking"),
            Backpacking: findByCategory(events, "Backpacking"),
            Other: findByCategory(events, "Other"),
        }))
        .catch((err) => next(err));
};


exports.new = (req, res) => {
    res.render('./event/new');
};

exports.create = (req, res, next) => {
    //res.send('Created a new story');
    let event = new model(req.body); //create a new event document
    let startdate = new Date(req.body.startdate);
    let enddate = new Date(req.body.enddate);
    let imageFilepath = "/images/" + req.file.filename;
    event.author = req.session.user.id;
    event.image = imageFilepath;
    event.startdate = startdate;
    event.enddate = enddate;
    event.save()
        .then((event) => {
            event.image = imageFilepath;
            res.redirect("/events");
        })
        .catch((err) => {
            if (err.name === "ValidationError") {
                err.status = 400;
            }
            next(err);
        });
};

exports.show = (req, res, next) => {
    let id = req.params.id;
    model.findById(id).populate('author', 'firstName lastName')
        .then(event => {
            let count = 0;
            rsvpModel.find({ 'event': id })
                .then(eventRsvp => {
                    eventRsvp.forEach(rsvp => {
                        if (rsvp.rsvp == 'yes') {
                            count++;
                        }
                    })
                    if (event) {
                        return res.render('./event/show', { event, count });
                    } else {
                        let err = new Error('Cannot find a event with id ' + id);
                        err.status = 404;
                        next(err);
                    }
                })
                .catch(err => next(err));
        })
        .catch(err => next(err));
};


exports.edit = (req, res, next) => {
    let id = req.params.id;
    model.findById(id)
        .then(event => {
            if (event) {
                startdate = DateTime.fromJSDate(event.startdate).toISO({ suppressSeconds: true, includeOffset: false });
                enddate = event.end = DateTime.fromJSDate(event.enddate).toISO({ suppressSeconds: true, includeOffset: false });
                return res.render('./event/edit', { event, startdate, enddate });
            } else {
                let err = new Error('Cannot find a event with id ' + id);
                err.status = 404;
                next(err);
            }
        })
        .catch(err => next(err));
};

exports.update = (req, res, next) => {
    let event = req.body;
    let id = req.params.id;
    if (req.file) {
        event.image = "/images/" + req.file.filename;
    }
    model.findByIdAndUpdate(id, event, { useFindAndModify: false, runValidators: true })
        .then(event => {
            if (event) {
                res.redirect('/events/' + id);
            } else {
                let err = new Error('Cannot find a event with id ' + id);
                err.status = 404;
                next(err);
            }
        })
        .catch(err => {
            if (err.name === 'ValidationError')
                err.status = 400;
            next(err);
        });

};

exports.delete = (req, res, next) => {
    let event = req.body;
    let id = req.params.id;
    model.findByIdAndDelete(id, { useFindAndModify: false, runValidators: true })
        .then(event => {
            rsvpModel.find({ 'event': id })
                .then(eventRsvp => {
                    eventRsvp.forEach(rsvp => {
                        let rsvpId = rsvp.id;
                        rsvpModel.findByIdAndDelete(rsvpId, { useFindAndModify: false, runValidators: true })
                            .then()
                            .catch(err => next(err));
                    })
                })
                .catch(err => next(err));
            if (event) {
                res.redirect('/events');
            } else {
                let err = new Error('Cannot find a event with id ' + id);
                err.status = 404;
                next(err);
            }
        })
        .catch(err => {
            if (err.name === 'ValidationError')
                err.status = 400;
            next(err);
        });
}

exports.addRsvp = (req, res, next) => {
    let event = req.params.id;
    let user = req.session.user.id;
    let response = req.body.rsvp;
    let rsvp = { event: event, user: user, rsvp: response };
    rsvpModel.findOneAndUpdate({ event: event, user: user }, rsvp, { new: true, upsert: true, useFindAndModify: false, runValidators: true, rawResult: true })
        .then(rsvp => {
            req.flash("success", "Rsvp successfully added.");
            return res.redirect('/users/profile');
        })
        .catch(err => {
            if (err.name === 'ValidationError')
                err.status = 400;
            next(err);
        });
};
