const {body} = require('express-validator');
const {validationResult} = require('express-validator');

exports.validateId = (req, res, next) => {
    let id = req.params.id
    if(!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid story id');
        err.status = 400;
        return next(err);
    } else {
        return next ();
    }
};

exports.validateEvent = [body('title', 'Title cannot be empty').notEmpty().trim().escape(),
body('content', 'Content must be at least 10 characters').trim().escape().isLength({min: 10})],
body('location', 'Location cannot be empty').notEmpty().trim().escape(), 
body('startdate', 'Start date must be after today').isISO8601().isAfter(),
body('enddate', 'End date invalid').isISO8601().custom((enddate, {req})=>{
    return Date.parse(enddate) > Date.parse(req.body.startdate);
})

exports.validateSignUp = [body('firstName', 'First name cannot be empty').notEmpty().trim().escape(),
body('lastName', 'Last name cannot be empty').notEmpty().trim().escape(),
body('email', 'Email must be valid email address').isEmail().trim().escape().normalizeEmail(),
body('password', 'Password must be a length of at least 8 characters and at most 64 characters').isLength({min: 8, max: 64})];

exports.validateLogIn = [body('email', 'Email must be valid email address').isEmail().trim().escape().normalizeEmail(),
body('password', 'Password must be a length of at least 8 characters and at most 64 characters').isLength({min: 8, max: 64})];

exports.validateResult = (req, res, next) =>{
    let errors = validationResult(req);
    if(!errors.isEmpty()) {
        errors.array().forEach(error=>{
            req.flash('error', error.msg);
        });
        return res.redirect('back');
    } else {
        return next();
    }
}