import React from "react";
import AppBar from '../components/Appbar/AppBar'
import Boardbar from '../components/Boardbar/Boardbar'
import BoardContent from '../components/BoardContent/BoardContent'
import { Link } from "react-router-dom";

function Boardpage() {
  return (
    <div>
      <div className="container-trello">
        <div className="Bar-container">
           <AppBar/>
          <Boardbar />
        </div>
        <div className="container-fluid">
      
          <BoardContent />
         
        </div>
      </div>
    </div>
  );
}

export default Boardpage;
