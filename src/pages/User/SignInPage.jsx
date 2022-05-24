import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import {
  logUserIn,
  registerUser,
  getCurrentUser,
  setLoggedInTrue,
  setAdminTrue
} from "../../redux/userSlice/userSlice";
import "../../signin.css";
import { toast } from "react-toastify";

function SignInPage() {
  
  var requestRegister = {
    "username": "",
    "password": "",
    "email": "",
    "firstName": "",
    "lastName": "",
    "phoneNumber":"",
    extraInfors: {
      "age": "",
      "address": "",
      "avatarId": "",
      "idNumber": "",
      "driverLicense": "",
      "gender":"",
    }
  }

  const dispatch = useDispatch();
  const history = useHistory()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loggedIn = useSelector((state) => state.user.loggedIn);
  const [dynamicContainer, setDynamicContainer] = useState("container");
  const [registerRequest, setregisterRequest] = useState(requestRegister);

  const handleChange = e => {
    const { name, value } = e.target;
    setregisterRequest(prevState => ({
        ...prevState,
        [name]: value
    }));
    console.log(registerRequest);
};

  useEffect(() => {
    if(loggedIn){
      dispatch(getCurrentUser());
      toast.success("Successfully login! ") 
      setTimeout(() => {
        history.push('/')
      }, 1000);
    }
  },[loggedIn]);

  function submitLoginHandler() {
    dispatch(logUserIn({email:email, password:password}));
  }

  function submitRegisterHandler() {
    dispatch(registerUser({email:email, password:password}));
  }

  return (
    <div className={dynamicContainer} id="container">
        <div className="form-container sign-up-container">
          <form>
                <h1>Create Account</h1>
                <input type="text" name="username" placeholder="User Name" style={{margin:10}} value={registerRequest.username} onChange={handleChange}/>
                <input type="text" name="email" placeholder="Email" style={{margin:10}} value={registerRequest.email} onChange={handleChange} />
                <input type="password" name="password" placeholder="Password" style={{margin:10}} value={registerRequest.password} onChange={handleChange} />
                <input type="text" name="firstName" placeholder="First Name" style={{margin:10}} value={registerRequest.firstName} onChange={handleChange} />
                <input type="text" name="lastName" placeholder="Last Name" style={{margin:10}} value={registerRequest.lastName} onChange={handleChange} />
                <input type="text" name="phoneNumber" placeholder="Phone Number"  style={{margin:10}} value={registerRequest.phoneNumber} onChange={handleChange}/>
                <button style={{margin:10}} onClick={submitRegisterHandler} type='button'>Create Account</button>
                <h5>Already have an account! <a className="ghost" id="signIn" onClick={() => setDynamicContainer(dynamicContainer.replace(" right-panel-active", ""))}><u>Sign In</u></a></h5>
            </form>
        </div>
        <div className="form-container sign-in-container">
          <form onSubmit={submitLoginHandler}>
              <h1 style={{"paddingBottom": 15}}>Login Now</h1>
              <input style={{margin:10}} type="email" name="email" placeholder="Email" onChange={e => setEmail(e.target.value)}/>
              <input type="password" name="password" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
              <a href="#">Forgot Your Password?</a>
              <button style={{"marginTop": 10}} onClick={submitLoginHandler} type='button'>Let me in...</button>
              <h5>New to here! <a className="ghost" id="signUp" onClick={() => setDynamicContainer(dynamicContainer + " right-panel-active")}><u>Sign Up</u></a></h5>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
              <div className="overlay-panel overlay-left">
                <img src="https://www.freevector.com/uploads/vector/preview/27644/rental2.jpg" alt="movie-1" height="630" width="600"/>
              </div>
              <div className="overlay-panel overlay-right">
                <img src="https://as2.ftcdn.net/v2/jpg/01/55/06/59/1000_F_155065975_0koDTNC4SUudifhCKE2zMnzTliLgjCXZ.jpg" alt="movie-2" height="630" width="600" />
              </div>
          </div>
        </div>
    </div>
  );
}

export default SignInPage;
