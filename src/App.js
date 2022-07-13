import './App.css';
import {Route, Routes} from "react-router-dom";
import Users from "./constants/Users";
import 'bootstrap/dist/css/bootstrap.min.css';


import UsersDetails from "./constants/UsersDetails";
import AddUser from "./components/addUser/AddUser";
import UserLogination from "./components/login/UserLogination";


function App() {
    return (
        <div>
            <Routes>
                <Route path={'/'} element={<UserLogination/>}/>
                <Route path={'/Users'} element={<Users/>}/>
                <Route path={'UsersDetails'} element={<UsersDetails/>}/>
                <Route path={'AddUser'} element={<AddUser/>}/>

            </Routes>


        </div>
    );
}

export default App;
