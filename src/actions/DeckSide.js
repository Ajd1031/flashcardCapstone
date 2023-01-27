import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function DeckSide({ deckInfo }) {
  //This gives the array of cards
  const { cards } = deckInfo;
  //This is the current card's Id. Needs to be set everytime "Next" is clicked
  const [currnetCard, setCurrentCard] = useState(1);
  //This determines what side is shown (front is shown on true). This needs to be set everytime "flip" is clicked
  const [side, setSide] = useState(true);

  const history = useHistory();

  const handleFlip = (event) => {
    event.preventDefault();
    setSide(!side);
  };

  //This function containes the logic for the next button.
  const handleNext = (event) => {
    event.preventDefault();
    if (currnetCard < cards.length) {
      setCurrentCard(currnetCard + 1);
      setSide(!side);
    } else if (
      window.confirm("Restart cards? Click 'cancel' to return to the home page")
    ) {
      setSide(!side);
      setCurrentCard(1);
    } else {
      history.push("/");
    }
  };

  //this function directs the user to the add cards page for the appropriate deck
  const handleAddCards = (event) => {
    event.preventDefault();
    history.push(`/decks/${deckInfo.id}/cards/new`);
  };

  if (cards.length < 3) {
    return (
      <div>
        <h3>Not enough cards.</h3>
        <p>
          You need at least 3 cards to study. There are {cards.length} in this
          deck.{" "}
        </p>
        <button onClick={handleAddCards} >Add Cards</button>
      </div>
    );
  }
  //shows front of card if "side" is true
  if (side) {
    return (
      <div>
        <h4>
          Card {currnetCard} of {cards.length}{" "}
        </h4>
        <p>{cards[currnetCard - 1].front} </p>
        <button onClick={handleFlip}>Flip</button>
      </div>
    );
  } else {
    //shows back of card if "side" is false
    return (
      <div>
        <h4>
          Card {currnetCard} of {cards.length}{" "}
        </h4>
        <p>{cards[currnetCard - 1].back} </p>
        <button onClick={handleFlip}>Flip</button>
        <button onClick={handleNext}>Next</button>
      </div>
    );
  }
}

export default DeckSide;
