import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Async function to fetch initial users
export const addInitialUsersAsync = createAsyncThunk('user/addInitialUsers', async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await response.json();
    return data;
});

// Slice for user state management
export const userSlice = createSlice({
    name: 'user',
    initialState: {
        users: [],
        status: 'idle',
        error: null
    },
    reducers: {
        // Reducer to add a user
        addUser: (state, action) => {
            state.users.push(action.payload);
        },
        // Reducer to remove a user
        removeUser: (state, action) => {
            state.users = state.users.filter(user => user.id !== action.payload.id);
        },
        // Reducer to update a user
        updateUser: (state, action) => {
            const index = state.users.findIndex(user => user.id === action.payload.id);
            if (index !== -1) {
                state.users[index] = action.payload;
            }
        }
    },
    extraReducers: (builder) => {
        builder
            // Case for pending state of fetching initial users
            .addCase(addInitialUsersAsync.pending, (state) => {
                state.status = 'loading';
            })
            // Case for successful fetching of initial users
            .addCase(addInitialUsersAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.users = action.payload
            })
            // Case for failed fetching of initial users
            .addCase(addInitialUsersAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export const { addUser, removeUser, updateUser } = userSlice.actions;

export default userSlice.reducer;
