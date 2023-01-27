import { useParams, Link, useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { readDeck } from "../utils/api";
import { updateDeck } from "../utils/api";

function EditDeck({ setDeckInfo, deckInfo }) {
  const history = useHistory();
  const [error, setError] = useState(null);
  console.log(error);
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

  //placeholder object to aid in storing state
  const initialValues = {
    name: "",
    description: "",
    id: deckId,
    cards: [],
  };
  //updatedDeck setUpdatedDeck
  const [updatedDeck, setUpdatedDeck] = useState(initialValues);

  //this function will save what the user inputs into the forms (CHANGES updatedDeck)
  const handleChange = ({ target }) => {
    setUpdatedDeck({ ...updatedDeck, [target.name]: target.value });
  };

  const abortController = new AbortController();
  async function saveDeck(updatedDeck) {
    try {
      let response = await updateDeck(updatedDeck, abortController.signal);
      return response;
    } catch (error) {
      console.log(error);
    }
    return () => abortController.abort();
  }

  //this function puts the new deck in the API and clears the forms
  const handleSubmit = () => {
    saveDeck(updatedDeck);
    history.push(`/decks/${deckId}`);
    setUpdatedDeck(initialValues);
  };

  //returns user to home screen when cancel is clicked
  const handleCancel = () => {
    history.push(`/decks/${deckId}`);
  };

  return (
    <div>
      <div>
        <Link to="/">Home </Link> /
        <Link to={`/decks/${deckId}`}> {deckInfo.name}</Link> / Edit Deck
      </div>
      <h2 value={deckInfo.name}>Edit Deck</h2>
      <form className="deckForm" onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          name="name"
          type="text"
          placeholder={`${deckInfo.name}`}
          value={updatedDeck.name}
          onChange={handleChange}
        />
        <label>Description</label>
        <textarea
          name="description"
          type="text"
          placeholder={`${deckInfo.description}`}
          value={updatedDeck.description}
          onChange={handleChange}
        ></textarea>
        <button onClick={handleCancel}>Cancel</button>
        <button type="submit">Submit</button>
        {deckInfo.name ? (
          <div>
            <input
              readOnly
              style={{ visibility: "hidden" }}
              name="name"
              type="text"
              value={deckInfo.name}
            />
            <input
              readOnly
              style={{ visibility: "hidden" }}
              name="description"
              type="text"
              value={deckInfo.description}
            />{" "}
          </div>
        ) : null}
      </form>
    </div>
  );
}

export default EditDeck;
