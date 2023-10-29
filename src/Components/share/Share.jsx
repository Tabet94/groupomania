// Import the CSS file for styling
import "./share.css";

// Import an image
import Image from "../../assets/img.jpg";

// Import necessary components and functions
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQueryClient } from "react-query";
import { makeRequest } from "../../axios";
import SendIcon from '@mui/icons-material/Send';

// Define the Share component
export const Share = () => {
  // Initialize state variables for file and description
  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState("");

  // Function to upload a file
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

  // Get the current user from the AuthContext
  const { currentUser } = useContext(AuthContext);
  const queryClient = useQueryClient();

  // Define a mutation for posting
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

  // Function to handle the share button click
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
    // Render the Share component
    <div className="share">
      <div className="container">
        <div className="top">
          <div className="left">
            {/* Display the current user's profile picture */}
            <img src={"/upload/" + currentUser.profilePic} alt="" />

            {/* Input field for entering post description */}
            <input
              type="text"
              placeholder={`What's on your mind ?`}
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
            />
          </div>
          <div className="right">
            {/* Display the selected file (if any) */}
            {file && (
              <img className="file" alt="" src={URL.createObjectURL(file)} />
            )}
          </div>
        </div>
        <div className="bottom">
          <div className="left">
            {/* Input field for selecting a file */}
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
            <label htmlFor="file">
              <div className="item">
                <img src={Image} alt="" />
                <span>Add Image</span>
              </div>
            </label>
          </div>
          <div className="right">
            {/* Share button */}
            <SendIcon onClick={handleClick}>
            </SendIcon>
          </div>
        </div>
      </div>
    </div>
  );
};
