import React from 'react'
import { MODAL_ACTION_CLOSE,MODAL_ACTION_CONFIRM } from '../../util/constant'
function ConfirmModal(props) {
    const {title, content,show,onAction}=props
    return ( 
        <>
        {
            show && 
            <div className= "modal" tabIndex="-1" role="dialog" style={{display:"block",backgroundColor:"#333333"}}>
            <div className= "modal-dialog" role="document" >
              <div className="modal-content">
                <div className="modal-header">
                  <p className="h2 modal-title" >{title}</p>
                  <button type="button" className="close" onClick={()=>onAction(MODAL_ACTION_CLOSE)} data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <p>{content}</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-primary" onClick={()=>onAction(MODAL_ACTION_CONFIRM)}>Confirm</button>
                  <button type="button" className="btn btn-secondary" onClick={()=>onAction(MODAL_ACTION_CLOSE)} data-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>
          
        }
        </>  
  )
 
}

export default ConfirmModal