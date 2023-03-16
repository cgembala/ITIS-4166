const { DateTime } = require('luxon');
const {v4: uuidv4} = require('uuid');
const events = [
{
    id: '1', 
    title: 'Grandfather',
    content: 'Short hike on the 2 hour loop',
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
    content: 'Short snow shoe hike.',
    author: 'Camerron Gembala',
    startdate: "2018-06-12T19:30",
    enddate: "2018-06-12T19:30",
    location: 'alps',
    createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT),
    category: 'Hiking',
    image: '/images/grandfather.jpg'
},
{
    id: '3', 
    title: 'South Mountain loop 2',
    content: 'We will hvae 5 of us hiking this loop, feel free to join.',
    author: 'Camerron Gembala',
    startdate: "2018-06-12T19:30",
    enddate: "2018-06-12T19:30",
    location: 'South Mountain',
    createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT),
    category: 'Hiking',
    image: '/images/CampFyre-logos.jpeg'
},
{
    id: '4', 
    title: 'Appalchain trail',
    content: 'We will be doing a 2 week trek on the trail.',
    author: 'Camerron Gembala',
    startdate: "2018-06-12T19:30",
    enddate: "2018-06-12T19:30",
    location: 'Appalchain trail',
    createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT),
    category: 'Backpacking',
    image: '/images/grandfather.jpg'
},
{
    id: '5', 
    title: 'Rocky Mountains',
    content: 'A group of 2 of us will be hking the length of the trail.',
    author: 'Camerron Gembala',
    startdate: "2018-06-12T19:30",
    enddate: "2018-06-12T19:30",
    location: 'Rockies',
    createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT),
    category: 'Backpacking',
    image: '/images/grandfather.jpg'
},
{
    id: '6', 
    title: 'PCT',
    content: 'My group will be hiking from the northern start of the trail',
    author: 'Camerron Gembala',
    startdate: "2018-06-12T19:30",
    enddate: "2018-06-12T19:30",
    location: 'Pacific Crest Trail',
    createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT),
    category: 'Backpacking',
    image: '/images/grandfather.jpg'
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