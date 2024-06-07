import { configureStore } from '@reduxjs/toolkit';
import pointsReducer from './pointsSlice';
import userReducer from './userSlice';

const store = configureStore({
  reducer: {
    points: pointsReducer,
    user: userReducer
  }
});

export default store;
