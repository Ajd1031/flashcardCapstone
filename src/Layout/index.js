import React, { useState } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import DeckList from "./DeckList";
import View from "../actions/View";
import Study from "../actions/Study";
import CreateDeck from "../modifications/CreateDeck";
import AddCards from "../modifications/AddCards";
import EditDeck from "../modifications/EditDeck";
import EditCard from "../modifications/EditCard";

function Layout() {
  const [decks, setDecks] = useState([]);
  const [deckInfo, setDeckInfo] = useState({});

  const history = useHistory();

  const createHandler = () => {
    history.push("/decks/new");
  };

  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          {/* TODO: Implement the screen starting here */}
          <Route exact path="/">
            <button onClick={createHandler}>Create Deck</button>
            <DeckList decks={decks} setDecks={setDecks} />
          </Route>

          <Route path="/decks/:deckId/cards/new">
            <AddCards deckInfo={deckInfo} setDeckInfo={setDeckInfo} />
          </Route>

          <Route path="/decks/:deckId/study">
            <Study deckInfo={deckInfo} setDeckInfo={setDeckInfo} />
          </Route>

          <Route path="/decks/new">
            <CreateDeck decks={decks} />
          </Route>

          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard deckInfo={deckInfo} setDeckInfo={setDeckInfo} />
          </Route>

          <Route path="/decks/:deckId/edit">
            <EditDeck deckInfo={deckInfo} setDeckInfo={setDeckInfo} />
          </Route>

          <Route path="/decks/:deckId">
            <View
              deckInfo={deckInfo}
              setDeckInfo={setDeckInfo}
              setDecks={setDecks}
            />
          </Route>

          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
