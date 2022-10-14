import axios from "axios";
import {useState,useEffect} from 'react';
import { LoginControl } from "./components/LoginControl";
import { UserDashboard } from "./components/UserDashboad";
import { GuestDashboard } from "./components/GuestDashboard"
import { Home } from "./Home";
import {Link, Route, Routes} from 'react-router-dom';
import { Dashboard } from "./components/Dashboard";
import { HomePage } from "./components/HomePage";

export function DeleteUser(props) {
    let handleClick = () => {
        console.log(props);
        let url = `http://localhost:3001/profiles/${props.profileId}`;
        axios.delete(url)
        .then(res => {console.log(res); window.location.reload(false)})
        .catch(err => console.log(err))
    }
    return (<div>
        <button className = "btn btn-danger" onClick = {handleClick}>Delete</button>
    </div>)
}

// fetch all user component
export function ShowContact(props) {
    let [users, setUsers] = useState([]);
    let handleClick = () => {
        let url = `http://localhost:3001/profiles/${props.user._id}`;
        axios.get(url)
        .then(response => setUsers(response.data.mycontacts))
        .catch(error => console.log(error));
    }
    useEffect(() => handleClick);
    return (<div>
        <h3>Contact List</h3>
        <table className = 'table'>
            <thead>
                <tr>
                    <th>ID</th><th>Name</th><th>Phone number</th><th>X</th>
                </tr>
            </thead>
            <tbody>
                {
                    users.map((item, index) => {
                        return <tr key = {index}>
                            <td>{item._id}</td><td>{item.name}</td><td>{item.phn}</td>
                            <td><DeleteUser profileId = {item._id} /></td>
                        </tr>
                    })
                }
            </tbody>
        </table>
    </div>)
}

// update user component
export function UpdateUser() {
    let [_id, setId] = useState('');
    let [age1, setAge] = useState('');
    let [message, setMessage] = useState('');
    let [Cname, setCname] = useState('');
    let handleSubmit = (e) => {
        e.preventDefault();
        let url = `http://localhost:3001/profiles/${_id}/${age1}`;
        axios.put(url, {age:parseInt(age1)})
        .then((response) => setMessage( `id: ${_id} updated`),setCname('alert alert-primary'))
        .catch((error) => 
            setCname('alert alert-danger'),
            setMessage('Sorry user failed to store'));
        setId('');
        setAge('');
    }
    return (<div>
        <h3>Update user</h3>
        <form onSubmit = {handleSubmit}>
            <div className = "form-group">
                <label>
                    Enter Id
                    <input type = 'number' value = {_id} onChange = {(e) => setId(e.target.value)}
                     autoComplete="off" name = '_id' placeholder="Enter Id" className = "form-control"></input>
                </label>
            </div>
            <div className = "form-group">
                <label>
                    Enter new Age
                    <input type = 'number' value= {age1} onChange = {(e) => setAge(e.target.value)} 
                    autoComplete="off" name = 'age' placeholder="New Age" className = "form-control"></input>
                </label>
            </div>
            <br />
            <div className = "form-group">
                <input type = "submit" value = "Update" className = "btn btn-primary"></input>
            </div>
        </form>
        <div className = {Cname}>
            {message}
        </div>
    </div>)
}


export function StoreContact(props) {
    let [name, setName] = useState('');
    let [number, setNumber] = useState('');
    let [message, setMessage] = useState('');
    let [Cname, setCname] = useState('');
    let handleSubmit = (e) => {
        e.preventDefault();
        let url = `http://localhost:3001/profiles/${props.user._id}`;
        axios.post(url, {"name":name, "phn": number})
        .then((response) => setMessage('Data stored successfully'),setCname('alert alert-primary'))
        .catch((error) => 
            setCname('alert alert-danger'),
            setMessage('Sorry user failed to add contact'));
        //setId('');
        setName('');
        setNumber('');    
    }
    return (<div>
        <h3>Add contacts Form</h3>
        <form onSubmit = {handleSubmit}>
            <div className = "form-group">
                <label>
                    Enter name
                    <input type = 'text'value = {name} onChange = {(e) => setName(e.target.value)}
                    autoComplete="off" name = 'name' placeholder="Enter Id" className = "form-control"></input>
                </label>
            </div>
            <div className = "form-group">
                <label>
                    Enter Phone number
                    <input type = 'number' value= {number} onChange = {(e) => setNumber(e.target.value)} 
                    autoComplete="off" name = 'number' placeholder="Enter number" className = "form-control"></input>
                </label>
            </div>
            <br />
            <div className = "form-group">
                <input type = "submit" value = "Add" className = "btn btn-primary"></input>
                {/* <LoginControl /> */}
            </div>
        </form>
        <div className = {Cname}>
            {message}
        </div>
    </div>)
}

