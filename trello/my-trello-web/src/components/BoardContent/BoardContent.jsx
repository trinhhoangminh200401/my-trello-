import React, { useState, useEffect } from "react";
import Colum from "../Colum/Colum";
import "./BoardContent.scss";
import { Container, Draggable } from "react-smooth-dnd";
import { initData } from "../../action/initialdata";
import { mapSort } from "../../util/sort";
import { applyDrag } from "../../util/drag";
function BoardContent() {
  const [board, setBoard] = useState({});
  const [columns, setColums] = useState([]);
  useEffect(() => {
    const boardDB = initData.boards.find((board) => board.id === "board-1");
    if (boardDB) {
      setBoard(boardDB);
      setColums(mapSort(boardDB.columns, boardDB.columnOrder, "id"));
    }
  }, []);
  if (Object.keys(board).length === 0 && board.constructor === Object) {
    return <div>NotFound</div>;
  }
  const onCardDrop = (columnId,dropResult) => {
    if(dropResult.removeIndex !== null || dropResult.addIndex !== null) {
      console.log(dropResult)
      const newColums = [...columns]
      let currentColum = newColums.find(col => col.id === columnId)   
      currentColum.cards=applyDrag(currentColum.cards,dropResult)
      currentColum.cardOrder=currentColum.cards.map(card => card.id)  
      setColums(newColums)
    }
  }
  const onColumnDrop = (dropResult) => {
     let newColum=[...columns]
     newColum=applyDrag(newColum,dropResult)
    const newBoard = {...board}
    console.log(newBoard)
    newBoard.columnOrder=newColum.map(column =>(
      column.id
    ))
    newBoard.Colum= newColum
     setColums(newColum)
     setBoard(newBoard)

  };
  return (
    <div className="col board-colum">
      <Container
        orientation="horizontal"
        onDrop={onColumnDrop}
        getChildPayload={index=> columns[index]}
        dropHandleSelector=".column-drag-handle "
        dropPlaceholder={{
          animationDuration: 150,
          showOnTop: true,
          className: "cards-drop-preview",
        }}
      >
        {columns.map((columns, index) => (
          <Draggable key={index}>
            <Colum columns={columns} onCardDrop={onCardDrop} />
          </Draggable>
        ))}
      </Container>
      <div className="add-new pl-4 text-capitalize h-25 p-2"> <i className="fa fa-plus mr-1" /> add another column</div>
    </div>
  );
}

export default BoardContent;
