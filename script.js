const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const fetch = require('node-fetch');
const methodOverride = require('method-override');
const ThreeCardReading= require('./models/tarot');


require("dotenv").config()
const PORT = process.env.PORT || 3002;

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

const db = mongoose.connection
db.on("error", (err) => console.log(err.message + " is mongo not running?"))
db.on("connected", () => console.log("mongo connected"))
db.on("disconnected", () => console.log("mongo disconnected"))


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(methodOverride("_method"))



// Induces

app.get('/', (req, res) => {
  res.send('Hello World');
});

const createThreeCardReading = async (question, rating) => {
    const cardDeck = {
        'Ace of Cups': '/public/images/Ace_of_Cups.png',
        'Two of Cups': '/public/images/Two_of_Cups.png',
        'Three of Cups': '/public/images/Three_of_Cups.png',
        'Four of Cups': '/public/images/Four_of_Cups.png',
        'Five of Cups': '/public/images/Five_of_Cups.png',
        'Six of Cups': '/public/images/Six_of_Cups.png',
        'Seven of Cups': '/public/images/Seven_of_Cups.png',
        'Eight of Cups': '/public/images/Eight_of_Cups.png',
        'Nine of Cups': '/public/images/Nine_of_Cups.png',
        'Ten of Cups': '/public/images/Ten_of_Cups.png',
        'Page of Cups': '/public/images/Page_of_Cups.png',
        'Knight of Cups': '/public/images/Knight_of_Cups.png',
        'Queen of Cups': '/public/images/Queen_of_Cups.png',
        'King of Cups': '/public/images/King_of_Cups.png',
        'Ace of Pentacles': '/public/images/Ace_of_Pentacles.png',
        'Two of Pentacles': '/public/images/Two_of_Pentacles.png',
        'Three of Pentacles': '/public/images/Three_of_Pentacles.png',
        'Four of Pentacles': '/public/images/Four_of_Pentacles.png',
        'Five of Pentacles': '/public/images/Five_of_Pentacles.png',
        'Six of Pentacles': '/public/images/Six_of_Pentacles.png',
        'Seven of Pentacles': '/public/images/Seven_of_Pentacles.png',
        'Eight of Pentacles': '/public/images/Eight_of_Pentacles.png',
        'Nine of Pentacles': '/public/images/Nine_of_Pentacles.png',
        'Ten of Pentacles': '/public/images/Ten_of_Pentacles.png',
        'Page of Pentacles': '/public/images/Page_of_Pentacles.png',
        'Knight of Pentacles': '/public/images/Knight_of_Pentacles.png',
        'Queen of Pentacles': '/public/images/Queen_of_Pentacles.png',
        'King of Pentacles': '/public/images/King_of_Pentacles.png',
        'Ace of Swords': '/public/images/Ace_of_Swords.png',
        'Two of Swords': '/public/images/Two_of_Swords.png',
        'Three of Swords': '/public/images/Three_of_Swords.png',
        'Four of Swords': '/public/images/Four_of_Swords.png',
        'Five of Swords': '/public/images/Five_of_Swords.png',
        'Six of Swords': '/public/images/Six_of_Swords.png',
        'Seven of Swords': '/public/images/Seven_of_Swords.png',
        'Eight of Swords': '/public/images/Eight_of_Swords.png',
        'Nine of Swords': '/public/images/Nine_of_Swords.png',
        'Ten of Swords': '/public/images/Ten_of_Swords.png',
        'Page of Swords': '/public/images/Page_of_Swords.png',
        'Knight of Swords': '/public/images/Knight_of_Swords.png',
        'Queen of Swords': '/public/images/Queen_of_Swords.png',
        'King of Swords': '/public/images/King_of_Swords.png',
        'Ace of Wands': '/public/images/Ace_of_Wands.png',
        'Two of Wands': '/public/images/Two_of_Wands.png',
        'Three of Wands': '/public/images/Three_of_Wands.png',
        'Four of Wands': '/public/images/Four_of_Wands.png',
        'Five of Wands': '/public/images/Five_of_Wands.png',
        'Six of Wands': '/public/images/Six_of_Wands.png',
        'Seven of Wands': '/public/images/Seven_of_Wands.png',
        'Eight of Wands': '/public/images/Eight_of_Wands.png',
        'Nine of Wands': '/public/images/Nine_of_Wands.png',
        'Ten of Wands': '/public/images/Ten_of_Wands.png',
        'Page of Wands': '/public/images/Page_of_Wands.png',
        'Knight of Wands': '/public/images/Knight_of_Wands.png',
        'Queen of Wands': '/public/images/Queen_of_Wands.png',
        'King of Wands': '/public/images/King_of_Wands.png',
        'Death': '/public/images/Death.png',
        'Judgement': '/public/images/Judgement.png',
        'Justice': '/public/images/Justice.png',
        'Strength': '/public/images/Strength.png',
        'Temperance': '/public/images/Temperance.png',
        'The Chariot': '/public/images/The_Chariot.png',
        'The Devil': '/public/images/The_Devil.png',
        'The Empress': '/public/images/The_Empress.png',
        'The Emperor': '/public/images/The_Emperor.png',
        'The Fool': '/public/images/The_Fool.png',
        'The Hanged Man': '/public/images/The_Hanged_Man.png',
        'The Hermit': '/public/images/The_Hermit.png',
        'The High Priestess': '/public/images/The_High_Priestess.png',
        'The Hierophant': '/public/images/The_Hierophant.png',
        'The Lovers': '/public/images/The_Lovers.png',
        'The Magician': '/public/images/The_Magician.png',
        'The Moon': '/public/images/The_Moon.png',
        'The Star': '/public/images/The_Star.png',
        'The Sun': '/public/images/The_Sun.png',
        'The Tower': '/public/images/The_Tower.png',
        'The World': '/public/images/The_World.png',
        'Wheel of Fortune': '/public/images/Wheel_of_Fortune.png' 
    };

    const chooseRandomCards = (cards, count) => {
    const shuffledCards = cards.sort(() => 0.5 - Math.random());
    return shuffledCards.slice(0, count);
    };
      
   
   
    // Generate readings for each card in the spread
    const generateCardReading = async (card, position, question) => {
    const prompt = `Tarot card reading for "${question}"\n\nThe card in the ${position} position is the ${card}.\n\nPlease give me the interpretation for the ${card} in the ${position} position.\n\n`;
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${process.env.OPENAI_API_KEY}` },
        body: JSON.stringify({ prompt })
    };
    const response = await fetch('https://api.openai.com/v1/engines/text-davinci-002/completions', requestOptions);
    const data = await response.json();
    const reading = data.choices[0].text.trim();
    return reading;
    };

    const [pastCard, presentCard, futureCard] = chooseRandomCards(Object.keys(cardDeck), 3);
    const spread = [
    {position: 'past', card: pastCard},
    {position: 'present', card: presentCard},
    {position: 'future', card: futureCard}
    ];

    const [pastReading, presentReading, futureReading] = await Promise.all([
    generateCardReading(pastCard, 'past', question),
    generateCardReading(presentCard, 'present', question),
    generateCardReading(futureCard, 'future', question)
    ]);

    
     // Generate a general reading for the spread
      const generateGeneralReading = async (question, spread) => {
        const prompt = `Tarot card reading for "${question}"\n\nThe three cards in the spread are: ${spread[0].card}, ${spread[1].card}, and ${spread[2].card}.\n\nPlease give me a general interpretation of the reading.\n\n`;
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${process.env.OPENAI_API_KEY}` },
            body: JSON.stringify({ prompt })
    };
        const response = await fetch('https://api.openai.com/v1/engines/text-davinci-002/completions', requestOptions);
        const data = await response.json();
        const reading = data.choices[0].text.trim();
        return reading;
    };

    const generalReading = await generateGeneralReading(question, spread);
    return { spread, pastCard, presentCard, futureCard, pastReading, presentReading, futureReading, generalReading };
    };
app.post('/threecard', async (req, res) => {
    const { question, rating } = req.body;
    // Call createThreeCardReading function and get the spread value from the returned object
    const { spread, pastCard, presentCard, futureCard, pastReading, presentReading, futureReading, generalReading } = await createThreeCardReading(question, rating);
  
    const savedReading = await ThreeCardReading.create({
      question,
      rating,
      past_card: pastCard,
      past_card_interpretation: pastReading,
      present_card: presentCard,
      present_card_interpretation: presentReading,
      future_card: futureCard,
      future_card_interpretation: futureReading,
      general_interpretation: generalReading
    });
    
    res.status(201).json(savedReading);
  });

app.listen(PORT, () => {
    console.log(`My flight was awful, thanks for asking ${PORT}`);
});
