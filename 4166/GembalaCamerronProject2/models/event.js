const { DateTime } = require('luxon');
const {v4: uuidv4} = require('uuid');
const events = [
{
    id: '1', 
    title: 'My life at Charlotte',
    content: 'I have just finished watching all the videos and my app works now',
    author: 'Camerron Gembala',
    createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
},
{
    id: '2', 
    title: 'Learning NBAD',
    content: 'The videos were very helpful and the only issues I had were typos because of my large hands.',
    author: 'Camerron Gembala',
    createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
},
{
    id: '3', 
    title: 'My Spring Break',
    content: 'Over my spring break I will be getting engaged at the Biltmore Estate. We will be staying there for 5 days in the Inn.',
    author: 'Camerron Gembala',
    createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
}
];

exports.find = () => events;

exports.findById = id => events.find(event=>event.id === id);

exports.save = function (event){
    event.id = uuidv4();
    event.createdAt = DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
    events.push(story);
};

exports.updateById = function(id, newEvent) {
    let event = events.find(event=>event.id === id);
    if(event) {
    event.title = newEvent.title;
    event.content = newEvent.content;
    return true;
    } else {
        return false;
    }
}

exports.deleteById = function(id) {
    let index = events.findIndex(event => event.id === id)
    if(index !== -1) {
        events.splice(index, 1);
        return true;
    } else {
        return false;
    }
}