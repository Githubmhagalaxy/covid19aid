require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');

const PORT = process.env.PORT || 3000;

(async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        app.listen(PORT, () => {
            console.log(`API server listening on port ${PORT}!`);
        });
    } catch (e) {
        console.log('could not connect to db in some reasons');
        console.error(e.message);
    }
})()