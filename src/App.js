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
import Buckets from "./pages/Buckets";
import Batches from "./pages/Batches";
import Orders from "./pages/Orders";
import OrderItemDetails from "./pages/OrderItemDetails";
import PrivateRouteAdmin from "./components/PrivateRouteAdmin";
import Users from "./pages/Users";
function App() {
  const {isAuth, isAdmin} = useContext(AuthContext);


  return (
      <>
        <NavBar />
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <PrivateRoute path="/profile/:username" isAuth={isAuth}>
              <Profile />
            </PrivateRoute>
            <PrivateRoute path="/buckets" isAuth={isAuth}>
              <Buckets/>
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
            <PrivateRouteAdmin exact path="/signup" isAuth={isAuth} isAdmin={isAdmin} >
              <SignUp />
            </PrivateRouteAdmin>
            <PrivateRouteAdmin exact path="/users" isAuth={isAuth} isAdmin={isAdmin} >
              <Users/>
            </PrivateRouteAdmin>
          </Switch>
        </div>
      </>
  );
}

export default App;