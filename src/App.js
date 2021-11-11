import React, {useContext} from 'react';
import { Switch, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Profile from './pages/Profile';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import './App.css';
import PrivateRoute from "./components/PrivateRoute";
import {AuthContext} from './context/AuthContext';
import BucketsOUD from "./pages/Buckets";
import Batches from "./pages/Batches";
import Orders from "./pages/Orders";
import OrderItemDetails from "./pages/OrderItemDetails";

function App() {
  const {isAuth} = useContext(AuthContext);


  return (
      <>
        <NavBar />
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <PrivateRoute path="/profile" isAuth={isAuth}>
              <Profile />
            </PrivateRoute>
            <PrivateRoute path="/buckets" isAuth={isAuth}>
              <BucketsOUD />
            </PrivateRoute>
            <PrivateRoute path="/batches" isAuth={isAuth}>
              <Batches />
            </PrivateRoute>
            <PrivateRoute path="/orders" isAuth={isAuth}>
              <Orders />
            </PrivateRoute>
            <PrivateRoute path="/orderItem/:item" isAuth={isAuth}>
              <OrderItemDetails />
            </PrivateRoute>
            <Route exact path="/signin" >
              <SignIn />
            </Route>
            <Route exact path="/signup">
              <SignUp />
            </Route>
          </Switch>
        </div>
      </>
  );
}

export default App;
