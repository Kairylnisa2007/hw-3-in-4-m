import React from "react";

const Button = ({ onCLick }) => {
  return (
    <div className="todo-input-item">
      <button onClick={onCLick} className="primary-btn" type="button">
        Add
      </button>
    </div>
  );
};

export default Button;
