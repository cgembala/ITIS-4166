const { DateTime } = require('luxon');
const {v4: uuidv4} = require('uuid');
const events = [
{
    id: '1', 
    title: 'Grandfather',
    content: 'I have just finished watching all the videos and my app works now',
    author: 'Camerron Gembala',
    startdate: "2018-06-12T19:30",
    enddate:  "2018-06-12T19:30",
    location: 'Grandfater Mountain',
    createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT),
    category: 'Hiking',
    image: '/images/CampFyre-logos.jpeg'
},
{
    id: '2', 
    title: 'Alps',
    content: 'The videos were very helpful and the only issues I had were typos because of my large hands.',
    author: 'Camerron Gembala',
    startdate: "2018-06-12T19:30",
    enddate: "2018-06-12T19:30",
    location: 'Grandfater Mountain',
    createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT),
    category: 'Backpacking',
    image: '/images/grandfather.jpg'
   
},
{
    id: '3', 
    title: 'South Mountain',
    content: 'Over my spring break I will be getting engaged at the Biltmore Estate. We will be staying there for 5 days in the Inn.',
    author: 'Camerron Gembala',
    startdate: "2018-06-12T19:30",
    enddate: "2018-06-12T19:30",
    location: 'Grandfater Mountain',
    createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT),
    category: 'Hiking',
    image: '/images/CampFyre-logos.jpeg'
   
}
];

exports.find = () => events;

exports.findById = id => events.find(event=>event.id === id);

exports.save = function (event){
    event.id = uuidv4();
    event.createdAt = DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
    events.push(event);
};

exports.updateById = function(id, newEvent) {
    let event = events.find(event=>event.id === id);
    if(event) {
    event.title = newEvent.title;
    event.content = newEvent.content;
    event.startdate = newEvent.startdate;
    event.enddate = newEvent.enddate;
    event.location = newEvent.location;
    console.log(newEvent);
    if(newEvent.image){
    event.image = newEvent.image;
    }
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

exports.findByCategory = (category) => {
    return events.filter((event) => event.category === category);
  };