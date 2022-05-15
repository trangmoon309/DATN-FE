import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import {
  logUserIn,
  getCurrentUser,
  setLoggedInTrue,
  setAdminTrue
} from "../../redux/userSlice/userSlice";
import "../../signin.css"
import { Link } from 'react-router-dom';
import { Login } from "react-admin";

function SignInPage() {
  const dispatch = useDispatch();
  const history = useHistory()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loggedIn = useSelector((state) => state.user.loggedIn);
  const cs = useSelector((state) => state.user.currentUser);
  const [dynamicContainer, setDynamicContainer] = useState("container");

  useEffect(() => {
    if (loggedIn) {
      dispatch(getCurrentUser());
      console.log("Current user");
      console.log(cs);

      if(localStorage.getItem("user") == null){
        dispatch(getCurrentUser());
      }
      //history.push("/")
    }
  });

  function submitHandler() {
    dispatch(logUserIn({ email: email, password: password }));
    if(localStorage.getItem("_token") != null){
      dispatch(setLoggedInTrue());
    }
  }

  return (
    <div className={dynamicContainer} id="container">
        <div className="form-container sign-up-container">
          <form onSubmit={submitHandler}>
                <h1>Create Account</h1>
                <input type="text" name="fname" placeholder="First Name" style={{margin:10}} />
                <input type="text" name="lname" placeholder="Last Name" style={{margin:10}} />
                <input type="text" name="address" placeholder="Address" style={{margin:10}} />
                <input type="password" name="password" placeholder="Password" style={{margin:10}} />
                <input type="text" name="phone" placeholder="Phone Number"  style={{margin:10}}/>
                <input type="number" name="age" placeholder="Age" style={{margin:10}}/>
                <button style={{margin:10}}>Create Account</button>
                <h5>Already have an account! <a className="ghost" id="signIn" onClick={() => setDynamicContainer(dynamicContainer.replace(" right-panel-active", ""))}><u>Sign In</u></a></h5>
            </form>
        </div>
        <div className="form-container sign-in-container">
          <form>
              <h1 style={{"paddingBottom": 15}}>Login Now</h1>
              <input style={{margin:10}} type="email" name="email" placeholder="Email" onChange={e => setEmail(e.target.value)}/>
              <input type="password" name="password" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
              <a href="#">Forgot Your Password?</a>
              <button style={{"marginTop": 10}} onClick={submitHandler} type='button'><Link to='/'>Let me in...</Link></button>
              <h5>New to here! <a className="ghost" id="signUp" onClick={() => setDynamicContainer(dynamicContainer + " right-panel-active")}><u>Sign Up</u></a></h5>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
              <div className="overlay-panel overlay-left">
                <img src="https://www.freevector.com/uploads/vector/preview/27644/rental2.jpg" alt="movie-1" height="580" width="580"/>
              </div>
              <div className="overlay-panel overlay-right">
                <img src="https://as2.ftcdn.net/v2/jpg/01/55/06/59/1000_F_155065975_0koDTNC4SUudifhCKE2zMnzTliLgjCXZ.jpg" alt="movie-2" height="580" width="500" />
              </div>
          </div>
        </div>
    </div>
  );
}

export default SignInPage;
