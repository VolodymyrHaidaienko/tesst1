import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";


import {userService} from "../../servisec/user.service";

const initialState = {
    userList: {},
    status: null,
    page: 1
}


export const getByIdUser = createAsyncThunk(
    'userDetails/getByIdUser',
    async (id) => {
        const user = userService.getById(id)
        return user
    }
)

const UserDetailsSlice = createSlice({
    name: 'userDetails',
    initialState,
    reducers: {},

    extraReducers: {
        [getByIdUser.pending]: (state) => {
            state.status = 'pending'
        },
        [getByIdUser.fulfilled]: (state, action) => {
            const user = action.payload[0]
            state.userList = user
        }
    }
});

const userDetailsReduser = UserDetailsSlice.reducer;
export default userDetailsReduser;