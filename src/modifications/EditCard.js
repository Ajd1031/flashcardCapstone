import { Link, useHistory, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { readDeck } from "../utils/api";
import { updateCard } from "../utils/api";
import { readCard } from "../utils/api";

function EditCard({ setDeckInfo, deckInfo }) {
  const history = useHistory();
  const [error, setError] = useState(null);
  //deckId = id of the currnet deck
  const { deckId, cardId } = useParams();
  const abortController = new AbortController();
  const [currentCard, setCurrentCard] = useState({});
  const initialValues = {
    front: "",
    back: "",
    id: cardId,
    deckId: Number(deckId),
  };
  const [updatedCard, setUpdatedCard] = useState(initialValues);

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

  useEffect(() => {
    setError(null);
    setCurrentCard({});
    getCardData(cardId);
  }, [cardId]);

  async function getCardData(cardId) {
    const abortController = new AbortController();
    try {
      const response = await readCard(cardId, abortController.signal);
      setCurrentCard(response);
    } catch (error) {
      console.log(error);
    }
    return () => {
      abortController.abort();
    };
  }

  async function alterCard(updatedCard, signal) {
    try {
      let response = await updateCard(updatedCard, signal);
      return response;
    } catch (error) {
      console.log(error);
    }
    return () => abortController.abort();
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    alterCard(updatedCard, abortController.signal);
    history.push(`/decks/${deckId}`);
    setUpdatedCard(initialValues);
  };

  const handleChange = ({ target }) => {
    setUpdatedCard({ ...updatedCard, [target.name]: target.value });
  };

  const handleCancel = (event) => {
    event.preventDefault();
    history.push(`/decks/${deckId}`);
  };

  return (
    <div>
      <div>
        <Link to="/">Home</Link> /
        <Link to={`/decks/${deckId}`}> {deckInfo.name}</Link> / Edit Card{" "}
        {cardId}
      </div>
      <h2>{deckInfo.name}: Add Card</h2>
      <div>
        <form>
          <label>Front</label>
          <textarea
            name="front"
            type="text"
            placeholder={currentCard.front}
            value={updatedCard.front}
            onChange={handleChange}
          />
          <label>Back</label>
          <textarea
            name="back"
            type="text"
            placeholder={currentCard.back}
            value={updatedCard.back}
            onChange={handleChange}
          />
          <button onClick={handleCancel}>Cancel</button>
          <button onClick={handleSubmit}>Submit</button>
          <input style={{visibility: "hidden"}} value={currentCard.front} />
        </form>
      </div>
    </div>
  );
}

export default EditCard;
