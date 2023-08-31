import React from 'react'
import "../styles/Header.scss"
import logo from "../logo.png"
import {Link} from "react-router-dom"
import {LuSearch} from "react-icons/lu"

const Header = () => {
  return (
   <nav className="header">
      <Link to={'/'}><img src={logo} alt="" /></Link>

        <div>
           <Link to='/tvshows'>TV Shows</Link>
           <Link to='/movies'>Movies</Link>
           <Link to='/recentlyadded'>Recently Added</Link>
           <Link to='/mylist'>My List</Link>
        </div>

        <LuSearch />
   </nav>
  )
}

export default Header