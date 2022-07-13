import React, {useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";


import {userLogin} from "../../store/slice/User.slice";
import "./UserLogination.css"


const UserLogination = () => {
    let {register, handleSubmit} = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let [formState, setFormState] = useState({UserName: "", Password: ""});
    let tokenUser = useSelector(state => state.user.tokenUser);

    useEffect(() => {
        if (tokenUser) {
            navigate("/Users")
        } else if (tokenUser === false) {
           alert("Error login or password")}
    }, [tokenUser]);


    function onChange(e) {
        setFormState({...formState, [e.target.name]: e.target.value})
    };


    function check() {
        dispatch(userLogin({formState}))
    };

    return (
        <div className="Form">
            <h3>Welcome bro</h3>
            <form onSubmit={handleSubmit}>
                <h5>Username:</h5>
                <input {...register("UserName", {required: true})} placeholder={"UserName"}
                       value={formState.UserName}
                       onChange={onChange}/>
                <h5>Password:</h5>
                <input {...register("Password", {required: true})} placeholder={"*****"} value={formState.Password}
                       onChange={onChange}/>
                <div>
                    <button onClick={check}>Sign In</button>
                </div>
            </form>
        </div>
    );
};

export default UserLogination;