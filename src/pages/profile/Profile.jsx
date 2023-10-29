// Import necessary dependencies and components
import "./profile.css";
import { useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import { makeRequest } from "../../axios";
import { useState, useContext } from "react";
import { Update } from "../../Components/update/Update";
import { AuthContext } from "../../context/authContext";

// Define the Profile component
export const Profile = () => {
  // State to control the visibility of the update form
  const [openUpdate, setOpenUpdate] = useState(false);

  // Get the current user from the context
  const { currentUser } = useContext(AuthContext);

  // Extract the user ID from the current URL
  const userId = parseInt(useLocation().pathname.split("/")[2]);

  // Query to fetch user data based on the user ID
  const { isLoading, data } = useQuery(["user"], () =>
    makeRequest.get("/users/find/" + userId).then((res) => {
      return res.data;
    })
  );

  return (
    <div className="profile">
      {isLoading ? (
        "Loading..."
      ) : data ? (
        // Render user profile information if data is available
        <>
          <div className="images">
            <img src={"/upload/" + data.coverPic} alt="" className="cover" />
            <img src={"/upload/" + data.profilePic} alt="" className="profilePic" />
          </div>
          <div className="profileContainer">
            <div className="uInfo">
              <div className="center">
                <span>{data.username}</span>
              </div>
              <button onClick={() => setOpenUpdate(true)}>update</button>
              {openUpdate && userId === currentUser.id && <Update setOpenUpdate={setOpenUpdate} user={data} />}
            </div>
          </div>
        </>
      ) : (
        "User data not available"
      )}
    </div>
  );
};
