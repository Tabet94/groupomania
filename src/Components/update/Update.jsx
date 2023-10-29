import { useState } from "react";
import { makeRequest } from "../../axios";
import { useNavigate } from "react-router-dom";
import "./update.css";
import { useMutation, useQueryClient } from "react-query";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

// Define the Update component, which allows users to update their profile
export const Update = ({ setOpenUpdate, user }) => {
  // Get the current user from the context
  const { setCurrentUser } = useContext(AuthContext);

  // State to manage cover and profile picture uploads
  const [cover, setCover] = useState(null);
  const [profile, setProfile] = useState(null);

  // State to manage user input for email and username
  const [texts, setTexts] = useState({
    email: user.email,
    username: user.username,
  });

  // Function to upload a file (cover or profile picture)
  const upload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  // Function to handle input changes
  const handleChange = (e) => {
    setTexts((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Access the query client from React Query
  const queryClient = useQueryClient();

  // Define a mutation for updating the user's information
  const mutation = useMutation(
    (user) => {
      return makeRequest.put("/users", user);
    },
    {
      onSuccess: () => {
        // Invalidate the "user" query to trigger a refetch
        queryClient.invalidateQueries(["user"]);
      },
    }
  );

  // Function to handle the update button click
  const handleClick = async (e) => {
    e.preventDefault();

    // Variables to store cover and profile picture URLs
    let coverUrl;
    let profileUrl;

    // Check if there's a new cover image to upload
    coverUrl = cover ? await upload(cover) : user.coverPic;

    // Check if there's a new profile image to upload
    profileUrl = profile ? await upload(profile) : user.profilePic;

    // Construct the updated user object with new information
    const updatedUser = {
      ...texts,
      coverPic: coverUrl,
      profilePic: profileUrl,
    };

    // Trigger the mutation to update the user's information
    mutation.mutate(updatedUser);

    // Update the current user's profile picture
    setCurrentUser((prevUser) => ({
      ...prevUser,
      profilePic: profileUrl,
    }));

    // Close the update form and reset cover and profile states
    setOpenUpdate(false);
    setCover(null);
    setProfile(null);
  };

  // Use the useNavigate hook for programmatic navigation
  const navigate = useNavigate();

  // Function to delete the user's account
  function deleteUser(e, id) {
    e.preventDefault();
    console.log(id);
    // Send a request to delete the user's account
    fetch(`http://localhost:5000/backend/users/${id}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then((result) => result.json())
      .then((resp) => {
        console.warn(resp);
        if (resp.message === "User deleted successfully") {
          // Clear local storage and navigate to the login page
          localStorage.clear();
          navigate("/login");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    // Render the Update component
    <div className="update">
      <div className="wrapper">
        <h1>Update Your Profile</h1>
        <form>
          <div className="files">
            <label htmlFor="cover">
              <span>Cover Picture</span>
              <div className="imgContainer">
                <img
                  src={
                    cover
                      ? URL.createObjectURL(cover)
                      : "/upload/" + user.coverPic
                  }
                  alt=""
                />
                <CloudUploadIcon className="icon" />
              </div>
            </label>
            <input
              type="file"
              id="cover"
              style={{ display: "none" }}
              onChange={(e) => setCover(e.target.files[0])}
            />
            <label htmlFor="profile">
              <span>Profile Picture</span>
              <div className="imgContainer">
                <img
                  src={
                    profile
                      ? URL.createObjectURL(profile)
                      : "/upload/" + user.profilePic
                  }
                  alt=""
                />
                <CloudUploadIcon className="icon" />
              </div>
            </label>
            <input
              type="file"
              id="profile"
              style={{ display: "none" }}
              onChange={(e) => setProfile(e.target.files[0])}
            />
          </div>
          <label>Email</label>
          <input
            type="text"
            value={texts.email}
            name="email"
            onChange={handleChange}
          />
          <label>UserName</label>
          <input
            type="text"
            value={texts.username}
            name="username"
            onChange={handleChange}
          />
          <button onClick={handleClick}>Update</button>
          <button onClick={(e) => deleteUser(e, user.id)} className="delete-button">
            Delete Account
          </button>
        </form>
        <button className="close" onClick={() => setOpenUpdate(false)}>
          close
        </button>
      </div>
    </div>
  );
};

