import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function RouteUser({ children, isAuth, roles, ...rest}) {

    return (
        <Route {...rest}>

            {roles.find((role) => role.name.includes("ROLE_USER")) ? children : <Redirect to="/profile" />}
        </Route>
    )
}

export default RouteUser;