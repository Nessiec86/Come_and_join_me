const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const tripSchema = new Schema({
    tripName: { type: String, required: true, default: 'new trip' },
    type: { type: String, enum: ['Ski/Snow','Climbing','Canyoning','Hiking','MTB']},
    date: Date,
    duration: Number,
    description: String,
    difficulty: Number,
    listOfParticipants: { type: ObjectId, ref: 'Users' },
    organizer: { type: ObjectId, ref: 'Users' },
    necessaryEquipment: [String],
    _id: { type: ObjectId },
    petfriendly: Boolean,
    geolocation: String,
});

const Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;
//exportar en routes