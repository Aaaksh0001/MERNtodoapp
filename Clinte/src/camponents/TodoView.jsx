import React from 'react'
import TimeAgo from './TimeAgo'
import { MdCheckBox } from "react-icons/md";
import { IoMdTrash } from 'react-icons/io';
import { api } from './Api';
import { toast } from 'react-toastify';

const TodoView = ({ todo, todos, setTodos }) => {

  // Complete Task
  const TaskComplet = async (id) => {

    try {

      const updatedTodos = todos.map((item) =>
        item._id === id
          ? { ...item, isComplet: !item.isComplet }
          : item
      );

      setTodos(updatedTodos);

      const currentTodo = todos.find((item) => item._id === id);

      await api.put(`/api/updatetodo/${id}`, {
        isComplet: !currentTodo.isComplet
      });

      if (!currentTodo.isComplet) {
        toast.success("Task Completed");
      } else {
        toast.info("Task changed to Incomplete");
      }

    } catch (error) {

      toast.error("Update Failed");

      console.log(error);

    }
  };

  // Delete Task
  const TaskDelete = async (id) => {

    try {

      const filter = todos.filter((item) => item._id !== id);

      setTodos(filter);

      await api.delete(`/api/deletetodo/${id}`);

      toast.error("Task Deleted Successfully");

    } catch (error) {

      toast.error("Delete Failed");

      console.log(error);

    }
  };

  return (

    <div
      className={`p-3 grid grid-cols-3 gap-5 border rounded mb-2 shadow-sm 
      ${todo.isComplet ? 'opacity-45' : 'opacity-100'}`}
    >

      <div className='col-span-2'>

        <p className={`font-semibold ${todo.isComplet ? 'line-through' : ''}`}>
          {todo.text}
        </p>

        <small className="block text-gray-500">
          Priority:{" "}

          <span
            className={
              todo.priority === "high"
                ? "text-red-500"
                : todo.priority === "medium"
                  ? "text-yellow-500"
                  : "text-green-500"
            }
          >
            {todo.priority}
          </span>

        </small>

        <small className="block text-gray-400">
          <TimeAgo date={todo.createdDate} />
        </small>

      </div>

      <div className='grid grid-cols-2 content-center'>

        <MdCheckBox
          className='text-3xl text-green-600 hover:scale-120 cursor-pointer'
          onClick={() => TaskComplet(todo._id)}
        />

        <IoMdTrash
          className='text-3xl text-red-700 hover:scale-120 cursor-pointer'
          onClick={() => TaskDelete(todo._id)}
        />

      </div>

    </div>
  )
}

export default TodoView