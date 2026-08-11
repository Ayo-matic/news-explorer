import { Navigate } from 'react-router-dom';

// Redirects to "/" if not logged in; otherwise renders the protected page.
function ProtectedRoute({ isLoggedIn, children }) {
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return children;
}

export default ProtectedRoute;
