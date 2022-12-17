import React from "react";
import Card from "../Card/Card";
import "./Colum.scss";
import { Container, Draggable } from "react-smooth-dnd";

function Colum(props) {
  const { columns } = props;

  const cards = columns.cards;
  const onCardDrop = (dropResult) => {
    console.log(dropResult);
  };
  return (
    <div className="colum col">
      <div className="top-title">{columns.title}</div>
      <ul className="list-group">
        <Container
          groupName="col"
          onDrop={onCardDrop}
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
      <div className="add pl-4 text-capitalize">add other card</div>
    </div>
  );
}

export default Colum;
