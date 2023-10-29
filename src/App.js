import React from 'react';
import './style.css';
import { createBrowserRouter,RouterProvider,Navigate,Outlet } from 'react-router-dom';
import { Login } from './pages/login/Login';
import { Register } from './pages/register/Register';
import { Home } from './pages/home/Home';
import { Navbar } from './Components/navbar/Navbar';
import { Profile } from './pages/profile/Profile';
import { useContext } from 'react';
import { AuthContext } from './context/authContext';
import { QueryClient, QueryClientProvider } from 'react-query';





function App() {
  const { currentUser } = useContext(AuthContext);
  const queryClient = new QueryClient();


 

  const Layout = () => {
    return (

      <QueryClientProvider client={queryClient}>
          <Navbar />
          <Outlet />
      </QueryClientProvider>   
    )
  };

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/profile/:id",
          element: <Profile />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;









