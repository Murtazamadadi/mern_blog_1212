import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    uploadStart:(state)=>{
      state.loading=true;
      state.error=false;
    },
    uploadSuccess:(state,action)=>{
      state.currentUser=action.payload;
      state.loading=false;
      state.error=null
    },
    uploadFailure:(stata,action)=>{
      stata.loading=false;
      stata.error=action.payload;
    }
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  uploadStart,
  uploadSuccess,
  uploadFailure,
} = userSlice.actions;

export default userSlice.reducer;
