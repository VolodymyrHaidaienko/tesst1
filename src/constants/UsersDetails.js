import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useLocation} from "react-router-dom";


import {getByIdUser} from "../store/slice/UserDetails.slice";
import UserDetails from "../components/user/UserDetails";
import UserDetailsForm from "../components/user/UserDetailsForm";


const UsersDetails = () => {

    const user = useSelector(state => state.userDetails.userList);
    const location = useLocation();
    const dispatch = useDispatch();

    const editMode = location.state.editMode;


    useEffect(() => {
        dispatch(getByIdUser(location.state.id))
    }, []);


    return (
        <div>
            {editMode && <UserDetailsForm user={user}/>||user&& <UserDetails user={user}/>}
        </div>
    );
};

export default UsersDetails;