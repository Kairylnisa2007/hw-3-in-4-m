import React, { useState } from "react";

const Switcher = ({ isCompletedScreen, setIsCompletedScreen }) => {
  return (
    <div className="btn-area">
      <button
        onClick={() => setIsCompletedScreen(false)}
        className={`secondaryBtn ${isCompletedScreen === false && "active"}`}>
        To Do
      </button>
      <button
        onClick={() => setIsCompletedScreen(true)}
        className={`secondaryBtn ${isCompletedScreen === true && "active"}`}>
        Completed
      </button>
    </div>
  );
};

export default Switcher;

