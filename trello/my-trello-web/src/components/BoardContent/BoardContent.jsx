import React, { useState, useEffect,useRef,useCallback} from "react";
import Colum from "../Colum/Colum";
import "./BoardContent.scss";
import { Container, Draggable } from "react-smooth-dnd";
import { initData } from "../../action/initialdata";
import { mapSort } from "../../util/sort";
import { applyDrag } from "../../util/drag";
function BoardContent() {
  const [board, setBoard] = useState({});
  const [columns, setColums] = useState([]);
  const [openNew,setOpenNew] = useState(false)
  const [newcolumn,setNewcolumn]=useState('')
  const newInputref = useRef(null)
  const onNewColumn = useCallback((e) => setNewcolumn(e.target.value)
    ,[]
  )
  
  useEffect(() => {
    const boardDB = initData.boards.find((board) => board.id === "board-1");
    if (boardDB) {
      setBoard(boardDB);
      setColums(mapSort(boardDB.columns, boardDB.columnOrder, "id"));
    }
  }, []);
  useEffect(() => {
    if(newInputref && newInputref.current){
      newInputref.current.focus()
      newInputref.current.select()
    }
  }, [openNew]);
  if (Object.keys(board).length === 0 && board.constructor === Object) {
    return <div>NotFound</div>;
  }
  const onCardDrop = (columnId, dropResult) => {
    if (dropResult.removeIndex !== null || dropResult.addIndex !== null) {
      console.log("dsa",dropResult);
      const newColums = [...columns];
      let currentColum = newColums.find((col) => col.id === columnId);
      currentColum.cards = applyDrag(currentColum.cards, dropResult);
      currentColum.cardOrder = currentColum.cards.map((card) => card.id);
      setColums(newColums);
    }
  };
  const toggleclick=()=>{
    setOpenNew(!openNew)

  }
  
  const onColumnDrop = (dropResult) => {
    let newColum = [...columns];
    newColum = applyDrag(newColum, dropResult);
    const newBoard = { ...board };
    console.log(newBoard);
    newBoard.columnOrder = newColum.map((column) => column.id);
    newBoard.Colum = newColum;
    setColums(newColum);
    setBoard(newBoard);
  };
  const addNewcolumn=()=>{
    if(!newcolumn){
      newInputref.current.focus()
      return
    }
    const newColumAdd = {
      id:Math.random().toString(36).substring(2,5),
      boardId:board.id,
      title:newcolumn.trim(),
      cardOrder:[],
      cards:[],  
    }
    let newColumns=[...columns]
    newColumns.push(newColumAdd)
    let newBoard={...board}
    newBoard.columnOrder= newColumns.map(c=>c.id)
    newBoard.columns=newColumns
    setColums(newColumns)
    setBoard(newBoard)
    setNewcolumn("")
  } 
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
            <Colum columns={columns} onCardDrop={onCardDrop} />
          </Draggable>
        ))}
      </Container>
      <div className="container h-25">
      { !openNew && 
        <div className=" row pl-4 add-new text-capitalize h-25 ml-1 p-2">
          <div className="col" onClick={toggleclick}>
            <i className="fa fa-plus mr-1" /> add another column
          </div>
        </div>
    
      }
      {
        openNew && 
        <div className="pl-4 row enter-new-column p-2 rounded text-capitalize h-25 ml-1 ">
          <div className="col col-enter">
            <input
              type="text"
              size="sm"
              className="form-control"
              ref={newInputref}
              placeholder="Enter column title....."
              value={newcolumn}
              onChange={onNewColumn}
              onKeyDown={e => (e.key ==="Enter") && addNewcolumn()}
            />
            <div className="d-flex align-items-center">
            <button className="btn btn-success add-todo" onClick={addNewcolumn}
            
            > Add colum</button>
            <span className="cancel mx-2" onClick={toggleclick}> <i className="fa fa-trash icon"></i> </span>
            </div>
          </div>
        </div>
      
      }
       
      </div>
    </div>
  );
}

export default BoardContent;
