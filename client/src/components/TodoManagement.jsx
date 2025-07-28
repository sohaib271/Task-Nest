import { useState, useEffect } from "react";
import { FiTrash2, FiEdit2, FiSave, FiCheck, FiX } from "react-icons/fi";
import AddTodo from "./AddTodo";
import { persistor } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import Todo from "./functionality/todo";
import { removeTodo } from "../slices/todoslice";
import { logout } from "../slices/userSlice";
import { useLoading } from "./loading/loading";
import loading from "./loading/delay";

const TodoApp = () => {
  const myTodos = useSelector((state) => state.todo.todos);
  const dispatch = useDispatch();
  const { isLoading, startLoading, stopLoading } = useLoading();
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    if (myTodos) {
      setTodos(myTodos);
    }
  }, [myTodos]);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const deleteTodo = async (id) => {
    const result = await Todo.remove(id);
    if (result.deleteTask) {
      startLoading();
      dispatch(removeTodo(id));
      await loading(2);
      stopLoading();
    }
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleComplete = async (id, currentCompleted) => {
    try {
      // Call backend to toggle completed
      const result = await Todo.complete(id, !currentCompleted);

      if (result.update) {
        // Update local state
        setTodos(
          todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          )
        );

        // Update Redux store
        dispatch(isCompleted({ id, completed: !currentCompleted }));
      }
    } catch (error) {
      console.error("Error toggling complete:", error);
    }
  };

  const startEditing = (id, text) => {
    setEditingId(id);
    setEditText(text);
  };

  const saveEdit = (id) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, text: editText } : todo))
    );
    setEditingId(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const removeUser = () => {
    dispatch(logout());
    persistor.purge();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-6">
          <h1 className="text-2xl font-bold text-white">Todo App</h1>
          <p className="text-emerald-100">
            Get things done, one task at a time
          </p>
        </div>
        <AddTodo />
        <div className="divide-y divide-gray-200">
          {todos?.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              No tasks yet. Add one above!
            </div>
          ) : (
            todos?.map((todo) => (
              <div
                key={todo.id}
                className="p-4 hover:bg-gray-50 transition duration-150"
              >
                <div className="flex items-center justify-between">
                  {/* Checkbox and Todo Text */}
                  <div className="flex items-center flex-grow">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleComplete(todo.id, todo.completed)}
                      disabled={todo.completed} // <-- disable if completed
                      className={`h-5 w-5 text-emerald-500 rounded focus:ring-emerald-400 mr-3 ${
                        todo.completed ? "cursor-not-allowed opacity-50" : ""
                      }`}
                    />

                    {editingId === todo?.id ? (
                      <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="flex-grow px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        autoFocus
                      />
                    ) : (
                      <span
                        className={`flex-grow ${
                          todo.completed
                            ? "line-through text-gray-400"
                            : "text-gray-700"
                        }`}
                      >
                        {todo.task}
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2 ml-3">
                    {editingId === todo.id ? (
                      <>
                        <button
                          onClick={() => saveEdit(todo.id)}
                          className="p-1 text-white bg-emerald-500 rounded hover:bg-emerald-600 transition"
                          title="Save"
                        >
                          <FiSave size={18} />
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="p-1 text-gray-700 bg-gray-100 rounded hover:bg-gray-200 transition"
                          title="Cancel"
                        >
                          <FiX size={18} />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => startEditing(todo.id, todo.task)}
                          className="p-1 text-blue-500 hover:bg-blue-50 rounded transition"
                          title="Edit"
                        >
                          <FiEdit2 size={18} />
                        </button>
                        <button
                          onClick={() => deleteTodo(todo.id)}
                          className="p-1 text-red-500 hover:bg-red-50 rounded transition"
                          title="Delete"
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </>
                    )}
                  </div>
                </div>
                <div className="mt-1 text-xs text-gray-400">
                  Added: {new Date(todo.createdat).toLocaleString()}
                </div>
              </div>
            ))
          )}
        </div>
        <div className="bg-gray-50 px-6 py-3 text-sm text-gray-500">
          {todos.length} {todos.length === 1 ? "task" : "tasks"} total •{" "}
          {todos.filter((t) => t.completed).length} completed
        </div>
        <div className="flex justify-center my-4 ">
          <button
            onClick={removeUser}
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoApp;
