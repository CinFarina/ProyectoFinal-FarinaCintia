// src/assets/components/ToastMessage.jsx
import React, { useState, useEffect } from 'react';

const ToastMessage = ({ message, type, duration = 3000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onClose) {
        onClose(); 
      }
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose, message]); 

  if (!isVisible) return null;

  const toastClasses = `toast-message ${type}`; // toast-message success, toast-message error, etc.

  return (
    <div className={toastClasses}>
      <p>{message}</p>
      <button className="toast-close-button" onClick={() => setIsVisible(false)}>X</button>
    </div>
  );
};

export default ToastMessage;