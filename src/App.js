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
import RouteAdmin from "./components/RouteAdmin";
import RouteUser from "./components/RouteUser";
function App() {
  const {isAuth, roles} = useContext(AuthContext);


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
              <RouteUser roles={roles}>
              <Buckets/>
              </RouteUser>
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
            <PrivateRoute exact path="/signup" isAuth={isAuth}>
              <RouteAdmin roles={roles}>
              <SignUp />
              </RouteAdmin>
            </PrivateRoute>
          </Switch>
        </div>
      </>
  );
}

export default App;