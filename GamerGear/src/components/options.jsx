// import React from 'react'

function Options() {
  const logOut = ()=>{
    localStorage.removeItem("token");
    window.location.reload()
  }
  return (
    <div className='outside'>
        <div className='inside'>
            <h4 className="text-h4">Options</h4>   
            <hr/> 
            <h4 className="text-h4">profile</h4>
            <hr/> 
            <h4 className="text-h4">shopping cart</h4>
            <hr/> 
            <input type="button" id="logOut" value="logOut" onClick={logOut}/>
        </div>
        
    </div>
  )
}

export default Options