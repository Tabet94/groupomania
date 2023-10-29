import React from 'react';
import './style.css';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { Login } from './pages/login/Login';
import { Register } from './pages/register/Register';
import { Home } from './pages/home/Home';
import { Navbar } from './Components/navbar/Navbar';
import { Profile } from './pages/profile/Profile';
import { useContext } from 'react';
import { AuthContext } from './context/authContext';
import { QueryClient, QueryClientProvider } from 'react-query';

function App() {
  // Get the current user from the AuthContext
  const { currentUser } = useContext(AuthContext);

  // Initialize a new QueryClient for React Query
  const queryClient = new QueryClient();

  // Define the layout of the app
  const Layout = () => {
    return (
      <QueryClientProvider client={queryClient}>
        <Navbar />
        <Outlet /> {/* Outlet for nested routes */}
      </QueryClientProvider>
    );
  };

  // Define a protected route component to check if the user is authenticated
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />; // Redirect to login if not authenticated
    }

    return children;
  };

  // Create the app's router configuration
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <ProtectedRoute>
          <Layout /> {/* Apply the layout to protected routes */}
        </ProtectedRoute>
      ),
      children: [
        {
          path: '/',
          element: <Home />, // Home page
        },
        {
          path: '/profile/:id',
          element: <Profile />, // Profile page with dynamic ID
        },
      ],
    },
    {
      path: '/login',
      element: <Login />, // Login page
    },
    {
      path: '/register',
      element: <Register />, // Register page
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} /> {/* Provide the router to the app */}
    </div>
  );
}

export default App;





