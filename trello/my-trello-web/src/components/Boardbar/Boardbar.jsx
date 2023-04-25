import {React,useRef, useEffect,useState} from "react";

function Boardbar() {
  const newTitleBoard = useRef(null)
  const [openBoard,setopenBoard]=useState(false)
  const [boardTitle,setBoardTitle]=useState("")
  const onTitlechange = (e) => setBoardTitle(e.target.value);
  const onToggleClick=()=> setopenBoard(!openBoard)
  useEffect(() => {
    if(newTitleBoard  && newTitleBoard.current){
      newTitleBoard.current.focus()
      newTitleBoard.current.select()
    } 
   
  }, [openBoard]);
  return (
    <nav className="navbar-board navbar bg-light ">
      <div className="container-fluid board-container">
        <div className="board-container_input">
         <h5 className="font-weight-bold"> 
         <input type="text" 
         className="editable form-control "  
         value={boardTitle}
          onClick={onToggleClick}         
         onChange={onTitlechange} 
         ref={newTitleBoard}/>
         
         </h5>
        
        </div>
      </div>
    </nav>
  );
}

export default Boardbar;