export function ProfileLogin() {
    let [profile, setProfile] = useState({});
    let [users, setUsers] = useState({});
    let user;
    let [name1, setName] = useState('');
    let [password, setPassword] = useState('');
    let [message, setMessage] = useState('');
    let [Cname, setCname] = useState('');
    let [isLoggedIn, setLoggedIn] = useState(false);
    
    let handleLogout = (e) => {
        return window.location.href='/';
    }

    let handleSubmit = (e) => {
        e.preventDefault();
        console.log(e);
        if(!name1 || !password){
            alert('Id or password cannot be blank');
        }else{
        let url = `http://localhost:3001/profiles/${name1}/${password}`;
        axios.get(url)
        .then((response) => {
            console.log(response.data);
            user = response.data[0];
            console.log(user);
            if(user === undefined){
                return(<div><ProfileLogin /></div>);
            }
            else{
                setUsers(response.data[0]);
                setLoggedIn(!isLoggedIn);
            }
            // if(isLoggedIn){
            //     return (<div><LogInUser user = {users} /></div>);
            // }
        })
        .catch((error) => 
            setCname('alert alert-danger'),
            setMessage('Sorry failed to login please enter valid input'));
        setName('');
        setPassword('');
        console.log(users);
    }    
    }
    if(isLoggedIn){
        // window.location.href = `/${users._id}`;
        return (<div className="container-fluid">
            <h1 className="text-center">CONTACT MANAGEMENT SYSTEM</h1>
            <br />
            <div className="row">
            <div className="col-3 bg-secondary" style={{ borderRadius: '25px'}}>
                <h3>Name: {users.name}</h3>
                <h3>Id: {users._id}</h3>
            </div>
            <div className="col-9">
                <nav className="navbar navbar-dark bg-primary" style={{ backgroundColor: 'coral', borderRadius: '25px'}}>
                <Link to = {`/${users._id}/dashboard`} className="navbar-brand">Dashboard</Link> | 
                <Link to = {`/${users._id}/addcontact`} className="navbar-brand">Add contacts</Link> | 
                <Link to = {`/${users._id}/showcontact`} className="navbar-brand">Show all contacts</Link> |
                <Link to = "/search" className="navbar-brand">Search contact</Link> |
                <Link to = "/logout" className="navbar-brand">Logout</Link> |
                {/* <Link to = "/user/:id">DeleteUser</Link>  */}
                </nav>
            <Routes>
                <Route path = '/' element = {<LogInUser user = {users} />} />
                <Route path = {`/${users._id}/showcontact`} element = {<ShowContact user = {users} />} />
                <Route path = {`/${users._id}/addcontact`} element = {<StoreContact user = {users} />} />
                <Route path = {`/${users._id}/dashboard`} element = {<Dashboard user = {users} />} />
            </Routes>    
            <br />
            <input type = "button" value = "logout" className = "btn btn-primary" onClick= {handleLogout}></input>
            </div>
            </div>
            </div>
            );
    }
    return (<div className="text-center">
        <h3>Login Form</h3>
        <form onSubmit = {handleSubmit}>
            <div className = "form-group">
                <label>
                    Enter Id
                    <input type = 'text'value = {name1} onChange = {(e) => setName(e.target.value)}
                    autoComplete="off" name = 'name' placeholder="Enter Id" className = "form-control"></input>
                </label>
            </div>
            <div className = "form-group">
                <label>
                    Enter Password
                    <input type = 'password' value= {password} onChange = {(e) => setPassword(e.target.value)} 
                    autoComplete="off" name = 'password' placeholder="Enter password" className = "form-control"></input>
                </label>
            </div>
            <br />
            <div className = "form-group">
                <input type = "submit" value = "Login" className = "btn btn-primary"></input>
                {/* <LoginControl /> */}
            </div>
        </form>
        <br />
            <div className="text-center">
                <Link to = '/register'>Register</Link>
                {/* <UserRegistration /> */}
            </div>
        <div className = {Cname}>
            {message}
        </div>
    </div>)
}


