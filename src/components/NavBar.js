import React, {useContext, useState, useEffect} from 'react';
import {ReactComponent as Logo} from '../assets/logo.svg';
import { useHistory, Link, useLocation} from 'react-router-dom';
import {AuthContext} from '../context/AuthContext';
import './NavBar.css';
import Button from "./Button";

function NavBar() {
  const history = useHistory();
  const {isAuth, logOff} = useContext(AuthContext);
    const page = useLocation().pathname;
    const [id,setId] = useState(page.substr(1, page.length-1));



    // useEffect( () => {
    //     setId(id);
    //
    // },[id]);


  function handleLogOff() {
    logOff();
  }

  return (
    <nav>
        <Link to="/buckets">
          <span className="logo-container">
            <Logo/>
          </span>
        </Link>

        {isAuth &&
        <div className="menu">
            {console.log(id)}
            <Button id={id} onClick={() => history.push('/buckets')}>
                Buckets
            </Button>
            <Button id={id} onClick={() => history.push('/orders')}>
                Orders
            </Button>
            <Button id={id} onClick={() => history.push('/batches')}>
                Batches
            </Button>
        </div>
        }

      <div>
          {isAuth &&
          <Button onClick={() => handleLogOff()}>
              Log uit
          </Button>
          }
      </div>
    </nav>
  );
}

export default NavBar;