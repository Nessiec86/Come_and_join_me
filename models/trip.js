const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const tripSchema = new Schema({
    tripName: { type: String, required: true, default: 'new trip' },
    tripCategory: { type: String, enum: ['Ski','Climbing','Canyoning','Hiking','MTB']},
    date: Date,
    duration: { hours: Number, mins: Number },
    description: String,
    difficulty: { type: String, enum: ['Beginner','Easy','Normal','Hard','Very hard']},
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