import React, {useEffect, useContext, useState} from 'react';
import {ReactComponent as Logo} from '../assets/logo.svg';
import { useHistory, Link, useLocation} from 'react-router-dom';
import {AuthContext} from '../context/AuthContext';
import './NavBar.css';
import Button from "./Button";


function NavBar() {
  const history = useHistory();
  const {isAuth, logOff, userName, isAdmin, adminMode, toggleAdminMode} = useContext(AuthContext);

    const page = useLocation().pathname;
    const id = page.substr(1, page.length-1);

    const [checked,toggleChecked] = useState(adminMode);


  useEffect(() => {
    toggleAdminMode(checked);
    },[checked])
  ;


  function handleLogOff() {
    logOff();
  }


  return (
      <>
      {isAuth &&
      <nav>
          <Link to="/buckets">
          <span className="logo-container">
            <Logo/>
          </span>
          </Link>

          {isAdmin && checked

              ?
              <div className="menu">
                  <Button id={id} name = "users" onClick={() => history.push('/users')}>
                     Gebruikersoverzicht
                 </Button>
                  <Button id={id} name = "signup" onClick={() => history.push('/signup')}>
                      registreren
                  </Button>


              </div>

              :
              <div className="menu">
                      <Button id={id} name = "buckets" onClick={() => history.push('/buckets')}>
                          Buckets
                      </Button>
                      <Button id={id} name = "orders" onClick={() => history.push('/orders')}>
                          Orders
                      </Button>
                      <Button id={id} name = "batches" onClick={() => history.push('/batches')}>
                          Batches
                      </Button>
                  </div>
          }

          <div className="user-section">
              {isAdmin &&
              <div className="switch" >
                  <label htmlFor="checkbox>" className="checkbox">
                      {checked ? "beheer" : "productie" }
                  </label>
                  <input
                       type="checkbox"
                       id="checkbox"
                       onChange={() => {
                           checked ? history.push('/buckets') : history.push('/users');
                           toggleChecked(!checked);
                       }
                       }
                       checked={checked}/>
                  <span className="slider"></span>
                  <span>modus</span>
              </div>
              }
              <Link to="/profile">{userName}</Link>
              <Button onClick={() => handleLogOff()}>
                  Log uit
              </Button>
          </div>
      </nav>
}
</>
  );
}

export default NavBar;