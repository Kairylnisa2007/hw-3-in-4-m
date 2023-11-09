// import React from "react";
// import { AiOutlineDelete } from "react-icons/ai";
// import { HiOutlineSaveAs} from "react-icons/hi";
// import { IoMdRefresh } from "react-icons/io";


// const TodoItem = ({
//   todoTitle,
//   todoDescription,
//   handleDeleteTodo,
//   handleDeleteCompletedTodo,
//   id,
//   handleCommit,
//   index,
//   isCompletedScreen,
// }) => {
//   const handleDelete = () => { 
//     if (isCompletedScreen) { 
//       handleDeleteCompletedTodo(id); 
//     } else { 
//       handleDeleteTodo(id); 
//     } 
//   };

//   return (
//     <div className="todo-list-item">
//       <div>
//         <h3>{todoTitle}</h3>
//         <p>{todoDescription}</p>
//       </div>
//       <div className="ourIcons">
//       {/* <GiGearHammer className="icon-edit" /> */}
//         <AiOutlineDelete onClick={handleDelete} title="Delete?" className="icon" />

//         {isCompletedScreen ? (
//           <IoMdRefresh className="icon" onClick={() => handleCommit(id)} />
//         ) : (
//           <HiOutlineSaveAs
//             onClick={() => handleCommit(id)}
//             title="Completed?"
//             className="save-icon"
//           />
//         )}
      
//       </div>
//     </div>
//   );
// };

// export default TodoItem;

import React from "react"; 
import { AiOutlineDelete } from "react-icons/ai"; 
import { HiOutlineSaveAs } from "react-icons/hi"; 
import { IoMdRefresh } from "react-icons/io"; 
 
const TodoItem = ({ 
  todoTitle, 
  todoDescription, 
  handleDeleteTodo, 
  handleDeleteCompletedTodo, 
  id, 
  handleCommit, 
  isCompletedScreen, 
}) => { 
  const handleDelete = () => { 
    if (isCompletedScreen) { 
      handleDeleteCompletedTodo(id); 
    } else { 
      handleDeleteTodo(id); 
    } 
  }; 
 
  return ( 
    <div className="todo-list-item"> 
      <div> 
        <h3>{todoTitle}</h3> 
        <p>{todoDescription}</p> 
      </div> 
      <div className="ourIcons"> 
        <AiOutlineDelete onClick={handleDelete} title="Delete" className="icon" /> 
 
        {isCompletedScreen ? ( 
          <IoMdRefresh className="icon" onClick={() => handleCommit(id)} /> 
        ) : ( 
          <HiOutlineSaveAs 
            onClick={() => handleCommit(id)} 
            title="Completed" 
            className="save-icon" 
          /> 
        )} 
      </div> 
    </div> 
  ); 
}; 
 
export default TodoItem;
