import React, {useState} from 'react'
import '../styles/login.css';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

const LoginPage = () => {
  const navigate = useNavigate();

  const [email,setEmail] = useState('');
  const [password, setPassword] = useState('');

  const LoginCode = async (e) => {
    e.preventDefault();
      try {
        const response = await axios.post("http://localhost:5000/signin", { email, password });

        if (response.data.success) {
          console.log(response.data.message);
          // setUser(response.data.data)
          navigate("/");
        } else {
          console.log(response.data.message);
        }
      } catch (error) {
        console.log("An error occurred:", error.message);
      }
  };

  return (
    <div className="container">
      <form className="formContainer" onSubmit={LoginCode}>
        <div className="formData">
            <label htmlFor="email">Email</label>
                <input type="email" id="email" placeholder="Email" onChange={e=> setEmail(e.target.value)} />
        </div>
        <div className="formData">
            <label htmlFor="password">Password</label>
                <input type="password" id="password" placeholder="Password" onChange={e=> setPassword(e.target.value)}/>
        </div>
        <div className="formData">
           <input type="submit" value="Login" className="btn-submit" />
        </div>
      </form>
    </div>
  )
}

export default LoginPage
