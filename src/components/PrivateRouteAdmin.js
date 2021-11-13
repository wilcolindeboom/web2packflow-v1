import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function PrivateRouteAdmin({ children, isAuth, isAdmin, ...rest}) {

    return (
        <Route {...rest}>
            {isAuth && isAdmin  ? children : <Redirect to="/" />}
        </Route>
    )
}

export default PrivateRouteAdmin;