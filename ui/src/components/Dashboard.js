import { GuestDashboard } from "./GuestDashboard";
import { UserDashboard } from "./UserDashboad";
import { Home } from "../Home";
import { StoreContact,ShowContact, } from "../User";
import { Routes,Route } from "react-router-dom";

export function Dashboard(props) {
  console.log(props);
  return(
    
  <div className = "container-fluid">
    <h1 className = 'text-center'>Profile summary</h1>
    <div className= "row">
      
      <div className="col-9 bg-dark text-light" style={{border: '2', borderRadius: '10px'}}>
          <h2>Hi {props.user.name}</h2>
          <br />
          <h4>Contact counts: {props.user.mycontacts.length}</h4>
      </div>  
    </div>
  </div>)
  
}