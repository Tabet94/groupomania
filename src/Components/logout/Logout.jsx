import { AuthContext } from "../../context/authContext"; 
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import LogoutIcon from '@mui/icons-material/Logout';
import "./logout.css"

export const Logout = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login")
    } catch (err) {
      console.error("Logout error:", err);
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
  )
};