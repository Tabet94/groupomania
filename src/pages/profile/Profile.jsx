import "./profile.css"
import { useLocation } from "react-router-dom";
import { useQuery} from "react-query";
import { makeRequest } from "../../axios";
import { useState, useContext } from "react";
import {Update} from "../../Components/update/Update";
import { AuthContext } from "../../context/authContext";



export const Profile = () => {
  const [openUpdate, setOpenUpdate] = useState(false);
  // const [Update, setUpdate] = useState(false);
  const { currentUser } = useContext(AuthContext);
  

  const userId = parseInt(useLocation().pathname.split("/")[2]);
  
  const { isLoading, data } = useQuery(["user"], () =>
  makeRequest.get("/users/find/" + userId).then((res) => {
    return res.data;
  })
);
  

 
  return (
    <div className="profile">
        {isLoading ? (
          "Loading..."
      ):data?(
        <>
        <div className="images">
          <img src={"/upload/"+data.coverPic} alt="" className="cover" />
          <img src={"/upload/"+data.profilePic} alt="" className="profilePic" />
          
        </div>
        <div className="profileContainer">
          <div className="uInfo">
            <div className="center">
              <span>{data.username}</span>
            </div>
            <button onClick={() => setOpenUpdate(true)}>update</button>
            {openUpdate && userId === currentUser.id && <Update setOpenUpdate={setOpenUpdate} user={data} />}
            {/* {if ( userId ! currentUser.id ) && {<Update setUpdate={setUpdate} user={data} />} */}
          </div>
        </div>
        </>
      ):(
      "User data not available"
      )} 
    </div>
  );
};