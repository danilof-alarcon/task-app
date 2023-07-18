import './AlertMessage.css'
import React from 'react';

function AlertMessage({ message, type }) {

  let className = '';

  switch (type) {
    case 'correct':
      className = 'correct';
      break;
    case 'error':
      className = 'error';
      break;
    case 'alert':
      className = 'alert';
      break;
    default:
      break;
  }

  return (
    <div className={className} id='alert-message'>
        <p>{message}</p>
    </div>
  );
}

export default AlertMessage;
