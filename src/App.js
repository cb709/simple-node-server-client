import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  useEffect(()=>{
    fetch('http://localhost:5000/users')
    .then(res => res.json())
    .then(data => setUsers(data))
  },[])
  return (
    <div style={{padding: "20px 10px"}}>
      <div style={{textAlign: "center"}}>
        <form action="">
          <input type="text" name="name" id="name" />
          <br />
          <input type="email" name="email" id="email" />
          <br />
          <button type="submit">Add User</button>
        </form>
      </div>
      <h1 style={{textAlign: "center"}}>Users: {users.length}</h1>
      <ol>
      {
        users.map(user => <li key={user.id}>{user.name}</li>)
      }
      </ol>
    </div>
  );
}

export default App;
