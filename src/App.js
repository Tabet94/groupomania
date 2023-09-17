import React from 'react';
import './App.css';
import { createBrowserRouter,RouterProvider,Navigate,Outlet } from 'react-router-dom';
import { Login } from './pages/login/Login';
import { Register } from './pages/register/Register';
import { Home } from './pages/home/Home';
import { Navbar } from './Components/navbar/Navbar';
import { Profile } from './pages/profile/Profile';
import { useContext } from 'react';
import { AuthContext } from './context/authContext';



function App() {
  const { currentUser } = useContext(AuthContext);


 

  const Layout = () => {
    return (
      
        <div>
          <Navbar />
          <div style={{ display: "flex" }}>
            
            <div style={{ flex: 6 }}>
              <Outlet />
            </div>
            
          </div>
        </div>
      
    );
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









