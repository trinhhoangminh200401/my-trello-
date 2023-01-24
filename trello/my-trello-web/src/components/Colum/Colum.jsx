import React from "react";
import Card from "../Card/Card";
import "./Colum.scss";
import { useState } from "react";
import { Container, Draggable } from "react-smooth-dnd";

function Colum(props) {
  const { columns, onCardDrop } = props;
  const [isOpen, setOpen] = useState(false);
  const cards = columns.cards;
  const toggle=()=>{
    setOpen(!isOpen);
  }
  const menuClass = `dropdown-menu ${isOpen ? "show" : ""}`;
  return (
    <div className="colum col">
      <div className="column-drag-handle">
        <div className="top-title">{columns.title}</div>
        <div className="column-title"></div>
        <div className="column-dropdown-actions">
          <div className="dropdown">
            <button
              className="btn btn-secondary"
              type="button"
              id="dropdownMenuButton"
              aria-haspopup="true"
              aria-expanded="false"
              onClick={toggle}
            >
              ...
            </button>
            <div className={menuClass} aria-labelledby="dropdownMenuButton">
              <a className="dropdown-item" href="click">
                Action
              </a>
              <a className="dropdown-item" href="click">
                Another action
              </a>
              <a className="dropdown-item" href="click">
                Something else here
              </a>
            </div>
          </div>
        </div>
      </div>
      <ul className="list-group">
        <Container
          groupName="col"
          onDrop={(dropResult) => onCardDrop(columns.id, dropResult)}
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
      <div className="add pl-4 text-capitalize p-2 ">
        {" "}
        <i className="fa fa-plus mr-1" /> add other card
      </div>
    </div>
  );
}

export default Colum;
