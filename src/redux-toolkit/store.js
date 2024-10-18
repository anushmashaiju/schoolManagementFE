import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import studentReducer from './studentSlice'; // Import the student slice reducer
import feeReducer from './feeSlice';
import libraryReducer from './librarySlice';
const store = configureStore({
  reducer: {
    auth: authReducer,
    students: studentReducer, // Add student reducer here
    fees: feeReducer,
    library: libraryReducer,
  },
});

export default store;
