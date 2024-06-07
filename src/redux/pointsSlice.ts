import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  points: 5000
};

const pointsSlice = createSlice({
  name: 'points',
  initialState,
  reducers: {
    updatePoints(state, action) {
      state.points = action.payload;
    },
    resetPoints(state) {
      state.points = 5000;
    }
  }
});

export const { updatePoints, resetPoints } = pointsSlice.actions;
export default pointsSlice.reducer;
