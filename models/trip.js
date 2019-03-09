const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const tripSchema = new Schema({
    tripName: { type: String, required: true, default: 'new trip' },
    tripCategory: { type: String, enum: ['Ski/Snow','Climbing','Canyoning','Hiking','MTB']},
    date: Date,
    duration: Number,
    description: String,
    difficulty: String,
    listOfParticipants: [{type: ObjectId, ref: 'User'}],
    userID: {
        type: ObjectId,
        ref: 'User',
    },
    necessaryEquipment: String,
    petfriendly: Boolean,
    geolocation: String,
});

const Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;
//exportar en routes