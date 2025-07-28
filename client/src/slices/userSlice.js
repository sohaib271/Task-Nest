import {createSlice} from "@reduxjs/toolkit";

const initialState={
  token:null,
  loggedInUser:null
};

const userSlice=new createSlice({
  name:"auth",
  initialState,
  reducers:{
    addToken:(state,action)=>{
      state.token=action.payload;
    },

    userInfo:(state,action)=>{
      state.loggedInUser={id:action.payload.id,email:action.payload.email,first_name:action.payload.first_name}
    },

    logout:(state)=>{
      state.token=null;
      state.loggedInUser={};
    }
  }
});

export const {addToken,userInfo,logout}=userSlice.actions;

export default userSlice.reducer;