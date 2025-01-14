import  "../css/joinUs.css";    
const Join = () => {
    <>
    <div className="joinUs">
        <h1>Join Us</h1>
        <label >username</label>
        <input type="text" placeholder="Enter username" name="username" required/>
        <label >password</label>
        <input type="password" placeholder="Enter password" name="password" required/>
        <label >email</label>
        <input type="email" placeholder="Enter email" name="email" required/>
        <input type="button" value="logOut"/>
        <input type="button" value="submit"/>
    </div>
    <div className="joinUs">
        <h1>Join Us</h1>
        <label >username</label>
        <input type="text" placeholder="Enter username" name="username" required/>
        <label >password</label>
        <input type="password" placeholder="Enter password" name="password" required/>
        <label >email</label>
        <input type="email" placeholder="Enter email" name="email" required/>
        <input type="button" value="signin"/>
        <input type="button" value="submit"/>
    </div>
    
    </>
}
export default Join;