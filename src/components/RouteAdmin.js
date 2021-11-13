import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function RouteAdmin({ children, isAuth, roles, ...rest}) {

    return (
        <Route {...rest}>

            {roles.find((role) => role.name.includes("ROLE_ADMIN")) ? children : <Redirect to="/" />}
        </Route>
    )
}

export default RouteAdmin;