const mongoose = require('mongoose');
const cities = require('./cities');
const Campground = require('../models/campground');
const {places, descriptors} = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});

const sample = array => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 100);
        const price = Math.floor((Math.random() * 20) + 10)
        const camp = await new Campground({
            author: '60e10bb648e20d416c5cd1b3',
            title: `${sample(descriptors)} ${sample(places)}`,
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            images: [
                {
                  url: 'https://res.cloudinary.com/dmxu56mid/image/upload/v1626717500/YelpCamp/xbajf9bx2eut2gblrw7z.jpg',
                  filename: 'YelpCamp/xbajf9bx2eut2gblrw7z'
                },
                {
                  url: 'https://res.cloudinary.com/dmxu56mid/image/upload/v1626717500/YelpCamp/gbuqcwhniig9yr59wjhz.jpg',
                  filename: 'YelpCamp/gbuqcwhniig9yr59wjhz'
                }
            ],
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia blanditiis, illo, accusantium est ut cupiditate ex accusamus explicabo itaque harum deserunt nulla similique fuga. A natus incidunt doloribus eveniet ipsum.',
            price
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close()
})