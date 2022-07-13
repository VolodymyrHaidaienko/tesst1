import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";


import {addUser} from "../../store/slice/User.slice";
import "./AddUser.css"

const AddUser = () => {

    let {register, handleSubmit} = useForm()
    const dispatch = useDispatch();
    const navigate = useNavigate();

    let [formState, setFormState] = useState({id: "", name: "", department: "", email: ""})
    const user = []
    user.push(formState)


    const uid = function () {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    function onSubmit(e) {
        user[0].id = uid()
        dispatch(addUser({user}));
        navigate("/Users")
    }

    function onChange(e) {
        setFormState({...formState, [e.target.name]: e.target.value})
    }

    return (
        <div>

            <form className="AddUser" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <h6>Name</h6>
                    <input {...register("name")} value={formState.name} onChange={onChange}/>
                </div>
                <div>
                    <h6>Email</h6>
                    <input {...register("email")} value={formState.email} onChange={onChange}/>
                </div>
                <div>
                    <h6>Department</h6>
                    <select {...register("department")} value={formState.department} onChange={onChange}>
                        <option>{""}</option>
                        <option>Development</option>
                        <option>Management</option>
                        <option>QA</option>
                    </select>
                </div>
                <div>
                    <button onClick={onSubmit}>Save</button>
                </div>

            </form>
        </div>
    );
};

export default AddUser;