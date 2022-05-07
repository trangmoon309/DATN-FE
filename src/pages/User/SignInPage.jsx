import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import {
  getCustomers,
  logCustomerIn,
  setCurrentCustomer,
  setLoggedInFalse,
} from "../../redux/customerSlice/customerSlice";
import "../../signin.css"
import { Link } from 'react-router-dom';

function SignInPage() {
  const dispatch = useDispatch();
  const history = useHistory()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const customers = useSelector((state) => state.customer.items);
  const loggedIn = useSelector((state) => state.customer.loggedIn);
  const [dynamicContainer, setDynamicContainer] = useState("container");

  useEffect(() => {
    if (loggedIn) {
      customers.forEach((customer) => {
        if (customer.email == email) {
          dispatch(setCurrentCustomer(customer));
        }
      });
      
      history.push("/")
      dispatch(setLoggedInFalse())
    }
  }, [loggedIn]);

  useEffect(() => {
    dispatch(getCustomers());
  }, [dispatch]);

  function submitHandler() {
    dispatch(logCustomerIn({ email: email, password: password }));
  }

  return (
    <div class={dynamicContainer} id="container">
        <div class="form-container sign-up-container">
          <form action="">
                <h1>Create Account</h1>
                <input type="text" name="fname" placeholder="First Name" style={{margin:10}} />
                <input type="text" name="lname" placeholder="Last Name" style={{margin:10}} />
                <input type="text" name="address" placeholder="Address" style={{margin:10}} />
                <input type="password" name="password" placeholder="Password" style={{margin:10}} />
                <input type="text" name="phone" placeholder="Phone Number"  style={{margin:10}}/>
                <input type="number" name="age" placeholder="Age" style={{margin:10}}/>
                <button style={{margin:10}}>Create Account</button>
                <h5>Already have an account! <a class="ghost" id="signIn" onClick={() => setDynamicContainer(dynamicContainer.replace(" right-panel-active", ""))}><u>Sign In</u></a></h5>
            </form>
        </div>
        <div class="form-container sign-in-container">
          <form action="#">
              <h1 style={{"padding-bottom": 15}}>Login Now</h1>
              <input style={{margin:10}} type="email" name="email" placeholder="Email"/>
              <input type="password" name="password" placeholder="Password"/>
              <a href="https://www.youtube.com/watch?v=PH61SylAQXQ">Forgot Your Password?</a>
              <button style={{"margin-top": 10}}><Link to='/'>Let Me In...</Link></button>
              <h5>New to here! <a class="ghost" id="signUp" onClick={() => setDynamicContainer(dynamicContainer + " right-panel-active")}><u>Sign Up</u></a></h5>
          </form>
        </div>
        <div class="overlay-container">
          <div class="overlay">
              <div class="overlay-panel overlay-left">
                <img src="https://www.freevector.com/uploads/vector/preview/27644/rental2.jpg" alt="movie-1" height="580" width="580"/>
              </div>
              <div class="overlay-panel overlay-right">
                <img src="https://as2.ftcdn.net/v2/jpg/01/55/06/59/1000_F_155065975_0koDTNC4SUudifhCKE2zMnzTliLgjCXZ.jpg" alt="movie-2" height="580" width="500" />
              </div>
          </div>
        </div>
    </div>
  );
}

export default SignInPage;
