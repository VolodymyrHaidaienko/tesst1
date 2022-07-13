import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Button, Table} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";


import {deleteUser, filterUser, getAllUser, searchUsers} from "../store/slice/User.slice";
import DeletePopup from "../components/popup/DeletePopup";
import "./Users.css"


export let cuontPageN = 3
export let cuontPageB = 0
let selectUserId = 0
const Users = () => {
    let userList = useSelector(state => state.user.userList);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [count, setcount] = useState([]);

    const send = (e) => {
        e.preventDefault()
        let valueFilter = [cuontPageB, cuontPageN, e.target.name.value]
        dispatch(searchUsers(valueFilter))
    }

    const formHandler = (e) => {
        let valueFilter = [cuontPageB, cuontPageN, e.target.value]
        dispatch(filterUser(valueFilter))
    }


    useEffect(() => {
        dispatch(getAllUser({cuontPageB, cuontPageN}));
    }, [count]);

    function Addnavigate() {
        navigate("/AddUser")
    }


    function nextPage() {
        cuontPageB = cuontPageN
        cuontPageN = cuontPageN + 3
        setcount({cuontPageN, cuontPageB})
    }

    function backPage() {
        cuontPageB = cuontPageB - 3
        cuontPageN = cuontPageN - 3
        if (cuontPageB >= 0) {
            setcount({cuontPageN, cuontPageB})
        } else {
            cuontPageB = 0
            cuontPageN = 3
        }

    }

    return (
        <div>
            <div className="FormUser">
                <form className="Form1" onSubmit={send}>
                    <input type='text' name='name' placeholder='search'/>
                    <button>Search</button>
                    <select onChange={formHandler}>
                        <option>{""}</option>
                        <option>Development</option>
                        <option>Management</option>
                        <option>QA</option>
                    </select>
                </form>
                <button onClick={Addnavigate}>Add</button>
            </div>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: '10%',
                marginRight: '10%',
                marginTop: 0,
            }}>
                <Table striped bordered hover size="sm">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Employee</th>
                        <th>Department</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {userList.map((user, index) =>
                        <tr key={user.id}>
                            <td>{index + 1}</td>
                            <td><Link to="/UsersDetails"
                                      state={{id: user.id, editMode: false}}>
                                {user.name + '--' + user.email}</Link></td>
                            <td>{user.department}</td>
                            <td><Link to="/UsersDetails"
                                      state={{id: user.id, editMode: true, user: user}}><Button>Edit</Button></Link>
                            </td>
                            <td><Button onClick={() => {
                                setShowDeletePopup(true)
                                selectUserId = user.id
                            }}>Delete</Button></td>
                        </tr>
                    )
                    }
                    </tbody>
                </Table>
                <DeletePopup
                    onHide={() => setShowDeletePopup(false)}
                    onDelete={() => {
                        setShowDeletePopup(false)
                        dispatch(deleteUser({selectUserId, cuontPageB, cuontPageN}))
                    }}
                    show={showDeletePopup}
                />
            </div>
            <div className="UsersButton">
                <div>
                    <button onClick={backPage}>Back</button>
                </div>
                <div>
                    <button onClick={nextPage}>Next</button>
                </div>
            </div>
        </div>
    );
};

export default Users;