export function UserRegistration() {
    let [cpassword, setCpassword] = useState('');
    let [name, setName] = useState('');
    let [password, setPassword] = useState('');
    let [message, setMessage] = useState('');
    let [Cname, setCname] = useState('');

    let handleSubmit = (e) => {
        if(password !== cpassword){
            setMessage('Password not correct try again');            
        }else{
        e.preventDefault();
        let url = "http://localhost:3001/profiles";
        axios.post(url, {"name":name, "password": password})
        .then((response) => setMessage('Registration completed please click on login to proceed'),setCname('alert alert-primary'))
        .catch((error) => 
            setCname('alert alert-danger'),
            setMessage('Sorry user failed to store'));
        //setId('');
        setName('');
        setPassword('');
        setCpassword('');
        return window.location.href='/';
        }
        
    }
    return (<div className="text-center">
        <h3> SignUp Form</h3>
        <form onSubmit = {handleSubmit}>
            <div className = "form-group">
                <label>
                    Enter Id
                    <input type = 'text'value = {name} onChange = {(e) => setName(e.target.value)}
                    autoComplete="off" name = 'name' placeholder="Enter Id" className = "form-control"></input>
                </label>
            </div>
            <div className = "form-group">
                <label>
                    Enter Password
                    <input type = 'password' value= {password} onChange = {(e) => setPassword(e.target.value)} 
                    autoComplete="off" name = 'password' placeholder="Enter password" className = "form-control"></input>
                </label>
            </div>
            <div className = "form-group">
                <label>
                    Confirm Password
                    <input type = 'password' value = {cpassword} onChange = {(e) => setCpassword(e.target.value)}
                     autoComplete="off" name = 'cpassword' placeholder="Confirm password" className = "form-control"></input>
                </label>
            </div>
            <br />
            <div className = "form-group">
                <input type = "submit" value = "Sign Up" className = "btn btn-primary"></input>
                {/* <LoginControl /> */}
            </div>
        </form>
        <br />
            <div className="text-center">
                <Link to ='/login'>Goto Login</Link>
                {/* <UserRegistration /> */}
            </div>
        <div className = {Cname}>
            {message}
        </div>
    </div>)
}
//success component for user login
export function LogInUser(props) {
    return (<div className = 'container-fluid' style={{ backgroundColor: 'white', borderRadius: '5px'}}>
    <h1 className = 'text-center' >{props.user.name} Dashboard</h1>
    
    <hr />
    <div>
        
    
     <Routes>
       {/* <Route path = "/logout" element = {window.location.href='/logout'} /> */}
       {/* <Route path = "/login/addcontact" element = {<StoreContact user = {props.user} />} /> */}
       <Route path = {`/${props.user._id}/addcontact`} element = {<StoreContact user = {props.user} />} />
       <Route path = {`/${props.user._id}/showcontact`} element = {<ShowContact user = {props.user} />} />
       <Route path = '/' element = {<Dashboard user = {props.user}/>} />
       <Route path = {`/${props.user._id}/dashboard`} element = {<Dashboard user = {props.user}/>} />
       <Route path = "/search" element = {<UpdateUser />} />
       {/* <Route path = "/user/:id" element = {<DeleteUser />} /> */}
     </Routes>
    </div>
  </div>)
    }


