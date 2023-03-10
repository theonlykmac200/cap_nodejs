const mongoose = require('mongoose');

const ThreeCardSchema = new mongoose.Schema({
    question: {type: String, required: true},
    rating: {type: Number, required: false},
    past_card: {type: String, required: true},
    past_card_interpretation: {type: String, required: true},
    present_card: {type: String, required: true},
    present_card_interpretation: {type: String, required: true},
    future_card: {type: String, required: true},
    future_card_interpretation: {type: String, required: true},
    general_interpretation: {type: String, required: true},
    }, 
    {
    timestamps: true
    }
);

const ThreeCard = mongoose.model('ThreeCard', ThreeCardSchema);

module.exports = ThreeCard;
