import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface IUserState {
    user: any;
    isAuthenticated: boolean; 
}


const initialState: IUserState = {
  user: null,
  isAuthenticated: false
}

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
        state.user = action.payload;
    },
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
        state.isAuthenticated = action.payload;
    },
  },
})

export const { setUser, setIsAuthenticated } = userSlice.actions;