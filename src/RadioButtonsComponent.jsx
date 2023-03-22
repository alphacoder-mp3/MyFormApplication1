import React, { useState } from "react";
import "./RadioButtonsComponent.css";

export default function RadioButtonsComponent() {
  const [selectedCard, setSelectedCard] = useState("card1");

  const handleCardChange = (event) => {
    setSelectedCard(event.target.id);
  };

  return (
    <div>
      <div className="card">
        <input
          type="radio"
          name="options"
          id="card1"
          checked={selectedCard === "card1"}
          onChange={handleCardChange}
        />
        <label htmlFor="card1" className="buttonLabel">
          <div style={{ margin: "20px 16px" }}>
            <div className="avatar" />
            <div className="eclipse" />
            <h5>For myself</h5>
            <h6 style={{ color: "#A9A9A9" }}>
              Write better. Think more clearly. Stay organized.
            </h6>
          </div>
        </label>
        <input
          type="radio"
          name="options"
          id="card2"
          checked={selectedCard === "card2"}
          onChange={handleCardChange}
        />
        <label htmlFor="card2" className="buttonLabel">
          <div style={{ margin: "30px 10px" }}>
            <div className="img-container">
              <img
                src="https://cdn-icons-png.flaticon.com/32/567/567893.png"
                alt="not found"
              />
            </div>

            <h5>With my team</h5>
            <h6 style={{ color: "#A9A9A9" }}>
              Wikis, docs, tasks & projects, all in one place.
            </h6>
          </div>
        </label>
      </div>
    </div>
  );
}
