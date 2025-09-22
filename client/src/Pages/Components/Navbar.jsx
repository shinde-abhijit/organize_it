import React from 'react'
import { Link } from "react-router-dom"
import "./styles/Navbar.css"

const Navbar = () => {

  const token = localStorage.getItem("access_token");
  
  return (
    <>
      <header className="header-navbar-container">
        <div className="header-container">
            <div>
                <h1 className="navbar-title">OrganizeMe</h1>
            </div>
            <nav>
                <ul>
                    <li>Todo
                        <ul className="dropdown">
                            <li>
                                <Link to={"/add-todo"}>Add</Link>
                            </li>
                            <li>
                                <Link to={"/todos"}>List</Link>
                            </li>
                        </ul>
                    </li>
                    <li>User
                        <ul className="dropdown">
                          {
                            token ?
                            <>
                              <li>
                                <Link to={"/profile"}>Profile</Link>
                              </li>
                              <li>
                                <Link to={"/update"}>Update</Link>
                              </li>
                              <li>
                                <Link to={"/delete"}>Delete</Link>
                              </li>
                              <li>
                                <Link to={"/logout"}>Logout</Link>
                              </li>
                            </>
                            : 
                            <>
                              <li>
                                  <Link to={"/register"}>Register</Link>
                              </li>
                              <li>
                                  <Link to={"/login"}>Login</Link>
                              </li>
                            </>
                          }
                        </ul>
                    </li>
                </ul>
            </nav>
        </div>
      </header>
    </>
  )
}

export default Navbar