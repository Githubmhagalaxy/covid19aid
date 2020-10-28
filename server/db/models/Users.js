const {Schema, model} = require('mongoose');
const bcrypt = require('bcrypt');

const statisticsSchema = new Schema({
    Country: String,
    CountryCode: String,
    Slug: String,
    NewConfirmed: Number,
    TotalConfirmed: Number,
    NewDeaths: Number,
    TotalDeaths: Number,
    NewRecovered: Number,
    TotalRecovered: Number,
    Date: Date,
    Premium: {
        type: {}
    }
});

const foodCampsSchema = new Schema({
    food_resource_type: String,
    agency: String,
    location: String,
    operational_status: String,
    operational_notes: String,
    current_process_for: String,
    who_they_serve: String,
    address: String,
    latitude: Number,
    longitude: Number,
    phone_number: String,
    website: {
        type: {
            url: String
        }
    },
    days_hours: String,
    date_updated: Date
});

const hospitalsSchema = new Schema({
    Zip: String,
    Name: String,
    Address: String,
    City: String,
    State: String,
    telephone: String,
    latitude: Number,
    longitude: Number,
    website: String,
    beds: Number,
    naics_desc: String,
    helipad: String,
    population: Number,
    county: String,
    distance: Number
});

const usersSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    name: String,
    statistics: [statisticsSchema],
    food_camps: [foodCampsSchema],
    hospitals: [hospitalsSchema]
}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
});

// hash password before saving the new documents
usersSchema.pre('save', async function(next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
});

// check password
usersSchema.methods.isCorrectPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = model('Users', usersSchema);