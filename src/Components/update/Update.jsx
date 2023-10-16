import { useState} from "react";
import { makeRequest } from "../../axios";
import { useNavigate } from "react-router-dom";
import "./update.css";
import { useMutation, useQueryClient } from "react-query";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SystemUpdateAltOutlinedIcon from '@mui/icons-material/SystemUpdateAltOutlined';
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";


export const Update = ({ setOpenUpdate, user }) => {
  const { setCurrentUser } = useContext(AuthContext);
  const [cover, setCover] = useState(null);
  const [profile, setProfile] = useState(null);
  const [texts, setTexts] = useState({
    email: user.email,
    password: user.password,
    name: user.name,
  });

  
  const upload = async (file) => {
    console.log(file)
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  
  const handleChange = (e) => {
    setTexts((prev) => ({ ...prev, [e.target.name]: [e.target.value] }));
  };

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (user) => {
      return makeRequest.put("/users", user);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["user"]);
      },
    }
  );

  
  
  const handleClick = async (e) => {
    e.preventDefault();
  
    let coverUrl;
    let profileUrl;
    coverUrl = cover ? await upload(cover) : user.coverPic;
    profileUrl = profile ? await upload(profile) : user.profilePic;
  
    
    const updatedUser = {
      ...texts,
      coverPic: coverUrl,
      profilePic: profileUrl,
    };
  
    mutation.mutate(updatedUser);
  
    
    setCurrentUser((prevUser) => ({
      ...prevUser,
      profilePic: profileUrl,
      

    }));
  
    setOpenUpdate(false);
    setCover(null);
    setProfile(null);


    
  };
  


  const navigate = useNavigate()
  
 function deleteUser (e, id)
 {
  e.preventDefault();
  console.log(id)
  fetch(`http://localhost:5000/backend/users/${id}`, {
  method: "DELETE",
  credentials: "include"
})
  .then((result) => result.json())
  .then((resp) => {
    console.warn(resp);
    if (resp.message === "User deleted successfully") {
    
      localStorage.clear();

      
      navigate("/login")
    }
  })
  .catch((error) => {
    console.error(error);
  });
  
}



  
  return (
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
                      : "/upload/" + user.coverPic}
                  alt=""/>
                <CloudUploadIcon className="icon" />
              </div>
            </label>
            <input
              type="file"
              id="cover"
              style={{ display: "none" }}
              onChange={(e) => setCover(e.target.files[0])}/>
            <label htmlFor="profile">
              <span>Profile Picture</span>
              <div className="imgContainer">
                <img
                  src={
                    profile
                      ? URL.createObjectURL(profile)
                      : "/upload/" + user.profilePic}
                  alt=""/>
                <CloudUploadIcon className="icon"/>
              </div>
            </label>
            <input
              type="file"
              id="profile"
              style={{ display: "none" }}
              onChange={(e) => setProfile(e.target.files[0])}/>
          </div>
          <label>Email</label>
          <input
            type="text"
            value={texts.email}
            name="email"
            onChange={handleChange}/>
          <label>Password</label>
          <input
            type="text"
            value={texts.password}
            name="password"
            onChange={handleChange}/>
          <label>Name</label>
          <input
            type="text"
            value={texts.name}
            name="name"
            onChange={handleChange}/>
          <SystemUpdateAltOutlinedIcon onClick={handleClick}>Update</SystemUpdateAltOutlinedIcon>
          <button onClick={(e) => {deleteUser(e, user.id)}} className="delete-button">
            Delete Account
          </button>
        </form>
        <button className="close" onClick={() => setOpenUpdate(false)}>close</button>
      </div>
    </div>
  );
};


//