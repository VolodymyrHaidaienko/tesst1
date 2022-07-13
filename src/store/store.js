import React from 'react';
import {configureStore} from "@reduxjs/toolkit";


import userReduser from "./slice/User.slice";
import userDetailsReduser from "./slice/UserDetails.slice";








const store = configureStore({
    reducer:{
        user:userReduser,
        userDetails:userDetailsReduser

    }
})

export default store;