const mongoose = require('mongoose');
const Celebrity = require('../models/celebrity');
mongoose.connect('mongodb://localhost/Express_Movies_Lab');


const celebs = [
    {name:"Chuck Norris" , occupation: 'Badass' , catchPhrase: 'Chuck Norris can say his catch phrase with his eyes'},
    {name: 'Gandoff the Grey', occupation: 'Wizard' , catchPhrase: 'You Shall Not Pass!!!'},
    {name: 'Rocky', occupation: 'Boxer' , catchPhrase: 'ADRIAN!!!'}
];

Celebrity.insertMany(celebs)
    .then(celebs => {
        console.log(`Success - ${celebs.length} celebrities seeded to the database`);
        mongoose.connection.close();

    })
    .catch(err => {
        console.log(err);
    })