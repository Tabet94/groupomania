import "./share.css";
import Image from "../../assets/img.jpg";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQueryClient } from "react-query";
import { makeRequest } from "../../axios";
import SendIcon from '@mui/icons-material/Send';




export const Share = () => {
  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState("");

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  
  
  const { currentUser } = useContext(AuthContext);
  const queryClient = useQueryClient();

  
  const mutation = useMutation(
    (newPost) => {
      return makeRequest.post("/posts", newPost);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );

  
  const handleClick = async (e) => {
    e.preventDefault();
  
    // Validation: Check if 'desc' is empty
    if (!desc.trim() && !file) {
      alert("You cannot share an empty post.");
      return;
    }
  
    let imgUrl = "";
    if (file) imgUrl = await upload();
    mutation.mutate({ desc, img: imgUrl });
    setDesc("");
    setFile(null);
  };
  
  
 
  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <div className="left">
          <img src={"/upload/" + currentUser.profilePic} alt="" />

            <input
              type="text"
              placeholder={`What's on your mind ${currentUser.name}?`}
              onChange={(e) => setDesc(e.target.value)}
              value={desc}/>
          </div>
          <div className="right">
            {file && (
              <img className="file" alt="" src={URL.createObjectURL(file)}/>
            )}
          </div>
        </div>
        <div className="bottom">
          <div className="left">
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}/>
            <label htmlFor="file">
              <div className="item">
                <img src={Image} alt=""/>
                <span>Add Image</span>
              </div>
            </label> 
          </div>
          <div className="right">
            <SendIcon onClick={handleClick}>
            </SendIcon>
          </div>
        </div>
      </div>
    </div>
  );
};