import React, {useContext} from 'react';
import {AuthContext} from '../context/AuthContext';
import SignIn from "./SignIn";
import './Home.css';

function Home() {

  console.log(useContext(AuthContext));

  return (
    <>
      <div className="signin">
      <section>
        <SignIn/>
      </section>
      </div>
    </>
  );
}

export default Home;
