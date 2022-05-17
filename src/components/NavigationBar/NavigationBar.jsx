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
  logCustomerOut
} from "../../redux/userSlice/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

function NavigationBar() {
  const [sidebar, setSidebar] = useState(false);
  const loggedIn = useSelector((state) => state.user.loggedIn);
  const showSidebar = () => setSidebar(!sidebar);
  const dispatch = useDispatch();
  const history = useHistory()

  function handleLog() {
    if(loggedIn){
      dispatch(setLoggedInFalse());
      dispatch(logCustomerOut());
    }
    history.push('/signin');  
  }

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
            <Link to='/profile' className='menu-bars-right-item'>
              <FaIcons.FaUser />
            </Link>
            <Link to='cart' className='menu-bars-right-item'>
              <FaIcons.FaShoppingCart />
            </Link>
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
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default NavigationBar;