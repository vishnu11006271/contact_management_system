import { Home } from "../Home";
import {Link, Route, Routes} from 'react-router-dom';
import { FetchUsers, StoreContact, UpdateUser,DeleteUser, ShowContact } from '../User';

export function UserDashboard(props) {
  return (<div className = 'container-fluid' style={{ backgroundColor: 'white', borderRadius: '5px'}}>
  <h1 className = 'text-center' >This is a MERN example</h1>
  
  <hr />
  <div>
  <nav className="navbar navbar-dark bg-primary" style={{ backgroundColor: 'coral', borderRadius: '25px'}}>
    <Link to = "/home" class="navbar-brand">Home</Link> | 
    <Link to = "/fetch" class="navbar-brand">FetchUsers</Link> | 
    <Link to = "/store" class="navbar-brand">StoreContact</Link> |
    <Link to = "/update" class="navbar-brand">UpdateUser</Link> |
    {/* <Link to = "/user/:id">DeleteUser</Link>  */}
  </nav>
   <Routes>
     <Route path = "/home" element = {<Home />} />
     <Route path = "/fetch" element = {<ShowContact />} />
     <Route path = "/store" element = {<StoreContact />} />
     <Route path = "/" element = {<StoreContact />} />
     <Route path = "/update" element = {<UpdateUser />} />
     {/* <Route path = "/user/:id" element = {<DeleteUser />} /> */}
   </Routes>
  </div>
</div>)
  }