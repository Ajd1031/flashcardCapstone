import { useParams, Link} from "react-router-dom";
import { readDeck } from "../utils/api";
import React, { useEffect, useState } from "react";
import DeckSide from "./DeckSide";

function Study({ setDeckInfo, deckInfo }) {
  const [error, setError] = useState(null);
  console.log(error)

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


  return (
    <div>
      <div>
        <div>
          <Link to="/">Home </Link>/
          <Link to={`/decks/${deckId}`}> {deckInfo.name} </Link>/ Study
        </div>
        <h2>Study: {deckInfo.name}</h2>
        {/* {some_condition ? deckside : null} */}
        {/* {If there are no cards show me not enough cards } */}
        {/* {else show me deckSide} */}
        {deckInfo.cards ? <DeckSide deckInfo={deckInfo} /> : null}
      </div>
    </div>
  );
}

export default Study;
