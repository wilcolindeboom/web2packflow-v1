import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import {AuthContext} from '../context/AuthContext';
import {ReactComponent as Logo} from "../assets/logo.svg";
import SignIn from "./SignIn";
import './Home.css';


function Home() {

  console.log(useContext(AuthContext));

  const {isAuth, toggleAuth } = useContext(AuthContext);



  return (
    <>
      <div className="signin">
      <section>
        <SignIn/>
      </section>
      <section>
        {/*<p>Als je ingelogd bent, bekijk dan de <Link to="/profile">Profielpagina</Link></p>*/}
        {/*<p>Je kunt ook <Link to="/signin">inloggen</Link> of jezelf <Link to="/signup">registeren</Link> als je nog geen*/}
        {/*  account hebt.</p>*/}
      </section>
      </div>
    </>
  );
}

export default Home;
