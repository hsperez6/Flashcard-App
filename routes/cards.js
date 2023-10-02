const express = require('express');
const router = express.Router();

const { data } = require('../data/flashcardData.json');
const { cards } = data;


// SELECTS RANDOM CARD WHEN ACCESSING URL "/cards"
router.get('/', (req, res) => {
  const randIndex = Math.floor( Math.random() * cards.length );
  res.redirect(`/cards/${randIndex}?side=question`);
});

router.get('/:id', (req, res) => {

	const { side } = req.query;
	const { id } = req.params; 

	if (!side) {
		return res.redirect(`/cards/${id}?side=question`)
	}

  const text = cards[id][side];
  const { hint } = cards[id];
  const name = req.cookies.username;

  const  templateData  = { id, text, name, side };

	if (side  ===  'question') {
		templateData.hint  =  hint;
		templateData.toDisplay  =  'answer';
	} else if (side  ===  'answer') {
		templateData.toDisplay  =  'question';
	}
	
	res.render('card', templateData);

});

module.exports = router;