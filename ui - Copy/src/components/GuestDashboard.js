import axios from "axios";
import {useState,useEffect} from 'react';
import { StoreContact } from "../User";
export function GuestDashboard(props) {
  let [isLoggedIn, setLoggedIn] = useState(true);
  let [name, setName] = useState('');
    let [password, setPassword] = useState('');
    let [message, setMessage] = useState('');
    let [Cname, setCname] = useState('');
    let handleSubmit = (e) => {
        e.preventDefault();
        let url = "http://localhost:3001/profiles";
        axios.post(url, {"name":name, "password":parseInt(password)})
        .then((response) => setMessage(response.data.insertedId + ' stored'),setCname('alert alert-primary'),
        setLoggedIn(!isLoggedIn))
        .catch((error) => 
            setCname('alert alert-danger'),
            setMessage('Sorry user failed to store'));
        //setId('');
        setName('');
        setPassword('');    
    }
    return (<div><StoreContact /></div>)
  }