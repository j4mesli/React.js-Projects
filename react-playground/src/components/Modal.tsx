import React from 'react';
import ReactDOM from 'react-dom';
import './modal.css';

// passing elements as props and emitting them is very easy and lightweight, very conveinent 
// this allows for children to be one or more elements
function Modal(props: { children: JSX.Element | JSX.Element[], handleClose: () => void, isSalesModal: boolean, }) {
  // this picks up and puts down the selected element at the bottom of the body tag, very interesting
  // called a portal, like a teleporter
  return ReactDOM.createPortal((
    <div className='modal-backdrop'>
        {/* below is the syntax for inline styles in TSX */}
        <div className="modal" style={{ 
            border: "4px solid", 
            // below is the syntax for conditional styles, just ternary operator
            borderColor: props.isSalesModal ? "#ff4500" : "#555",
            textAlign: "center",
          }}>
          { props.children }
          <br />
          <button 
            onClick={ props.handleClose } 
            className={ props.isSalesModal ? "sales-btn" : "" }
          >Close
          </button>
        </div>
    </div>
  ), document.body);
}

export default Modal;