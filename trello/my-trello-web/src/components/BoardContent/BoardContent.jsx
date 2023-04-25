import React, { useState, useEffect, useRef } from "react";
import Colum from "../Colum/Colum";
import "./BoardContent.scss";
import { Container, Draggable } from "react-smooth-dnd";
import { mapSort } from "../../util/sort";
import { applyDrag } from "../../util/drag";
import { fetchData,postDataColumn } from "../../action/ApiCall";
 import { useParams,Link } from "react-router-dom";


function BoardContent() {
  const {id}=useParams()

    const [board, setBoard] = useState({});
  const [columns, setColums] = useState([]);
  const [openNew, setOpenNew] = useState(false);
  const [newcolumn, setNewcolumn] = useState("");
  const newInputref = useRef(null);
  const onNewColumn = (e) => setNewcolumn(e.target.value);
  const toggleclick = () => setOpenNew(!openNew);
  useEffect(() => {
   const boardId = '64205df7ba0bce1821c2f62f'
    fetchData(boardId ).then(board => {
      setBoard(board);
      setColums(mapSort(board.columns, board.columnOrder, "_id"));
    })
  
  }, []);
  useEffect(() => {
    if (newInputref && newInputref.current) {
      newInputref.current.focus();
      newInputref.current.select();
    }
  }, [openNew]);
  if (Object.keys(board).length === 0 && board.constructor === Object) {
    return <div>NotFound</div>;
  }
  const onCardDrop = (columnId, dropResult) => {
    if (dropResult.removeIndex !== null || dropResult.addIndex !== null) {
      console.log("dsa", dropResult);
      const newColums = [...columns];
      let currentColum = newColums.find((col) => col._id === columnId);
      currentColum.cards = applyDrag(currentColum.cards, dropResult);
      currentColum.cardOrder = currentColum.cards.map((card) => card._id);
      setColums(newColums);
    }
  };

  const onColumnDrop = (dropResult) => {
    let newColum = [...columns];
    newColum = applyDrag(newColum, dropResult);
    const newBoard = { ...board };
    // console.log(newBoard);
    newBoard.columnOrder = newColum.map((column) => column._id);
    newBoard.Colum = newColum;
    setColums(newColum);
    setBoard(newBoard);
  };
  const addNewcolumn = () => {
    // if (!newcolumn) {
    //   alert("dsajhgd")
    //   newInputref.current.focus();
    //   return;
    // }
    const newColumAdd = {
      boardId: board._id,
      title: newcolumn.trim(),
    };
    postDataColumn(newColumAdd).then(newcolumn =>{
      let newColumns = [...columns];
      newColumns.push(newcolumn );
      let newBoard = { ...board };
      newBoard.columnOrder = newColumns.map((c) => c._id);
      newBoard.columns = newColumns;
      setColums(newColumns);
      setBoard(newBoard);
      setNewcolumn("");
    })
   
  };
  const onUpdateColumn = (newcolumnsupdate) => {
    console.log(newcolumnsupdate)
    const columnID = newcolumnsupdate._id;

    let newColumnId = [...columns];

    const columnIndexUpdate = newColumnId.findIndex(
      (item) => item._id === columnID
    );

    if (newcolumnsupdate._destroy) {
      newColumnId.splice(columnIndexUpdate, 1);
    } else {
      newColumnId.splice(columnIndexUpdate, 1, newcolumnsupdate);
    }
    let newBoard = { ...board };
    newBoard.columnOrder = newColumnId.map((c) => c._id);
    newBoard.columns = newColumnId;
    setColums(newColumnId);
    setBoard(newBoard);
  };

  return (
  
  <div className="col board-colum">
      <Container
        orientation="horizontal"
        onDrop={onColumnDrop}
        getChildPayload={(index) => columns[index]}
        dropHandleSelector=".column-drag-handle "
        dropPlaceholder={{
          animationDuration: 150,
          showOnTop: true,
          className: "cards-drop-preview",
        }}
      >
        {columns.map((columns, index) => (
          <Draggable key={index}>
            <Colum
              columns={columns}
              onCardDrop={onCardDrop}
              onUpdateColumn={onUpdateColumn}
            />
          </Draggable>
        ))}
      </Container>
      <div className="container-non h-25">
        {!openNew && (
          <div className=" row pl-4 add-new text-capitalize h-25 ml-1 p-2">
            <div className="col" onClick={toggleclick}>
              <i className="fa fa-plus mr-1" /> add another column
            </div>
          </div>
        )}
        {openNew && (
          <div className="pl-4 row enter-new-column p-1 rounded text-capitalize h-25 ml-1 ">
            <div className="col col-enter">
              <input
                type="text"
                className="form-control"
                ref={newInputref}
                placeholder="Enter column title....."
                value={newcolumn}
                onChange={onNewColumn}
                onKeyDown={(e) => e.key === "Enter" && addNewcolumn()}
              />
              <div className="d-flex align-items-center">
                <button
                  className="btn btn-success add-todo"
                  onClick={addNewcolumn}
                >
                  {" "}
                  Add colum
                </button>
                <span className="cancel-icon mx-2" onClick={toggleclick}>
                  {" "}
                  <i className="fa fa-trash icon"></i>{" "}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
  
}

export default BoardContent;
