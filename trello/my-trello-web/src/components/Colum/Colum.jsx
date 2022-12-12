import React from "react";
import Task from "../Task/Task";
import './Colum.scss'
function Colum() {
  return (
    <div className="colum col">
      <div className="top-title">Title here</div>
      <ul className="list-group">
        <Task />
        </ul>
      <div className="add pl-4 text-capitalize">add other card</div>
    </div>
  );
}

export default Colum;
