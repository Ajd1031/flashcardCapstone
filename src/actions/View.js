import React, { useEffect, useState } from "react";
import { useParams, Link, useHistory, useRouteMatch } from "react-router-dom";
import { readDeck } from "../utils/api";
import { deleteDeck } from "../utils/api";
import { deleteCard } from "../utils/api";
import { listDecks } from "../utils/api";

function View({ setDeckInfo, deckInfo, setDecks }) {
  const history = useHistory();
  const [error, setError] = useState(null);
  console.log(error)
  const { url } = useRouteMatch();

  //deckId = id of the currnet deck
  const { deckId } = useParams();

  useEffect(() => {

    async function getData(deckId) {
      const abortController = new AbortController();
      try {
        const response = await readDeck(deckId, abortController.signal);
        setDeckInfo(response);
      } catch (error) {
        setError(error);
      }
      return () => {
        abortController.abort();
      };
    }
    
    setError(null);
    setDeckInfo({});
    getData(deckId);
  }, [deckId, setDeckInfo]);


  //This gives the array of cards
  const { cards } = deckInfo;

  //This section of code allows me to display the list of cards
  let cardList;
  if (deckInfo.cards) {
    cardList = cards.map((card, index) => {
      return (
        <div key={index}>
          <p>{card.front}</p>
          <p>{card.back}</p>
          <button onClick={() => cardEditHandler(card.id)}>Edit</button>
          <button onClick={() => deleteCardHandler(card.id)}>Delete</button>
        </div>
      );
    });
  }

  const deleteDeckHandler = (ID) => {
    const abortController = new AbortController();

    //this function uses the given function to delete a deck
    async function removeDeck(ID) {
      try {
        await deleteDeck(ID, abortController.signal);

        const promise = listDecks();
        promise.then((decksFromAPI) => setDecks(decksFromAPI));
      } catch (error) {
        console.log(error);
      }
    }

    if (window.confirm("Delete this deck?")) {
      removeDeck(ID);
      history.push("/");
    }
  };

  const deleteCardHandler = (ID) => {
    const abortController = new AbortController();

    async function removeCard(ID) {
      try {
        await deleteCard(ID, abortController.signal);
      } catch (error) {
        console.log(error);
      }
    }

    if (window.confirm("Delete this card?")) {
      removeCard(ID);
      history.go(0);
    }
  };

  const cardEditHandler = (cardId) => {
    history.push(`${url}/cards/${cardId}/edit`);
  };

  const deckEditHandler = () => {
    history.push(`${url}/edit`);
  };

  const studyHandler = () => {
    history.push(`${url}/study`);
  };

  const addCardsHandler = () => {
    history.push(`${url}/cards/new`);
  };

  return (
    <>
      <div>
        <Link to="/">Home</Link> / {deckInfo.name}
      </div>
      <div>
        <h2>{deckInfo.name}</h2>
        <p>{deckInfo.description}</p>
        <button onClick={deckEditHandler}>Edit</button>
        <button onClick={studyHandler}>Study</button>
        <button onClick={addCardsHandler}>Add Cards</button>
        <button onClick={() => deleteDeckHandler(deckInfo.id)}>Delete</button>
      </div>
      <div>
        <>
          <h2>Cards</h2>
          {deckInfo.cards ? cardList : null}
        </>
      </div>
    </>
  );
}

export default View;
