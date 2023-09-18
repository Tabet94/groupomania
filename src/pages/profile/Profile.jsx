import "./profile.css"

import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Posts } from "../../Components/posts/Posts";

export const Profile = () => {
  return (
    <div className="profile">
      <div className="images">
        <img
          src="https://photographe-en-herbe.com/wp-content/uploads/2019/04/le-materiel-pour-debuter-la-photo-de-paysage-couleur-1024x645.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt=""
          className="cover"
        />
        <img
          src="https://us.123rf.com/450wm/facundodelellis/facundodelellis1805/facundodelellis180500003/100932744-silhouette-de-jeune-photographe-avec-son-appareil-photo.jpg?ver=6?auto=compress&cs=tinysrgb&w=1600&lazy=load"
          alt=""
          className="profilePic"
        />
      </div>
      <div className="profileContainer">
        <div className="uInfo">
          <div className="center">
            <span>Jane Doe</span>
            <button>follow</button>
          </div>
          <div className="right">
            <EmailOutlinedIcon />
            <MoreVertIcon />
          </div>
        </div>
      <Posts/>
      </div>
    </div>
  );
};