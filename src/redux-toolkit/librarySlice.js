import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Initial state
const initialState = {
  bookHistory: [],
  loading: false,
  error: null,
};

// Thunks for asynchronous operations


export const fetchLibraryHistory  = createAsyncThunk( 'library/fetchLibraryHistory', async () => {
    const response = await axios.get('http://localhost:8000/api/v1/library/all'); // Adjust the URL
    console.log('Fetched Fees Response:', response.data); // Log the response data
    return response.data; // Assuming response.data contains an array of fees with populated student details
});

export const addLibraryRecord = createAsyncThunk(
  'library/addLibraryRecord',
  async (newRecord, thunkAPI) => {
    try {
      const response = await axios.post('http://localhost:8000/api/v1/library', newRecord, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      return response.data.newLibraryHistory; // Make sure to return the right data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Failed to add library record');
    }
  }
);

export const updateLibraryRecord = createAsyncThunk(
  'library/updateLibraryRecord',
  async ({ id, updatedRecord }, thunkAPI) => {
    try {
      const response = await axios.put(`http://localhost:8000/api/v1/library/${id}`, updatedRecord, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Failed to update library record');
    }
  }
);

export const deleteLibraryRecord = createAsyncThunk(
  'library/deleteLibraryRecord',
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(`http://localhost:8000/api/v1/library/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      return response.data; // Return the deleted record ID
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Failed to delete library record');
    }
  }
);

// Slice
const librarySlice = createSlice({
  name: 'library',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLibraryHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLibraryHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.bookHistory = action.payload;
      })
      .addCase(fetchLibraryHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addLibraryRecord.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addLibraryRecord.fulfilled, (state, action) => {
        state.loading = false;
        state.bookHistory.push(action.payload);
      })
      .addCase(addLibraryRecord.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateLibraryRecord.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateLibraryRecord.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.bookHistory.findIndex(
          (record) => record._id === action.payload._id
        );
        if (index !== -1) {
          state.bookHistory[index] = action.payload;
        }
      })
      .addCase(updateLibraryRecord.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteLibraryRecord.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteLibraryRecord.fulfilled, (state, action) => {
        state.loading = false;
        state.bookHistory = state.bookHistory.filter(
          (record) => record._id !== action.payload // Correctly filter by ID
        );
      })
      .addCase(deleteLibraryRecord.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default librarySlice.reducer;
