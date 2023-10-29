import { useContext, useState } from "react";
import "./comments.css";
import { AuthContext } from "../../context/authContext";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { makeRequest } from "../../axios";
import moment from "moment";
import SendIcon from "@mui/icons-material/Send";

export const Comments = ({ postId }) => {
  const [desc, setDesc] = useState(""); // State to store the comment input
  const { currentUser } = useContext(AuthContext); // Get the current user from the authentication context

  // Query to fetch comments for the given post
  const { isLoading, error, data } = useQuery(["comments"], () =>
    makeRequest.get("/comments?postId=" + postId).then((res) => {
      return res.data;
    })
  );

  const queryClient = useQueryClient();

  // Mutation for adding a new comment
  const mutation = useMutation(
    (newComment) => {
      return makeRequest.post("/comments", newComment);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch the comments query on success
        queryClient.invalidateQueries(["comments"]);
      },
    }
  );

  // Function to handle the submission of a new comment
  const handleClick = async (e) => {
    e.preventDefault();

    if (!desc.trim()) {
      alert("You cannot post an empty comment.");
      return;
    }

    // Mutate and add the new comment
    mutation.mutate({ desc, postId });
    setDesc("");
  };

  return (
    <div className="comments">
      <div className="write">
        <img src={"/upload/" + currentUser.profilePic} alt="" />
        <input
          type="text"
          placeholder="write a comment"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <SendIcon onClick={handleClick}></SendIcon>
      </div>
      {error
        ? "Something went wrong" // Display an error message if there's an error
        : isLoading
        ? "loading" // Display a loading message if data is still being fetched
        : data.map((comment, index) => (
            <div key={index} className="comment">
              <img src={"/upload/" + comment.profilePic} alt="" />
              <div className="info">
                <span>{comment.username}</span>
                <p>{comment.desc}</p>
              </div>
              <span className="date">
                {moment(comment.createdAt).fromNow()}
              </span>
            </div>
          ))}
    </div>
  );
};
