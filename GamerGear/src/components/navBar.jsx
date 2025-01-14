import { useState, useEffect } from "react";

function NavBar() {
  const [buttonValue, setButtonValue] = useState("Sign In");
  const [options, setOptions] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setButtonValue("Options");
    } else {
      setButtonValue("Sign In");
    }
  }, []); 

  const handleButtonClick = () => {
    if(buttonValue==="Options"){
      setOptions(!options);
    }
  };

  return (
    <div className="NavBar">
      <div className="logo-Holder">
        <img
          id="logo-image"
          src="/images/logo.png" 
          alt="Logo"
        />
        <input type="text" placeholder="Search..." />
        <input
          type="button"
          value={buttonValue}
          onClick={handleButtonClick}
        />
      </div>
    </div>
  );
}

export default NavBar;