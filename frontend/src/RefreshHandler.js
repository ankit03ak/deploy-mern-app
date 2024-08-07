import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function RefreshHandler({ setIsAuthenticated }) {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const isAuthenticated = Boolean(token);

        setIsAuthenticated(isAuthenticated);

        if (isAuthenticated) {
            const pathsToRedirect = ['/', '/login', '/signup'];
            if (pathsToRedirect.includes(location.pathname)) {
                navigate('/home', { replace: true }); // Use replace to avoid adding another entry to the history stack
            }
        }
    }, [location.pathname, navigate, setIsAuthenticated]);

    return null;
}

export default RefreshHandler;
