import React, { useState, useEffect } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './SideBar';
import './Navbar.css';
import { IconContext } from 'react-icons';
import Logo from './Logo';
import {
  setLoggedInFalse,
  logCustomerOut,
  setLoggedInTrue,
  setAdminTrue,
  setAdminFalse,
  setCurrentUser
} from "../../redux/userSlice/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

function NavigationBar() {
  const [sidebar, setSidebar] = useState(false);
  const isLoggedIn = useSelector((state) => state.user.loggedIn);
  const showSidebar = () => setSidebar(!sidebar);
  const dispatch = useDispatch();
  const history = useHistory();
  const admin = useSelector(state => state.user.admin);

  function handleLog() {
    if(isLoggedIn){
      dispatch(setLoggedInFalse());
      dispatch(logCustomerOut());
    }
    history.push('/signin');  
  }

  useEffect(() => {
    if(localStorage.getItem("user") != null && isLoggedIn == false){
      dispatch(setLoggedInTrue());
      const currentUser = JSON.parse(localStorage.getItem("user"));
      if(currentUser != null){
        dispatch(setCurrentUser({
          user: currentUser,
        }));
        if(currentUser.userRoles.length > 0 && currentUser.userRoles[0].role.name == "admin"){
          dispatch(setAdminTrue());
        }
      }
      else{
        dispatch(setAdminFalse());
        history.push('/vehicle');  
      }
    };
  },[])

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          <div className='menu-bars-center'>
            <Logo />
          </div>
          <div className='menu-bars-right'>
          {isLoggedIn ? (
            <Link to='/profile' className='menu-bars-right-item'>
            <FaIcons.FaUser />
          </Link>
          ):(<></>)}
          {isLoggedIn ? (
            <Link to='cart' className='menu-bars-right-item'>
            <FaIcons.FaShoppingCart />
            </Link>
          ):(<></>)}
          <button onClick={handleLog} className='menu-bars-right-item'>
            <FaIcons.FaSignInAlt />
          </button>
          </div>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                admin == false && item.isForClient == false ? (
                  <></>
                ) : (                  
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>)
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default NavigationBar;