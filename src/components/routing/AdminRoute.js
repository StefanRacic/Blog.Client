import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../../context/auth/AuthContext';

const AdminRoute = ({ component: Component, ...rest }) => {
    const authContext = useContext(AuthContext);
    const { isAuthenticated, role } = authContext;

    return (
        <Route
            {...rest}
            render={props =>
                isAuthenticated === true && role == "Admin" ? (
                    <Component {...props} />

                ) : (
                        <Redirect to="/" />
                    )
            }
        />
    );
};

export default AdminRoute;