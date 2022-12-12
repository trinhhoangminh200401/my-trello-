import React from 'react'
import Colum from '../Colum/Colum'
import './BoardContent.scss'
function BoardContent() {
  return (
    <div className="col board-colum d-flex">
    <Colum/>
    <Colum/>
    <Colum/>
    <Colum/>
   
  </div>
)
  
}

export default BoardContent