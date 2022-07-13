import React from 'react';
import {useNavigate} from "react-router-dom";


import "./UserDetails.css"


const UserDetails = (user) => {
    const {name, username, email, department} = user.user
    const navigate = useNavigate();

    function navigateBack() {
        navigate("/Users")
    }

    return (
        <div className="UserDetails">
            <h6>Deparnment:</h6>
            <div>{department}</div>
            <hr/>
            <h6>Full name:</h6>
            <div> {name}   {username}</div>
            <hr/>
            <h6>Email:</h6>
            <div> {email}</div>
            <hr/>
            <button onClick={navigateBack}>Back</button>
        </div>
    );
};

export default UserDetails;