import React, { useState } from 'react'
import { api } from './Api';
import { toast } from 'react-toastify';

const TodoForm = ({ sortOrder, setSortOrder, setTodos, todos }) => {

  const [adddata, setAddData] = useState("");
  const [priority, setPriority] = useState("");

  const addData = async (e) => {

    e.preventDefault();

    try {

      if (!adddata || !priority) {
        return toast.error("Add all fields");
      }

      const newTodo = {
        text: adddata,
        priority: priority,
      };

      const res = await api.post('/api/addtodo', newTodo);

      setTodos([...todos, res.data.data]);

      toast.success("Task Added Successfully!");

      setAddData("");
      setPriority("");

    } catch (error) {

      toast.error("Task already exists");

      console.log(error);

    }
  };

  return (
    <div>

      {/* Form */}
      <form
        className="flex flex-col gap-3"
        onSubmit={addData}
      >

        <input
          type="text"
          placeholder="Enter todo..."
          className="border text-lg px-3 py-2 rounded"
          value={adddata}
          onChange={(e) => setAddData(e.target.value)}
        />

        {/* Priority */}
        <div className="flex gap-3 text-sm">

          <label>
            <input
              type="radio"
              name="priority"
              value="high"
              checked={priority === "high"}
              onChange={(e) => setPriority(e.target.value)}
            />
            Important
          </label>

          <label>
            <input
              type="radio"
              name="priority"
              value="medium"
              checked={priority === "medium"}
              onChange={(e) => setPriority(e.target.value)}
            />
            Medium
          </label>

          <label>
            <input
              type="radio"
              name="priority"
              value="low"
              checked={priority === "low"}
              onChange={(e) => setPriority(e.target.value)}
            />
            Low
          </label>

        </div>

        <input
          type="submit"
          value="Add"
          className="px-5 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 cursor-pointer"
        />

      </form>

      {/* Sort */}
      <select
        className="border px-2 py-1 rounded mt-4 w-full"
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
      >
        <option value="latest">Latest First</option>
        <option value="oldest">Oldest First</option>
      </select>

    </div>
  )
}

export default TodoForm