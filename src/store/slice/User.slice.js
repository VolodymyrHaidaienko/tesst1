import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";


import {userService} from "../../servisec/user.service";


const initialState = {
    userList: [],
    status: null,
    page: 1,
    tokenUser: null
};


export const getAllUser = createAsyncThunk(
    'user/getAllUser',
    async (count) => {
        const users = userService.AllUsers(count)
        return users
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        deleteUser: (state, action) => {
            const data = userService.deleteById(action.payload)
            if (state.userList) {
                state.userList = state.userList.filter(user => user.id !== action.payload.selectUserId)
            } else {
                state.userList = data.filter(user => user.id !== action.payload.selectUserId)
            }
        },
        replaceUser: (state, action) => {
            const usersArray = userService.replaceUser(action.payload.id, action.payload.formState)
            state.userList = usersArray
        },
        addUser: (state, action) => {
            const user = userService.addUser(action.payload.user)
        },
        searchUsers: (state, action) => {
            let SearchPage = {cuontPageB: action.payload[0], cuontPageN: action.payload[1]}
            if (action.payload[2]) {
                const user = userService.AllUsersArray()
                const newArray = user.filter(value => value.name.includes(action.payload[2]))
                state.userList = newArray
            } else {
                state.userList = userService.AllUsers(SearchPage)
            }
        },
        filterUser: (state, action) => {
            let fiterPage = {cuontPageB: action.payload[0], cuontPageN: action.payload[1]}
            if (action.payload) {
                const userFilter = userService.AllUsers(fiterPage)
                const newArray = userFilter.filter(value => value.department.includes(action.payload[2]))
                state.userList = newArray
            } else {
                state.userList = userService.AllUsers(fiterPage)
            }
        },
        userLogin: (state, action) => {
            let user = userService.loginationUser(action.payload)
            state.tokenUser = user
        }

    },

    extraReducers: {
        [getAllUser.pending]: (state) => {
            state.status = 'pending'
        },
        [getAllUser.fulfilled]: (state, action) => {
            const users = action.payload
            state.userList = users
        }
    }
});
export const {deleteUser, replaceUser, addUser, searchUsers, filterUser, userLogin} = userSlice.actions
const userReduser = userSlice.reducer;
export default userReduser;