import React, { useState, useEffect, useRef } from "react";
import Colum from "../Colum/Colum";
import "./BoardContent.scss";
import { Container, Draggable } from "react-smooth-dnd";
import { mapSort } from "../../util/sort";
import { applyDrag } from "../../util/drag";
import { fetchData,postDataColumn,updateDataBoard, updateDataColumn} from "../../action/ApiCall";
 import { useParams,Link } from "react-router-dom";
import { isEmpty,cloneDeep } from "lodash";

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
  if (isEmpty(board)) {
    return <div>NotFound</div>;
  }
  

  const onColumnDrop = (dropResult) => {
    let newColum = cloneDeep(columns);
    newColum = applyDrag(newColum, dropResult);
    const newBoard = cloneDeep(board);
    // console.log(newBoard);
    newBoard.columnOrder = newColum.map((column) => column._id);
    newBoard.columns = newColum;
    // call api
    setColums(newColum);
      setBoard(newBoard);
    updateDataBoard(newBoard._id,newBoard).catch(error => {
      console.log(error);
      setColums(columns);
       setBoard(newBoard);
    })
 
  };
  const onCardDrop = (columnId, dropResult) => {
    if (dropResult.removedIndex !== null || dropResult.addIndex !== null) {
      const newColums = cloneDeep(columns);
      let currentColum = newColums.find((col) => col._id === columnId);
      currentColum.cards = applyDrag(currentColum.cards, dropResult);
      currentColum.cardOrder = currentColum.cards.map((card) => card._id);
      setColums(newColums);
     
      if (dropResult.removedIndex !== null && dropResult.addIndex !== null) {
        updateDataColumn(currentColum._id,currentColum).catch(()=>{
          setColums(columns)
        })
      }
       else{
        updateDataColumn(currentColum._id,currentColum).catch(()=>{ 
          setColums(columns)
        })
        let currentCard=cloneDeep(dropResult.payload)
        currentCard.columnId=currentColum._id
        // move card between two column
        // updaye cardorder two column and card
        console.log(currentCard);
       }
        
    }
    
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
