import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const addInitialUsersAsync = createAsyncThunk('user/addInitialUsers', async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await response.json();
    return data;
});

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        users: [],
        status: 'idle',
        error: null
    },
    reducers: {
        addUser: (state, action) => {
            state.users.push(action.payload);
        },
        removeUser: (state, action) => {
            state.users = state.users.filter(user => user.id !== action.payload.id);
        },
        updateUser: (state, action) => {
            const index = state.users.findIndex(user => user.id === action.payload.id);
            if (index !== -1) {
                state.users[index] = action.payload;
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addInitialUsersAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addInitialUsersAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.users = action.payload
            })
            .addCase(addInitialUsersAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export const { addUser, removeUser, updateUser } = userSlice.actions;

export default userSlice.reducer;
