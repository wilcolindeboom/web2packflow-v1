import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function PrivateRoute({ children, isAuth, ...rest}) {

    return (
        <Route {...rest}>
            {isAuth ? children : <Redirect to="/" />}
        </Route>
    )
}

export default PrivateRoute;