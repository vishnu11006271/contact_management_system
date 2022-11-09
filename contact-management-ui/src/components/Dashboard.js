import { useEffect, useState } from "react"
import axios from "axios";
export function Dashboard({user}) {
  const [contacts,setContacts] = useState(user.mycontacts);
  useEffect(() =>{
    let url = `http://localhost:3001/profiles/${user._id}`;
        axios.get(url)
        .then(response => setContacts(response.data.mycontacts))
        .catch(error => console.log(error));
  },[])
  return(
    
  <div className = "container-fluid">
    <h1 className = 'text-center'>Profile summary</h1>
    <div className= "row">
      
      <div className="col-9 bg-dark text-light" style={{border: '2', borderRadius: '10px'}}>
          <h2>Hi {user.name}</h2>
          <br />
          <h4>Contact counts: {contacts?contacts.length: 0}</h4>
      </div>  
    </div>
  </div>)
  
}