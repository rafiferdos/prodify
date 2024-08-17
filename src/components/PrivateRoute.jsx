import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import PacmanLoader from "react-spinners/PacmanLoader";

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children }) => {
    const location = useLocation()

    const { user, loading } = useContext(AuthContext)

    if (loading)
        return (
            <div className="h-screen flex items-center justify-center">
                <PacmanLoader color="rgb(6 182 212)" />
            </div>
        )

    if (!user)
        return <Navigate to='/login' state={location?.pathname || '/'} />

    return children
};

export default PrivateRoute;