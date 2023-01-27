import React from "react";

function FormComponent({ whichForm = 10, handleCancel = null, handleChangeEdit = null, handleSubmit = null, currentCard = null, updatedCard = null, newCard= null, handleSave = null, handleChange = null, handleDone = null}) {

  if (whichForm > 30) {
    return (
      <form>
        <label>Front</label>
        <textarea
          name="front"
          type="text"
          placeholder={currentCard.front}
          value={updatedCard.front}
          onChange={handleChangeEdit}
        />
        <label>Back</label>
        <textarea
          name="back"
          type="text"
          placeholder={currentCard.back}
          value={updatedCard.back}
          onChange={handleChangeEdit}
        />
        <button onClick={handleCancel}>Cancel</button>
        <button onClick={handleSubmit}>Submit</button>
        {currentCard.front ? (
          <input
            readOnly
            style={{ visibility: "hidden" }}
            value={currentCard.front}
          />
        ) : null}
      </form>
    );
  } else {
    return (
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
    )
  }
}

export default FormComponent;
