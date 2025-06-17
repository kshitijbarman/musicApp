import { createSlice } from '@reduxjs/toolkit';

const signupDataSlice  = createSlice({
    name:'data',
    initialState:{
        name:'',
        email:'',
        password:''
    },
    reducers:{
        setData:(state,action)=>{
            state.name=action.payload.name
            state.email=action.payload.email
            state.password=action.payload.password
        }
    }
})

export const {setData} = signupDataSlice.actions

export  default signupDataSlice.reducer