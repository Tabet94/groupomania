
import "./post.css";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from "react-router-dom";
import { Comments } from "../comments/Comments"
import { useState } from "react";
import moment from "moment";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { useContext } from "react";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";

// Define the Post component.
export const Post = ({ post }) => {
  // State for controlling comment and menu visibility.
  const [commentOpen, setCommentOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Get the current user from the AuthContext.
  const { currentUser } = useContext(AuthContext);

  // Initialize the query client.
  const queryClient = useQueryClient();

  // Use a query to fetch post likes.
  const { isLoading, data } = useQuery(["likes", post.id], () =>
    makeRequest.get("/likes?postId=" + post.id).then((res) => {
      return res.data;
    })
  );

  // Define a mutation for liking/unliking a post.
  const mutation = useMutation(
    (liked) => {
      if (liked) return makeRequest.delete("/likes?postId=" + post.id);
      return makeRequest.post("/likes", { postId: post.id });
    },
    {
      // Invalidate and refetch the likes query on success.
      onSuccess: () => {
        queryClient.invalidateQueries(["likes"]);
      },
    }
  );

  // Define a mutation for deleting a post.
  const deleteMutation = useMutation(
    (postId) => {
      return makeRequest.delete("/posts/" + postId);
    },
    {
      // Invalidate and refetch the posts query on success.
      onSuccess: () => {
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );

  // Handle liking/unliking a post.
  const handleLike = () => {
    mutation.mutate(data.includes(currentUser.id));
  };

  // Handle deleting a post.
  const handleDelete = () => {
    deleteMutation.mutate(post.id);
  };

  // Render the Post component.
  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            {/* Display user profile picture and details. */}
            <img src={"/upload/"+post.profilePic} alt="" />
            <div className="details">
              <Link
                to={`/profile/${post.userId}`}
                style={{ textDecoration: "none", color: "inherit" }}>
                <span className="username">{post.username}</span>
              </Link>
              <span className="date">{moment(post.createdAt).fromNow()}</span>
            </div>
          </div>
          {/* Display delete icon and handle delete functionality. */}
          <DeleteIcon onClick={() => setMenuOpen(!menuOpen)} />
          {menuOpen && post.userId === currentUser.id && (
            <button onClick={handleDelete}>delete</button>
          )}
        </div>
        <div className="content">
          {/* Display post description and image. */}
          <p>{post.desc}</p>
          <img src={"/upload/" + post.img} alt="" />
        </div>
        <div className="info">
          <div className="item">
            {isLoading ? (
              "loading"
            ) : data.includes(currentUser.id) ? (
              // Display liked icon with red color and handle liking functionality.
              <FavoriteOutlinedIcon
                style={{ color: "red" }}
                onClick={handleLike}
              />
            ) : (
              // Display unliked icon and handle liking functionality.
              <FavoriteBorderOutlinedIcon
                onClick={handleLike}
              />
            )}
            {data?.length} 
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            {/* Display comment icon and allow toggling comments. */}
            <InsertCommentIcon />
            See Comments
          </div>
        </div>
        {/* Display comments component if commentOpen is true. */}
        {commentOpen && <Comments postId={post.id} />}
      </div>
    </div>
  );
};
