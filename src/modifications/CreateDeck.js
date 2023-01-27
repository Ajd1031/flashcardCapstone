import { Link, useHistory } from "react-router-dom";
import React, { useState } from "react";
import { createDeck } from "../utils/api";

function CreateDeck({ decks }) {
  const history = useHistory();

  //placeholder object to aid in storing state
  const initialValues = {
    name: "",
    description: "",
  };

  const [newDeck, setNewDeck] = useState(initialValues);

  //this function will save what the user inputs into the forms (CHANGES NEWDECK)
  const handleChange = ({ target }) => {
    setNewDeck({ ...newDeck, [target.name]: target.value });
  };

  const abortController = new AbortController();
  async function saveDeck(newDeck) {
    try {
      let response = await createDeck(newDeck, abortController.signal);
      return response;
    } catch (error) {
      console.log(error);
    }
    return () => abortController.abort();
  }

  //this function puts the new deck in the API and clears the forms
  const handleSubmit = () => {
    saveDeck(newDeck, abortController.signal);
    history.push(`/decks/${decks.length + 1}`);
    setNewDeck(initialValues);
  };

  //returns user to home screen when cancel is clicked
  const handleCancel = () => {
    history.push("/");
  };

  return (
    <>
      <div>
        <Link to="/">Home </Link>/ Create Deck
      </div>
      <h2>Create Deck</h2>
      <form className="deckForm" onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          name="name"
          type="text"
          placeholder="Deck Name"
          value={newDeck.name}
          onChange={handleChange}
        />
        <label>Description</label>
        <textarea
          name="description"
          type="text"
          placeholder="Brief description of the deck"
          value={newDeck.description}
          onChange={handleChange}
        ></textarea>
        <button onClick={handleCancel}>Cancel</button>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default CreateDeck;
