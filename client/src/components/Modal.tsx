import React from "react";
import ReactDOM from "react-dom";

function Modal(props: any) {
  const modal = (
    <div onClick={props.onDismiss} className="ui dimmer modals visible active">
      <div
        onClick={e => e.stopPropagation()}
        className="ui standard modal visible active"
      >
        <div className="header">{props.modalContent.header}</div>
        <div className="content">{props.modalContent.content}</div>
        <div className="actions">{props.modalContent.actions}</div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modal, document.getElementById("modal")!);
}

export default Modal;
