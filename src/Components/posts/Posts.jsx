
import "./posts.css";
import { Post } from "../post/Post";
import { useQuery } from "react-query";
import { makeRequest } from "../../axios";

// Define the Posts component, which takes a userId as a prop
export const Posts = ({ userId }) => {
  // Use the useQuery hook to fetch data and manage loading and errors
  const { isLoading, error, data } = useQuery(["posts"], () =>
    // Make a GET request to retrieve posts based on the userId
    makeRequest.get("/posts?userId=" + userId).then((res) => {
      return res.data;
    })
  );

  return (
    // Render the Posts component
    <div className="posts">
      {error
        ? "Something went wrong!" // Display an error message if there's an error
        : isLoading
        ? "loading" // Display a loading message while data is being fetched
        : data.map((post) => <Post post={post} key={post.id} />) // Display the posts
      }
    </div>
  );
};
