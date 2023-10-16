import "./posts.css"
import { Post } from "../post/Post";
import { useQuery } from "react-query";
import { makeRequest } from "../../axios";
import React, { useState } from "react";


 
 
  export const Posts = ({userId}) => {
    const [isNewPostAdded, setNewPostAdded] = useState(false);


   const { isLoading, error, data } = useQuery(["posts"], () =>
  makeRequest.get("/posts?userId=" + userId).then((res) => {
    setNewPostAdded(true); 
    return res.data;
  })
);

  
  
return (
  <div className={`posts ${isNewPostAdded ? "new-post" : ""}`}>
    {error ? "Something went wrong!" : isLoading ? "loading" : data.map((post) => <Post post={post} key={post.id} />)}
  </div>
);
};
  
  