import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { listDecks } from "../utils/api";
import { deleteDeck } from "../utils/api";



//This function needs to create a list of things representing all the decks
function DeckList({ decks, setDecks }) {
  useEffect(() => {
    const promise = listDecks();
    promise.then((decksFromAPI) => setDecks(decksFromAPI));
  }, [decks.length]);

  const deleteHandler = ({ target }) => {
    const abortController = new AbortController();

    //this is the id of the card that was clicked
    const clickedDeckId = target.getAttribute("value");

    //this function uses the given function to delete a deck
    async function removeDeck(clickedDeckId) {
      try {
        await deleteDeck(clickedDeckId, abortController.signal);

        const promise = listDecks();
        promise.then((decksFromAPI) => setDecks(decksFromAPI));
      } catch (error) {
        console.log(error);
      }
    }

    if (window.confirm("Delete this deck?")) {
      removeDeck(clickedDeckId);
    }
  };

  const history = useHistory();

  const viewHandler = (id) => {
    history.push(`/decks/${id}`);
  };

  const studyHandler = (id) => {
    history.push(`/decks/${id}/study`);
  };

  return decks.map((deck, index) => {
    return (
      <div className="deckTile" key={index}>
        <h3>{deck.name}</h3> {deck.cards.length} cards
        <p>{deck.description}</p>
        <button onClick={() => viewHandler(deck.id)}>View</button>
        <button onClick={() => studyHandler(deck.id)}>Study</button>
        <button value={deck.id} onClick={deleteHandler}>
          Delete
        </button>
      </div>
    );
  });
}

export default DeckList;
