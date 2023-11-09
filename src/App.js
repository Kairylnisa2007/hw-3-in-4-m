import React, { useEffect, useState } from "react";
import "./App.css";

import Input from "./components/Input";
import Button from "./components/Button";
import Switcher from "./components/Switcher";
import TodoItem from "./components/TodoItem";
import Clear from "./components/Clear";
import Edit from "./components/Edit"; 
import {GiGearHammer} from "react-icons/gi"
function App() {
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [allTodos, setAllTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [isCompletedScreen, setIsCompletedScreen] = useState(false);
/////
const [isEditing, setIsEditing] = useState(false); 
const [editedTodoId, setEditedTodoId] = useState(null); 
const [editedTodoTitle, setEditedTodoTitle] = useState(""); 
const [editedTodoDescription, setEditedTodoDescription] = useState(""); 
// /////// 
const handleEditTodo = (id) => { 
const todoToEdit = allTodos.find((item) => item.id === id); 
setEditedTodoId(id); 
setEditedTodoTitle(todoToEdit.title); 
setEditedTodoDescription(todoToEdit.description); 
setIsEditing(true); 
}; 

const handleEditedTodo = () => { 
const updatedTodos = allTodos.map((item) => { 
  if (item.id === editedTodoId) { 
    return { 
      ...item, 
      title: editedTodoTitle, 
      description: editedTodoDescription, 
    }; 
  } 
  return item; 
}); 

setAllTodos(updatedTodos); 
setIsEditing(false); 
setEditedTodoId(null); 
setEditedTodoTitle(""); 
setEditedTodoDescription(""); 
};

  useEffect(() => {
    const fetchTodos = async () => {
      await fetch("https://jsonplaceholder.typicode.com/todos")
        .then((res) => res.json())
        .then((res) => console.log(res));
    };
    fetchTodos();
  }, []);

  const handleAddNewTodo = () => {
    if (newDescription && newTodoTitle) {
      const date = new Date();
      let newTodoObj = {
        id: date.getMilliseconds(),
        title: newTodoTitle,
        description: newDescription,
      };

      let updatedTodoArr = [...allTodos];
      updatedTodoArr.push(newTodoObj);

      setAllTodos(updatedTodoArr);

      setNewTodoTitle("");
      setNewDescription("");
    }
  };

  const handleCommit = (index) => {
    const date = new Date();
    let dd = date.getDate();
    let mm = date.getMonth();
    let yyyy = date.getFullYear();
    let hh = date.getHours();
    let minutes = date.getMinutes();
    let ss = date.getSeconds();
    let finalDate = dd + "-" + mm + "-" + yyyy + "-" + " at" + hh + ":" + minutes + ":" + ss;

    let filteredTodo = {
      ...allTodos.find((item) => item.id === index),
      completed_at: finalDate,
    };

    let updatedList = [...completedTodos, filteredTodo];
    console.log(updatedList);
    setCompletedTodos(updatedList);

    handleDeleteTodo(index);
  };

  const handleToDo = (index) => {
    let todo = {
      ...completedTodos.find((item) => item.id === index),
    };

    setAllTodos([...allTodos, todo]);
    console.log(allTodos);

    handleDeleteCompletedTodo(index);
  };

  const handleDeleteTodo = (id) => {
    setAllTodos(allTodos.filter((item, index) => item.id !== id));
  };
  const handleDeleteCompletedTodo = (id) => {
    setAllTodos(completedTodos.filter((item, index) => item.id !== id));
  };

  const handleClear = () => {
    setAllTodos([]);
  };
  const hangleEdit = () =>{
setAllTodos([]);
  }
  return (
    <div className="App">
      <h1>My Todos</h1>
      <div className="todo-wrapper">
        <div className="todo-input">
          <Input
            value={newTodoTitle}
            setValue={setNewTodoTitle}
            name={"Title"}
            description={"What's the title of your To Do?"}
          />
          <Input
            value={newDescription}
            setValue={setNewDescription}
            name={"Description"}
            description={"What's the description of your To Do?"}
          />
          <Button onCLick={handleAddNewTodo} />
        </div>
        <div className="clear-wrapper">
          <Clear handleClear={handleClear} />
          <Switcher
            isCompletedScreen={isCompletedScreen}
            setIsCompletedScreen={setIsCompletedScreen}
          />
        </div>
        <div className="todo-list"> 
      {isCompletedScreen === true 
        ? completedTodos?.map((item, index) => ( 
            <div key={index}> 
              <TodoItem 
                handleCommit={handleToDo} 
                index={index} 
                handleDeleteTodo={handleDeleteTodo} 
                id={item.id} 
                isCompletedScreen={isCompletedScreen} 
                todoTitle={item.title} 
                todoDescription={item.description} 
                handleDeleteCompletedTodo={handleDeleteCompletedTodo} 
              /> 
            </div> 
          )) 
        : allTodos.map((item, index) => ( 
            <div key={index}> 
              <TodoItem 
                handleCommit={handleCommit} 
                index={index} 
                handleDeleteTodo={handleDeleteTodo} 
                isCompletedScreen={isCompletedScreen} 
                id={item.id} 
                todoTitle={item.title} 
                todoDescription={item.description} 
                handleDeleteCompletedTodo={handleDeleteCompletedTodo} 
              /> 
              {isEditing && editedTodoId === item.id && ( 
                <Edit 
                  isEditing={isEditing} 
                  editedTodoId={editedTodoId} 
                  editedTodoTitle={editedTodoTitle} 
                  editedTodoDescription={editedTodoDescription} 
                  setEditedTodoTitle={setEditedTodoTitle} 
                  setEditedTodoDescription={setEditedTodoDescription} 
                  handleSaveEditedTodo={handleEditedTodo} 
                /> 
              )} 
              < GiGearHammer onClick={() => handleEditTodo(item.id)} title="Edit" className="icon-edit" /> 
            </div> 
          ))} 
    </div>

 
          {/* <TodoItem title="Task2" description="to do homework2" /> */}
        </div>
      </div>
   
  );
}

export default App;


// import React, { useEffect, useState } from "react";
// import "./App.css";

// import Input from "./components/Input";
// import Button from "./components/Button";
// import Switcher from "./components/Switcher";
// import TodoItem from "./components/TodoItem";
// import Clear from "./components/Clear";
// // import Edit from "./components/Edit";
// function App() {
//   const [newTodoTitle, setNewTodoTitle] = useState("");
//   const [newDescription, setNewDescription] = useState("");
//   const [allTodos, setAllTodos] = useState([]);
//   const [completedTodos, setCompletedTodos] = useState([]);
//   const [isCompletedScreen, setIsCompletedScreen] = useState(false);
//   //////////////////////////////////////
//   // // const [tasks, setTasks] = useState([]);
//   // const [editingTask, setEditingTodos] = useState(null);
//   // // const [newTask, setNewTask] = useState('');

//   // function addTodos(list) {
//   //   setAllTodos([...allTodos, { id: Date.now(), text: list }]);
//   // }

//   // function editTodos(id, newText) {
//   //   setAllTodos(allTodos.map(task => (allTodos.id === id ? { ...allTodos, text: newText } : task)))
//   //   setEditingTodos(null);
//   // }

//   // function deleteTodos(id) {
//   //   setAllTodos(allTodos.filter(task => allTodos.id !== id));
//   // }

// ///////////////////////////////////////

//   useEffect(() => {
//     const fetchTodos = async () => {
//       await fetch("https://jsonplaceholder.typicode.com/todos")
//         .then((res) => res.json())
//         .then((res) => console.log(res));
//     };
//     fetchTodos();
//   }, []);

//   const handleAddNewTodo = () => {
//     if (newDescription && newTodoTitle) {
//       const date = new Date();
//       let newTodoObj = {
//         id: date.getMilliseconds(),
//         title: newTodoTitle,
//         description: newDescription,
//       };

//       let updatedTodoArr = [...allTodos];
//       updatedTodoArr.push(newTodoObj);

//       setAllTodos(updatedTodoArr);

//       setNewTodoTitle("");
//       setNewDescription("");
//     }
//   };

//   const handleCommit = (index) => {
//     const date = new Date();
//     let dd = date.getDate();
//     let mm = date.getMonth();
//     let yyyy = date.getFullYear();
//     let hh = date.getHours();
//     let minutes = date.getMinutes();
//     let ss = date.getSeconds();
//     let finalDate = dd + "-" + mm + "-" + yyyy + "-" + " at" + hh + ":" + minutes + ":" + ss;

//     let filteredTodo = {
//       ...allTodos.find((item) => item.id === index),
//       completed_at: finalDate,
//     };

//     let updatedList = [...completedTodos, filteredTodo];
//     console.log(updatedList);
//     setCompletedTodos(updatedList);

//     handleDeleteTodo(index);
//   };

//   const handleToDo = (index) => {
//     let todo = {
//       ...completedTodos.find((item) => item.id === index),
//     };

//     setAllTodos([...allTodos, todo]);
//     console.log(allTodos);

//     handleDeleteCompletedTodo(index);
//   };

//   const handleDeleteTodo = (id) => {
//     setAllTodos(allTodos.filter((item, index) => item.id !== id));
//   };
//   const handleDeleteCompletedTodo = (id) => {
//     setAllTodos(completedTodos.filter((item, index) => item.id !== id));
//   };

//   const handleClear = () => {
//     setAllTodos([]);
//   };
//   return (
//     <div className="App">
//       <h1>My Todos</h1>
//       <div className="todo-wrapper">
//         <div className="todo-input">
//           <Input
//             value={newTodoTitle}
//             setValue={setNewTodoTitle}
//             name={"Title"}
//             description={"What's the title of your To Do?"}
//           />
//           <Input
//             value={newDescription}
//             setValue={setNewDescription}
//             name={"Description"}
//             description={"What's the description of your To Do?"}
//           />
//           {/* //////////////////////////////////////////////////////////////// */}
 
//   {/* ///////////////////////////////////////////////////////////////////////////////// */}
//           <Button onCLick={handleAddNewTodo} />
//         </div>
//         <div className="clear-wrapper">
//           <Clear handleClear={handleClear} />
//           <Switcher
//             isCompletedScreen={isCompletedScreen}
//             setIsCompletedScreen={setIsCompletedScreen}
//           />
//         </div>
//         <div className="todo-list">
//           {isCompletedScreen === true
//             ? completedTodos?.map((item, index) => (
//                 <TodoItem
//                   handleCommit={handleToDo}
//                   key={index}
//                   index={index}
//                   handleDeleteTodo={handleDeleteCompletedTodo}
//                   id={item.id}
//                   isCompletedScreen={isCompletedScreen}
//                   todoTitle={item.title}
//                   todoDescription={item.description}
//                 />
//               ))
//             : allTodos.map((item, index) => (
//                 <TodoItem
//                   handleCommit={handleCommit}
//                   key={index}
//                   index={index}
//                   handleDeleteTodo={handleDeleteTodo}
//                   isCompletedScreen={isCompletedScreen}
//                   id={item.id}
//                   todoTitle={item.title}
//                   todoDescription={item.description}
//                 />
//               ))}
//               {/* <Edit/> */}
//           {/* <TodoItem title="Task2" description="to do homework2" />
//          <div className="edited"> */}
//           {/* <div>
//       {newTodoTitle.map( list => (
//         <div key={list.id}>
//           {editingTask === list.id ? (
//             <div>
//               <input
//                 type="text"
//                 value={list.text}
//                 onChange={e => editTodos(list.id, e.target.value)}
//               />
//             </div>
//           ) : (
//             <div>{list.text}</div>
//           )}
//           <button onClick={() => setEditingTodos(list.id)}>Edit</button>
//         </div>
//       ))}
//       <input
//         type="text"
//         value={newTodoTitle}
//         onChange={e => setNewTodoTitle(e.target.value)}
//       />
//       <button onClick={() => addTodos(newTodoTitle)}>Add Task</button>
//     </div> */}
//         {/* <button className="edit-btn">edit</button>
//         <button id="saveEdit" className="save-btn">save</button> */}
// {/*         
//       </div>  */}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;


// import React, { useEffect, useState } from "react"; 
// import "./App.css"; 
 
// import Input from "./components/Input"; 
// import Button from "./components/Button"; 
// import Switcher from "./components/Switcher"; 
// import TodoItem from "./components/TodoItem"; 
// import Clear from "./components/Clear"; 
 
// function App() { 
//   const [newTodoTitle, setNewTodoTitle] = useState(""); 
//   const [newDescription, setNewDescription] = useState(""); 
//   const [allTodos, setAllTodos] = useState([]); 
 
//   const [completedTodos, setCompletedTodos] = useState([]); 
//   const [isCompletedScreen, setIsCompletedScreen] = useState(""); 




 
//   const handleAddNewTodo = () => { 
//     if (newDescription && newTodoTitle) { 
//       const date = new Date(); 
//       let newTodoObj = { 
//         id: date.getMilliseconds(), 
//         title: newTodoTitle, 
//         description: newDescription, 
//       }; 
 
//       let updatedTodoArr = [...allTodos]; 
//       updatedTodoArr.push(newTodoObj); 
 
//       setAllTodos(updatedTodoArr); 
 
//       setNewTodoTitle(""); 
//       setNewDescription(""); 
//     } 
//   }; 
 
//   const handleDeleteTodo = (id) => { 
//     setAllTodos(allTodos.filter((item, index) => item.id !== id)); 
//   }; 
 
   
// // ////// /////////////////////////  ////////////  ////////////  //////////////  //////////// 
//   const handleComplete = (id) => { 
//     const date = new Date(); 
//     let dd = date.getDate(); 
//     let mm = date.getMonth() + 1; 
//     let yyyy = date.getFullYear(); 
//     let hh = date.getHours(); 
//     let minutes = date.getMinutes(); 
//     let finalDate = 
//       dd + "-" + mm + "-" + yyyy + " at " + hh + ":" + minutes; 
 
//     let filteredTodo = { 
//       ...allTodos[id], 
//       completedOn: finalDate, 
//     }; 
 
//     let updatedCompletedList = [...completedTodos, filteredTodo]; 
//     setCompletedTodos(updatedCompletedList); 
 
//     localStorage.setItem("completedTodos", JSON.stringify(updatedCompletedList)); 
//     handleDeleteTodo(id); 
     
//   }; 
 
//   const handleReturnToTodo = (id) => { 
//     const completedTask = completedTodos.find((task) => task.id === id); 
 
//     if (completedTask) { 
//       const updatedCompletedList = completedTodos.filter((task) => task.id !== id); 
 
//       setCompletedTodos(updatedCompletedList); 
//       setAllTodos([...allTodos, completedTask]); 
//     }; 
//   }; 
 
//   const handleClear = () => { 
//     setAllTodos([]); 
//   }; 
 
//   return ( 
//     <div className="App"> 
//       <h1>My Todos</h1> 
//       <div className="todo-wrapper"> 
//         <div className="todo-input"> 
//           <Input 
//             value={newTodoTitle} 
//             setValue={setNewTodoTitle} 
//             name={"Title"} 
//             description={"What's the title of your To Do?"} 
//           /> 
//           <Input 
//             value={newDescription} 
//             setValue={setNewDescription} 
//             name={"Description"} 
//             description={"What's the description of your To Do?"} 
//           /> 
//           <Button onClick={handleAddNewTodo} /> 
//         </div> 
//         <div className="clear-wrapper"> 
//           <Clear handleClear={handleClear} /> 
//           <Switcher isCompletedScreen={isCompletedScreen} setIsCompletedScreen={setIsCompletedScreen} /> 
//         </div> 
 
         
// {/*  */} 
//         <div className="todo-list" > 
//         {isCompletedScreen 
//             ? completedTodos.map((item, index) => ( 
//                 <TodoItem 
//                   key={item.id} 
//                   handleReturnToTodo={() => handleReturnToTodo(item.id)} 
//                   todoTitle={item.title} 
//                   todoDescription={item.description} 
//                   isCompleted={true} 
//                 /> 
//               )) 
//             : allTodos.map((item, index) => ( 
//                 <TodoItem 
//                   key={item.id} 
//                   handleDeleteTodo={() => handleDeleteTodo(item.id)} 
//                   handleComplete={() => handleComplete(item.id)} 
//                   todoTitle={item.title} 
//                   todoDescription={item.description} 
//                 /> 
//               ))} 
 
//         </div> 
        
//       </div> 
//     </div> 
//   ); 
// } 
 
// export default App;



















////////////////////////////////////////////////////////////
// import React, {useState, useEffect} from 'react';
// import './App.css';
// import {AiOutlineDelete} from 'react-icons/ai';
// import {BsCheckLg} from 'react-icons/bs';
// function App () {
//   const [allTodos, setAllTodos] = useState ([]);
//   const [newTodoTitle, setNewTodoTitle] = useState ('');
//   const [newDescription, setNewDescription] = useState ('');
//   const [completedTodos, setCompletedTodos] = useState ([]);
//   const [isCompletedScreen, setIsCompletedScreen] = useState (false);

//   const handleAddNewToDo = () => {
//     let newToDoObj = {
//       title: newTodoTitle,
//       description: newDescription,
//     };
//     // console.log (newToDoObj);
//     let updatedTodoArr = [...allTodos];
//     updatedTodoArr.push (newToDoObj);
//     // console.log (updatedTodoArr);
//     setAllTodos (updatedTodoArr);
//     localStorage.setItem ('todolist', JSON.stringify (updatedTodoArr));
//     setNewDescription ('');
//     setNewTodoTitle ('');
//   };

//   useEffect (() => {
//     let savedTodos = JSON.parse (localStorage.getItem ('todolist'));
//     let savedCompletedToDos = JSON.parse (
//       localStorage.getItem ('completedTodos')
//     );
//     if (savedTodos) {
//       setAllTodos (savedTodos);
//     }

//     if (savedCompletedToDos) {
//       setCompletedTodos (savedCompletedToDos);
//     }
//   }, []);

//   const handleToDoDelete = index => {
//     let reducedTodos = [...allTodos];
//     reducedTodos.splice (index,1);
//     // console.log (index);

//     // console.log (reducedTodos);
//     localStorage.setItem ('todolist', JSON.stringify (reducedTodos));
//     setAllTodos (reducedTodos);
//   };

//   const handleCompletedTodoDelete = index => {
//     let reducedCompletedTodos = [...completedTodos];
//     reducedCompletedTodos.splice (index);
//     // console.log (reducedCompletedTodos);
//     localStorage.setItem (
//       'completedTodos',
//       JSON.stringify (reducedCompletedTodos)
//     );
//     setCompletedTodos (reducedCompletedTodos);
//   };

//   const handleComplete = index => {
//     const date = new Date ();
//     var dd = date.getDate ();
//     var mm = date.getMonth () + 1;
//     var yyyy = date.getFullYear ();
//     var hh = date.getHours ();
//     var minutes = date.getMinutes ();
//     var ss = date.getSeconds ();
//     var finalDate =
//       dd + '-' + mm + '-' + yyyy + ' at ' + hh + ':' + minutes + ':' + ss;

//     let filteredTodo = {
//       ...allTodos[index],
//       completedOn: finalDate,
//     };

//     // console.log (filteredTodo);

//     let updatedCompletedList = [...completedTodos, filteredTodo];
//     console.log (updatedCompletedList);
//     setCompletedTodos (updatedCompletedList);
//     localStorage.setItem (
//       'completedTodos',
//       JSON.stringify (updatedCompletedList)
//     );
//     // console.log (index);

//     handleToDoDelete (index);
//   };

//   return (
//     <div className="App">
//       <h1>My Todos</h1>

//       <div className="todo-wrapper">

//         <div className="todo-input">
//           <div className="todo-input-item">
//             <label>Title:</label>
//             <input
//               type="text"
//               value={newTodoTitle}
//               onChange={e => setNewTodoTitle (e.target.value)}
//               placeholder="What's the title of your To Do?"
//             />
//           </div>
//           <div className="todo-input-item">
//             <label>Description:</label>
//             <input
//               type="text"
//               value={newDescription}
//               onChange={e => setNewDescription (e.target.value)}
//               placeholder="What's the description of your To Do?"
//             />
//           </div>
//           <div className="todo-input-item">
//             <button
//               className="primary-btn"
//               type="button"
//               onClick={handleAddNewToDo}
//             >
//               Add
//             </button>
//           </div>
//         </div>
//         <div className="btn-area">
//           <button
//             className={`secondaryBtn ${isCompletedScreen === false && 'active'}`}
//             onClick={() => setIsCompletedScreen (false)}
//           >
//             To Do
//           </button>
//           <button
//             className={`secondaryBtn ${isCompletedScreen === true && 'active'}`}
//             onClick={() => setIsCompletedScreen (true)}
//           >
//             Completed
//           </button>
//         </div>
//         <div className="todo-list">

//           {isCompletedScreen === false &&
//             allTodos.map ((item, index) => (
//               <div className="todo-list-item" key={index}>
//                 <div>
//                   <h3>{item.title}</h3>
//                   <p>{item.description}</p>

//                 </div>
//                 <div>
//                   <AiOutlineDelete
//                     title="Delete?"
//                     className="icon"
//                     onClick={() => handleToDoDelete (index)}
//                   />
//                   <BsCheckLg
//                     title="Completed?"
//                     className=" check-icon"
//                     onClick={() => handleComplete (index)}
//                   />
//                 </div>
//               </div>
//             ))}

//           {isCompletedScreen === true &&
//             completedTodos.map ((item, index) => (
//               <div className="todo-list-item" key={index}>
//                 <div>
//                   <h3>{item.title}</h3>
//                   <p>{item.description}</p>
//                   <p> <i>Completed at: {item.completedOn}</i></p>
//                 </div>
//                 <div>
//                   <AiOutlineDelete
//                     className="icon"
//                     onClick={() => handleCompletedTodoDelete (index)}
//                   />
//                 </div>
//               </div>
//             ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;


