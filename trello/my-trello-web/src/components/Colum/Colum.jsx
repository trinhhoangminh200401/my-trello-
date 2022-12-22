import React from "react";
import Card from "../Card/Card";
import "./Colum.scss";
import { Container, Draggable } from "react-smooth-dnd";

function Colum(props) {
  const { columns , onCardDrop} = props;

  const cards = columns.cards;

  return (
    <div className="colum col">
      <div className="top-title">{columns.title}</div>
      <ul className="list-group">
        <Container
          groupName="col"
          onDrop={dropResult => onCardDrop(columns.id,dropResult)}
          getChildPayload={(index) => cards[index]}
          dragClass="card-ghost"
          dropClass="card-ghost-drop"
          dropPlaceholder={{
            animationDuration: 150,
            showOnTop: true,
            className: "cards-drop-preview ",
          }}
          dropPlaceholderAnimationDuration={200}
        >
          {cards.map((card, index) => (
            <Draggable key={index}>
              <Card card={card} />
            </Draggable>
          ))}
        </Container>
      </ul>
      <div className="add pl-4 text-capitalize p-2 "> <i className="fa fa-plus mr-1" /> add other card</div>
    </div>
  );
}

export default Colum;
