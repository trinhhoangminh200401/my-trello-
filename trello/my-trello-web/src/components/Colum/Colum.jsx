import React from "react";
import Card from "../Card/Card";
import "./Colum.scss";
import { useState, useEffect, useRef } from "react";
import { Container, Draggable } from "react-smooth-dnd";
import ConfirmModal from "../Common/ConfirmModal";
import { saveContent, selectAllinline } from "../../util/contentEdit";
import {  MODAL_ACTION_CONFIRM } from "../../util/constant";
import { cloneDeep } from "lodash";
import { mapSort } from "../../util/sort";
import {  postDataCard,updateDataColumn } from "../../action/ApiCall";
function Colum(props) {
  const { columns, onCardDrop, onUpdateColumn } = props;
  const [isOpen, setOpen] = useState(false);
  const [isShow, setShow] = useState(false);
  const [isColumnTitle, setColumnTitle] = useState("");
  const [openNewCard, setOpenNewCard] = useState(false);
  const [card, setNewCard] = useState("");
  const newCardtextArea = useRef(null);
  const toggleclick = () => setOpenNewCard(!openNewCard);
  const onNewCardTitle = (e) => setNewCard(e.target.value);
  const cards = mapSort(columns.cards,columns.cardOrder,'_id')
  useEffect(() => {
    setColumnTitle(columns.title);
  }, [columns.title]);
  useEffect(() => {
    if (newCardtextArea && newCardtextArea.current) {
      newCardtextArea.current.focus();
      newCardtextArea.current.select();
    }
  }, [openNewCard]);
  // const cards = columns.cards;
  const toggle = () => {
    setOpen(!isOpen);
  };
  const toggleConfirm = () => setShow(!isShow);

  const onConfirm = (type) => {
    if (type === MODAL_ACTION_CONFIRM) {
      const newColumns = {
        ...columns,
        _destroy: true,
      };
      updateDataColumn(newColumns._id,newColumns).then(updated =>{
        onUpdateColumn(updated)
      })
      toggleConfirm();
    }
   
  };
  const changeColumnTitle = (e) => setColumnTitle(e.target.value);

  const handleBlur = () => {
   
    console.log(columns.title);
    console.log(isColumnTitle);
    if(isColumnTitle !==columns.title){
      const newColumns = {
        ...columns,
        title: isColumnTitle,
      };
       // Call api update column here
      updateDataColumn(newColumns._id,newColumns).then(updated =>{
        updated.cards = newColumns.cards
        onUpdateColumn(updated);
      })
    }
   

    
  };
  const addNewCard = () => {
    if(!card){
      newCardtextArea.current.focus()
      return
    }
    const newCardToAdd = {
      boardId: columns.boardId,
      columnId:columns._id,
      title:card.trim(),
    };
   postDataCard(newCardToAdd).then(cards=>{
    let newColum=cloneDeep(columns)
    if(!newColum.cards) return []
    newColum.cards.push(cards) 
    newColum.cardOrder.push(cards._id)
    onUpdateColumn(newColum)
    setNewCard("")
    toggleclick()
   
  
   })
 
 

  };
  const menuClass = `dropdown-menu ${isOpen ? "show" : ""}`;
  return (
    <div className="colum col">
      <div className="column-drag-handle">
        <div className="column-title">
          <input
            type="text"
            className="form-control editable"
            placeholder="Enter column title....."
            value={isColumnTitle}
            onClick={selectAllinline}
            onChange={changeColumnTitle}
            onBlur={handleBlur}
            onMouseDown={(e) => e.preventDefault()}
            onKeyDown={saveContent}
          />
        </div>
        <div className="column-dropdown-actions">
          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-btn"
              type="button"
              id="dropdownMenuButton"
              aria-haspopup="true"
              aria-expanded="false"
              size="sm"
              onClick={toggle}
            ></button>
            <div className={menuClass} aria-labelledby="dropdownMenuButton">
              <button className="dropdown-item">Add Card...</button>
              <button className="dropdown-item" onClick={toggleConfirm}>
                Remove column...
              </button>
              <button className="dropdown-item">
                Move all cards in this columns (beta)...
              </button>
              <button className="dropdown-item">
                Archive all cards in this columns (beta)...
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="group">
        <Container
          groupName="col"
          onDrop={(dropResult) => onCardDrop(columns._id, dropResult)}
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
         { openNewCard &&(
          <div className="add-new-card" style={{ width: "100%" }}>
            <div
              className=" my-1 rounded text-capitalize "
              style={{ width: "100%" }}
            >
              <div className="column">
                <textarea
                  size={"sm"}
                  rows={5}
                  className="form-control input-enter-new-card"
                  ref={newCardtextArea}
                  placeholder="Enter card title....."
                  value={card}
                  onChange={onNewCardTitle}
                  onKeyDown={(e) => e.key === "Enter" && addNewCard()}
                />
              </div>
            </div>
          </div>
          )}
      </div>
      
      <footer>
      {openNewCard &&(
        <div className="d-flex align-items-center p-1">
          <button
            className="btn btn-success add-todo"
             onClick={addNewCard}
          >
            Add Card
          </button>
          <span className="cancel-icon mx-2" onClick={toggleclick}>
            <i className="fa fa-trash icon"></i>{" "}
          </span>
        </div>
      )}
        {!openNewCard && (
          <div className="add pl-4 text-capitalize p-2 " onClick={toggleclick}>
            <i className="fa fa-plus mr-1" /> add other card
          </div>
        )}
      </footer>

      <ConfirmModal
        title="remove column"
        content={`Are you sure you want to remove ${columns.title} .All related cards will be removed`}
        onAction={onConfirm}
        show={isShow}
      />
    </div>
  );
}

export default Colum;
