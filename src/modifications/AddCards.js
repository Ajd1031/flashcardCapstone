import { Link, useHistory, useParams } from "react-router-dom";
import React, { useState, useEffect, } from "react";
import { createCard } from "../utils/api";
import { readDeck } from "../utils/api";

function AddCards({ deckInfo, setDeckInfo }) {
  const history = useHistory();
  const [error, setError] = useState(null);
  //deckId = id of the currnet deck
  const { deckId } = useParams();
  const abortController = new AbortController();
  const initialValues = {
    front: "",
    back: "",
    deckId: deckInfo.id,
  };
  const [newCard, setNewCard] = useState(initialValues);

  useEffect(() => {
    setError(null);
    setDeckInfo({});
    getData(deckId);
  }, [deckId]);

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

  async function saveCard(deckId, card, signal) {
    try {
      let response = await createCard(deckId, card, signal);
      return response;
    } catch (error) {
      console.log(error);
    }
    return () => abortController.abort();
  }

  const handleSave = (event) => {
    event.preventDefault();
    saveCard(deckId, newCard, abortController.signal);
    history.go(0);
    setNewCard(initialValues);
  };

  const handleChange = ({ target }) => {
    setNewCard({ ...newCard, [target.name]: target.value });
  };

  const handleDone = (event) => {
    event.preventDefault();
    history.push(`/decks/${deckId}`);
  };

  return (
    <div>
      <div style={{display: "flex"}} >
        <Link to="/"> Home </Link> /
        <Link to={`/decks/${deckId}`}> {deckInfo.name}</Link> / 
        <p>Add Card</p>
      </div>
      <h2>{deckInfo.name}: Add Card</h2>
      <div>
        <form>
          <label>Front</label>
          <textarea
            name="front"
            type="text"
            placeholder="Front side of card"
            value={newCard.front}
            onChange={handleChange}
          />
          <label>Back</label>
          <textarea
            name="back"
            type="text"
            placeholder="Back side of card"
            value={newCard.back}
            onChange={handleChange}
          />
          <button onClick={handleDone}>Done</button>
          <button onClick={handleSave}>Save</button>
        </form>
      </div>
    </div>
  );
}

export default AddCards;
