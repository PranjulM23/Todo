import React from 'react'
import './css/naav.css'
const navbar = ({logout}) => {
  return (
    <div>
      <nav>
      <div className="nav">
        <div className="icon">TaskApp</div>
        <div className="btn" onClick={()=>logout()}><button>Log out</button></div>
      </div>
      </nav>
    </div>
  )
}

export default navbar
