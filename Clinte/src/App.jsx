import React, { useEffect, useState } from "react";
import TodoView from "./camponents/TodoView";
import TodoForm from "./camponents/TodoForm";
import { api } from "./camponents/Api";
import { ToastContainer, toast } from "react-toastify";
function App() {

  const [todos, setTodos] = useState([]);
  const [sortOrder, setSortOrder] = useState("latest");
  

  // 📥 Load from localStorage
  useEffect(() => {

    api.get('/api/gettodo').then((res)=>{
     setTodos(res.data.data)
    })
   
  }, []);
  
  // 📅 Sorting
  const sortedTodos = [...todos].sort((a, b) => {
   
    return sortOrder === "latest"
      ? new Date(b.createdDate) - new Date(a.createdDate) 
      : new Date(a.createdDate) - new Date(b.createdDate);
  });


  return (
    
    <section className="grid h-screen justify-center items-center bg-gray-100">
      <ToastContainer position="top-right" autoClose={2000}/>
      <div className="bg-white shadow-lg p-6 rounded-lg w-100">
        <h1 className="text-3xl font-bold text-center mb-4">Todo App</h1>
        <TodoForm todos={todos} setTodos={setTodos} sortOrder={sortOrder} setSortOrder={setSortOrder}  />

        {/* Todo List */}
        <div className="mt-4 max-h-60 overflow-y-auto">
          {sortedTodos.length === 0 ? (
            <p className="text-center text-gray-400">No todos yet</p>
          ) : (
            sortedTodos.map((todo, index) => (
             <TodoView key={index} todo={todo} todos={todos} setTodos={setTodos} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}

export default App;