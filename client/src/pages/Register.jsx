import React, {useState, useEffect} from 'react'
import '../styles/login.css';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [password2, setPassword2] = useState('');


  const  RegisterForm = async(e) =>{
    e.preventDefault();
    console.log(username);
    if(password != password2){
      alert('Passwords do not match');
    }
    try {
      const response = await axios.post("http://localhost:5000/signup", {username, email, password});
      console.log(response.data);
    } catch (error) {
      console.log(error.message)
    }
  }
  return (
    <div className="container">
      <form className="formContainer" onSubmit={RegisterForm}>
        <div className="formData">
            <label htmlFor="username">UserName</label>
                <input type="text" id="username" placeholder="Username" onChange={e=> setUsername(e.target.value)} />
        </div>
        <div className="formData">
            <label htmlFor="email">Email</label>
                <input type="email" id="email" placeholder="Email" onChange={e=> setEmail(e.target.value)}/>
        </div>
        <div className="formData">
            <label htmlFor="password">Password</label>
                <input type="password" id="password" placeholder="Password" onChange={e=> setPassword(e.target.value)}/>
        </div>
        <div className="formData">
            <label htmlFor="comfirm">Comfirm Password</label>
                <input type="password" id="comfirm" placeholder="Comfirm Passowrd" onChange={e=> setPassword2(e.target.value)}/>
        </div>
        <div className="formData">
           <input type="submit" value="Register" className="btn-submit" />
        </div>
      </form>
    </div>
  )
}

export default Register
