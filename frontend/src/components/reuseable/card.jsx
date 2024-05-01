import React from "react";

const Card = ({ activeKey, eventKey, onToggle, children }) => {
  console.log("Active key", activeKey);
  const isCardActive = activeKey === eventKey;

  const handleClick = () => {
    onToggle(eventKey);
  };

  return (
    <div className={`custom-card ${isCardActive ? "active" : ""}`}>
      <div className="card-header" onClick={handleClick}>
        {children[0]}
      </div>
      {isCardActive && <div className="card-body">{children[1]}</div>}
    </div>
  );
};

export default Card;
