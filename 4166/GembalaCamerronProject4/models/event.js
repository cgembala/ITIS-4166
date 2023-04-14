const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Schema
const eventSchema = new Schema({
    title: {type: String, required: [true, 'title is required']},
    author: {type: Schema.Types.ObjectId, ref:'User'},
    content: {type: String, required: [true, 'content is required'], minLength: [10, 'the content needs atleast 10 characters']},
    startdate: { type: Date, required: [true, "startdate is required"] },
    enddate: { type: Date, required: [true, " enddate is required"] },
    location: {type: String, required: [true, 'location is required']},
    category: {type: String, required: [true, 'category is required']},
    image: { type: String, },
},
{timestamps: true}
);

module.exports = mongoose.model('Event', eventSchema);