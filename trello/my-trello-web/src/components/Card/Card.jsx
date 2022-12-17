import React from "react";
import "./Card.scss";

function Card(props) {
  const { card } = props;
  return (
    <li className="list-group-item">
      {card.cover && 
      <img src={card.cover} 
      className="w-100"
      onMouseDown={e=> e.preventDefault()}
      alt="img" />}
      {card.title}
    </li>
  );
}

export default Card;
