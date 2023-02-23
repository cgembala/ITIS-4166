const model = require('../models/event')
exports.index = (req, res) => {
    res.render('./event/index' ,{
      events: model.find(),
      Hiking: model.findByCategory("Hiking"),
      Camping: model.findByCategory("Camping"),
      Biking: model.findByCategory("Mountain Biking"),
      Backpacking: model.findByCategory("Backpacking"),
      Other: model.findByCategory("Other"),
    });
  };

exports.new = (req, res)=>{
    res.render('./event/new');
};

exports.create = (req, res)=>{
    //res.send('Created a new story');
    let event = req.body;
    event.image = "/images/" + req.file.filename;
    model.save(event);
    let image = req.file.filename;
    console.log("image: " + image);
    res.redirect('/events')
};

exports.show = (req, res, next)=>{
    let id = req.params.id;
    let event = model.findById(id);
    if(event){
        res.render('./event/show', {event});
    } else {
    let err = new Error('Cannot find a event with id ' + id);
    err.status = 404;
    next(err);
    }
};


exports.edit = (req, res, next)=>{
    let id = req.params.id;
    let event = model.findById(id);
    if(event){
        res.render('./event/edit', {event});
    } else {
        let err = new Error('Cannot find a event with id ' + id);
        err.status = 404;
        next(err);
    }
};


exports.update = (req, res, next)=>{
    let event = req.body;
    let id = req.params.id;
    if (req.file){
    event.image = "/images/" + req.file.filename;
    }
    if (model.updateById(id, event)) {
        res.redirect('/events/'+id);
    } else {
        let err = new Error('Cannot find a event with id ' + id);
        err.status = 404;
        next(err);
    }
};

exports.delete = (req, res, next)=>{
    let id = req.params.id;
    if(model.deleteById(id)) {
        res.redirect('/events');
    } else {
    let err = new Error('Cannot find a event with id ' + id);
    err.status = 404;
    next(err);
    }
};

