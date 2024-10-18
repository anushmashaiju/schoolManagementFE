import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the API URL
const API_URL = 'http://localhost:8000/api/v1';

// Thunks for asynchronous actions like login and register
export const loginUser = createAsyncThunk('auth/loginUser', async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_URL}/user-login`, userData);
    console.log(response);
    
    // Save token to localStorage
    localStorage.setItem('token', response.data.token); 
    return response.data; // Return user data, including user and token
  } catch (error) {
    // Return a more user-friendly error message
    return rejectWithValue(error.response?.data?.message || 'Login failed');
  }
});

export const registerUser = createAsyncThunk('auth/registerUser', async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_URL}/user-register`, userData);
    console.log("Registration Response:", response);
    return response.data; // Ensure the response contains necessary user data
  } catch (error) {
    console.error("Registration Error:", error.response); // Log the full error response
    return rejectWithValue(error.response?.data?.message || 'Registration failed');
  }
});

// The initial state of the auth slice
const initialState = {
  user: null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'), // Determine if authenticated based on token
  isLoading: false,
  error: null,
};

// Create the auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token'); // Clear token from localStorage
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Clear error on new request
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user; // Ensure user info is assigned correctly
        state.token = action.payload.token; // Save token to state
        state.isAuthenticated = true; // Update authenticated state
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; // Assign error message from the payload
      })
      // Handle registration
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Clear error on new request
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user; // Assign registered user to state if needed
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; // Assign error message from the payload
      });
  },
});

// Export actions and reducer
export const { logout } = authSlice.actions;
export default authSlice.reducer;
