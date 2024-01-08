const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost:27017/ebook?directConnection=true';

const connectToMongo = () => {
    mongoose.connect(mongoURI, () => {
        console.log('Connected to MongoDB');
    }
    );
}


module.exports = connectToMongo;
