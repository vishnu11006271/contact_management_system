import axios from "axios";
import React, {useEffect, useState} from 'react'


export function SearchBar(props) {
 const [searchInput, setSearchInput] = useState("");
 let [user, setUser] = useState([]);
    let handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
        let url = `http://localhost:3001/profiles/${props.user._id}`;
        axios.get(url)
        .then(response => setUser(response.data.mycontacts))
        .catch(error => console.log(error));
    }
const re = RegExp(`.*${searchInput.toLowerCase().split('').join('.*')}.*`)
let result = [];
if (searchInput.length > 0) {
    result = user.filter(contact => contact.name.toLowerCase().match(re));
}
//console.log(searchInput);
return ( <div>

<input type="search" placeholder="Search here" onChange={handleChange} value={searchInput} />
<table>
    <thead>
        <tr>
        <th>Name</th>
        <th>Phone numberr</th>
    </tr>
    </thead>
    <tbody>
    {result.map((contact, index) => { return(
        <tr key={index}>
          <td>{contact.name}</td>
          <td>{contact.phn}</td>
        </tr>
      )
      })}
    </tbody>
</table>
</div>
)

}