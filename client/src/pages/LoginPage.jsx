import React from 'react'
import '../styles/login.css';

const LoginPage = () => {
  return (
    <div className="container">
      <form className="formContainer" action="">
        <div className="formData">
            <label htmlFor="username">UserName</label>
                <input type="text" id="username" placeholder="Username" />
        </div>
        <div className="formData">
            <label htmlFor="email">Email</label>
                <input type="email" id="email" placeholder="Email" />
        </div>
        <div className="formData">
            <label htmlFor="password">Password</label>
                <input type="password" id="password" placeholder="Password" />
        </div>
        <div className="formData">
            <label htmlFor="comfirm">Comfirm Password</label>
                <input type="password" id="comfirm" placeholder="Comfirm Passowrd" />
        </div>
        <div className="formData">
           <input type="submit" value="Login" className="btn-submit" />
        </div>
      </form>
    </div>
  )
}

export default LoginPage
