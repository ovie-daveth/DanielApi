import React from 'react'
import '../styles/navbar.css'

const Navbar = () => {
    const navbar = [
        {
            id: 1,
            name: "Home"
        },
        {
            id: 2,
            name: "Register"
        },
        {
            id: 3,
            name: "Login"
        },
    ]
  return (
    <nav className="navbar">
        <div className="logo">
            Logo
        </div>
        <div className="menu">
            <ul>
                    {
                        navbar.map((item)=>(
                            <li key={item.id}>
                                <a href={item.name.toLowerCase()}>{item.name}</a>
                            </li>
                        ))
                    }
            </ul>
        </div>
    </nav>
  )
}

export default Navbar
