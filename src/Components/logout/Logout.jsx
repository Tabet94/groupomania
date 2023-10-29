import { AuthContext } from "../../context/authContext"; 
import { useNavigate } from "react-router-dom";
import { useContext } from "react"; 
import LogoutIcon from '@mui/icons-material/Logout'; 
import "./logout.css";

export const Logout = () => {
  const { logout } = useContext(AuthContext); // Get the 'logout' function from the authentication context
  const navigate = useNavigate(); // Get the navigation function using React Router's useNavigate hook

  // Function to handle the logout process
  const handleLogout = async () => {
    try {
      await logout(); // Call the 'logout' function to log the user out
      navigate("/login"); // Navigate to the '/login' route after successful logout
    } catch (err) {
      console.error("Logout error:", err); // Log any errors that occur during logout
    }
  };

  return (
    <LogoutIcon
      className="logout" 
      onClick={handleLogout} 
      style={{ 
        cursor: 'pointer', 
        transition: 'color 0.2s', 
      }}
    />
  );
};
