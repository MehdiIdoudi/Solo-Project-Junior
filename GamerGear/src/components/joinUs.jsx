import { useState,useEffect } from "react";
import axios from "axios"
const Join = () => {
    const [userData,setUserData]=useState({username:"",password:"",email:"",})
    const [registerToggle,setRegisterToggle]=useState(true)
    const [signInrToggle,setSignInrToggle]=useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    
    const reverseToggle= ()=>{
        setRegisterToggle(!registerToggle)
        setSignInrToggle(!signInrToggle)
    }
    const handelInputs = (e)=>{
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]:value,
        })
    }
    const register = async () => {
        try {
            const response = await axios.post("http://localhost:3001/api/user/add", userData);
            console.log("Registration successful:", response.data);
            alert("Registration successful!");
            reverseToggle()
        } catch (error) {
            console.error("Registration failed:", error.message);
            alert("Registration failed. Please try again.");
        }
    };
    const logIN = async () => {
        try {
            const response = await axios.post("http://localhost:3001/api/user/login", {
                email: userData.email,
                password: userData.password,
            });
            if (response.data.token) {
                localStorage.setItem("token", response.data.token);
                setIsLoggedIn(true);
            }
    
            console.log("Login successful:", response.data);
            alert("Login successful!");
        } catch (error) {
            console.error("Login failed:", error.message);
            alert("you enter wong name or password.");
        }
    };
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);
    useEffect(() => {
        if (isLoggedIn) {
            window.location.reload()
        }
    }, [isLoggedIn]);
    
   return( <>
    {registerToggle && (<div className="backGround">
        <div className="joinUs">
        
            <div className="container-form">
                <h1 className="form-txt-one">Join Us</h1>
                    <label >
                        <h4 className="form-txt">username</h4>
                    </label>
                    <input type="text" placeholder="Enter username" className="username-txt" value={userData.username} onChange={handelInputs} name="username" required/>
                    <label >
                        <h4 className="form-txt">email</h4>
                    </label>
                    <input type="email" className="email-txt" placeholder="Enter email" value={userData.email} onChange={handelInputs} name="email" required/>
                    <label >
                        <h4 className="form-txt">password</h4>
                    </label>
                    <input type="password"   className="password-txt" placeholder="Enter password" value={userData.password} onChange={handelInputs} name="password" required/>
                    <input type="button" value="submit" className="btn-submit" onClick={register}/>
                    <input type="button" className="btn-reverse" value="signin" onClick={reverseToggle} />
            </div>
        </div>
        </div>)}
    {signInrToggle &&( <div className="backGround">
            <div className="joinUs">
                <div className="container-form">
                    <h1 className="form-txt-one">Join Us</h1>
                        <label >
                            <h4 className="form-txt">email</h4>
                        </label>
                        <input type="email" placeholder="Enter email"  className="email-txt" value={userData.email}  onChange={handelInputs} name="email" required/>
                        <label >
                            <h4 className="form-txt">password</h4>
                        </label>
                        <input type="password" className="password-txt" placeholder="Enter password" value={userData.password} onChange={handelInputs} name="password" required/>
                        <input type="button" value="submit"className="btn-submit" onClick={logIN}/>
                        <input type="button" value="register" className="btn-reverse" onClick={reverseToggle} />
                </div>
            </div>
        </div>)}
    
    </>)
}
export default Join;