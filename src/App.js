import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  useEffect(()=>{
    fetch('http://localhost:5000/users')
    .then(res => res.json())
    .then(data => setUsers(data))
  },[])

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = {name, email}
    fetch('http://localhost:5000/users',{
      method:'post',
      headers:{
        'content-type':'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      console.log(users);
      let newUser = [...users, data];
      setUsers(newUser);
    })
    .catch(err => console.log(err))
    form.reset();
  }
  return (
    <div style={{padding: "20px 10px"}}>
      <div style={{textAlign: "center"}}>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" id="name" placeholder='Name' required/>
          <br />
          <input type="email" name="email" id="email" placeholder='Email' required />
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
