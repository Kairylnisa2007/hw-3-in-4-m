import React from "react";

const Input = ({ name, description, value, setValue }) => {
  return (
    <div className="todo-input-item">
      <label>{name}:</label>
      <input
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
        }}
        type="text"
        placeholder={description}
      />
    </div>
  );
};

export default Input;
