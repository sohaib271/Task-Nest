import {createSlice} from "@reduxjs/toolkit";

const initialState={
  todos:[{id:1,task:"Sohaib",createdby:2,completed:false}]
};

export const todoSlice=new createSlice({
  name:"todo",
  initialState,
  reducers:{
    addTodo:(state,action)=>{
      const todo={
        id:action.payload.id,
        task:action.payload.task,
        createdby:action.payload.createdby,
        completed:action.payload.completed
      }

      state.todos.push(todo);
    },
    removeTodo:(state,action)=>{
      state.todos=state.todos.filter(todo => todo.id!==action.payload);
    },

    updateTodo:(state,action)=>{
      state.todos=state.todos.map(todo => todo.id===action.payload.id?todo.task:action.payload.todo)
    },

    isCompleted:(state,action)=>{
      state.todos=state.todos.map(todo => todo.id===action.payload.id?todo.completed:true);
    },
    userOnly:(state,action)=>{
      state.todos=action.payload;
    }
  }
});

export const {addTodo,removeTodo,updateTodo,isCompleted,userOnly}=todoSlice.actions;

export default todoSlice.reducer;