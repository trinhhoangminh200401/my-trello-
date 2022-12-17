import React, { useState, useEffect } from "react";
import Colum from "../Colum/Colum";
import "./BoardContent.scss";
import { Container, Draggable } from "react-smooth-dnd";
import { initData } from "../../action/initialdata";
import { mapSort } from "../../util/sort";
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
  const onColumnDrop = (dropResult) => {
    console.log(dropResult)
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
            <Colum columns={columns} />
          </Draggable>
        ))}
      </Container>
    </div>
  );
}

export default BoardContent;
