const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Schema
const storySchema = new Schema({
    title: {type: String, required: [true, 'title is required']},
    author: {type: String, required: [true, 'author is required']},
    content: {type: String, required: [true, 'content is required'], minLength: [10, 'the content needs atleast 10 characters']}
},
{timestamps: true}
);

module.exports = mongoose.model('Story', storySchema);

