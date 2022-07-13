import {useDispatch, useSelector} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";
import {useState} from "react";
import {useForm} from "react-hook-form";


import {replaceUser} from "../../store/slice/User.slice";


import "./UserDetailsForm.css"


const UserDetailsForm = (user) => {
    const {id} = user.user

    let {register, handleSubmit} = useForm()
    const location = useLocation()
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userList = useSelector(state => state.user.userList);
    let userLocation = location.state.user
    let [formState, setFormState] = useState({
        name: userLocation.name,
        department: userLocation.department,
        email: userLocation.email
    })


    function onSubmit(e) {
        dispatch(replaceUser({id, formState}));
        navigate("/Users")
    }

    function onChange(e) {
        setFormState({...formState, [e.target.name]: e.target.value})
    }

    function backNavigate() {
        navigate("/Users")
    }


    return (
        <div className="UserDetailsForm">

            <form onSubmit={handleSubmit(onSubmit)}>
                <h6>Department:</h6>
                <div>
                    <select {...register("department")} value={formState.department} onChange={onChange}>
                        {userList.map(value => <option key={value.id}>{value.department}</option>)}
                    </select>
                </div>
                <h6>Full name:</h6>
                <div><input {...register("name")} value={formState.name} onChange={onChange}/></div>
                <h6>Email:</h6>
                <div><input {...register("email")} value={formState.email} onChange={onChange}/></div>
            </form>
            <div className="Button">
                <button disabled={!formState.department} onClick={onSubmit}>Save</button>
                <button className="Cancel" onClick={backNavigate}>Cancel</button>
            </div>

        </div>
    );


};

export default UserDetailsForm;