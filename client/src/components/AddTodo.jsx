import { useState } from "react";
import {FiPlus} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { addTodo } from "../slices/todoslice";
import Todo from "./functionality/todo";
import { useLoading } from "./loading/loading";
import Spinner from "./loading/Spinner";
import loading from "./loading/delay";

function AddTodo(){

  const [newTodo,setNewTodo]=useState('');
  const user=useSelector((state)=>state.user.loggedInUser);
  const dispatch=useDispatch();
  const {isLoading,startLoading,stopLoading}=useLoading();

  const addTask = async() => {
    if (newTodo.trim() === '') return;
    const result= await Todo.add(newTodo,user.id);
    const todo=result.todo;

    if(todo){
      startLoading();
      dispatch(addTodo({id:todo.id,task:todo.task,createdby:todo.createdby,completed:todo.completed}));
      await loading(2);
      stopLoading();
      setNewTodo('');
    }else{
      console.log(result);
    }
  };

  return <>
     <div className="p-6 border-b border-gray-200">
      {isLoading && <Spinner/>}
          <div className="flex">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTask()}
              placeholder="What needs to be done?"
              className="flex-grow px-4 py-2 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button
              onClick={addTask}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-r-lg transition duration-200 flex items-center"
            >
              <FiPlus className="mr-1" /> Add
            </button>
          </div>
        </div>
  </>
}
export default AddTodo;