import React from "react"
import {NavLink} from "react-router-dom"

class Navigation extends React.Component{
    render() {
        return (
            <div className="navbar">
                <NavLink className="navlink" to="/">Home</NavLink>
                <NavLink className="navlink" to="/browse">Profiles </NavLink>
                <NavLink className="navlink" to="/create">Create Profile</NavLink>
            </div>
        )
    }
}

export default Navigation