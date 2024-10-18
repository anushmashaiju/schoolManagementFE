import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for fetching fees
export const fetchFees = createAsyncThunk('fees/fetchFees', async () => {
    const response = await axios.get('http://localhost:8000/api/v1/fees/all'); // Adjust the URL
    console.log('Fetched Fees Response:', response.data); // Log the response data
    return response.data; // Assuming response.data contains an array of fees with populated student details
});

// Async thunk for adding a fee
export const addFee = createAsyncThunk('fees/addFee', async (feeEntry) => {
    try {
        console.log('Sending Fee Entry:', feeEntry); // Log to verify data
        const response = await axios.post('http://localhost:8000/api/v1/fees', feeEntry); // Correct URL for the POST request
        console.log('Response from server:', response.data); // Log the response
        return response.data; // Return the response data (created fee entry)
    } catch (error) {
        console.error('Error adding fee:', error); // Log any error that occurs
        throw error;
    }
});

// Async thunk for deleting a fee
export const deleteFee = createAsyncThunk('fees/deleteFee', async (id) => {
    await axios.delete(`http://localhost:8000/api/v1/fees/${id}`); // Adjust the URL
    return id; // Return the id to delete from the state
});

// Async thunk for updating a fee
export const updateFeesHistory = createAsyncThunk('fees/updateFeesHistory', async ({ id, updatedRecord }) => {
    const response = await axios.put(`http://localhost:8000/api/v1/fees/${id}`, updatedRecord); // Correct URL for the PUT request
    return response.data; // Return the updated fee record
});

// Create fees slice
const feesSlice = createSlice({
    name: 'fees',
    initialState: {
        fees: [],
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchFees.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchFees.fulfilled, (state, action) => {
                state.isLoading = false;
                state.fees = action.payload;
            })
            .addCase(fetchFees.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(addFee.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addFee.fulfilled, (state, action) => {
                state.fees.push(action.payload);
                state.isLoading = false;
                state.error = null;
            })
            .addCase(addFee.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(deleteFee.fulfilled, (state, action) => {
                state.fees = state.fees.filter(fee => fee._id !== action.payload);
            })
            .addCase(updateFeesHistory.fulfilled, (state, action) => {
                const index = state.fees.findIndex(fee => fee._id === action.payload._id);
                if (index !== -1) {
                    state.fees[index] = action.payload; // Replace the old fee with the updated one
                }
            });
    },
});

// Export the reducer to be used in the store
export default feesSlice.reducer;