import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the API URL
const API_URL = 'http://localhost:8000/api/v1';

// Thunks for asynchronous actions like fetching, adding, updating, and deleting students
export const fetchStudents = createAsyncThunk('students/fetchStudents', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_URL}/student`);
    return response.data; // Return the list of students
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});

// Update addStudent to include the token in the headers
export const addStudent = createAsyncThunk('students/addStudent', async (studentData, { rejectWithValue }) => {
  try {
    // Get the token from local storage
    const token = localStorage.getItem('token');
    
    // Set the Authorization header
    const response = await axios.post(`${API_URL}/add-student`, studentData, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
    });
    return response.data; // Return the added student data
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});

export const updateStudent = createAsyncThunk(
  'students/updateStudent',
  async ({ id, studentData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`${API_URL}/student/${id}`, studentData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data; // Return the updated student data
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteStudent = createAsyncThunk('students/deleteStudent', async (id, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.delete(`${API_URL}/student/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Return the deleted student ID
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});

// The initial state of the student slice
const initialState = {
  students: [],
  isLoading: false,
  error: null,
};

// Create the student slice
const studentSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle fetching students
      .addCase(fetchStudents.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.students = action.payload; // Set the fetched students
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; // Set the error message
      })
      // Handle adding a student
      .addCase(addStudent.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addStudent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.students.push(action.payload.student); // Add the new student to the list
      })
      .addCase(addStudent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; // Set the error message
      })
      // Handle updating a student
      .addCase(updateStudent.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.students.findIndex(student => student._id === action.payload._id);
        if (index !== -1) {
          state.students[index] = action.payload; // Update the student
        }
      })
      // Handle deleting a student
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.students = state.students.filter(student => student._id !== action.payload); // Remove the deleted student
      });
  },
});

export default studentSlice.reducer;
