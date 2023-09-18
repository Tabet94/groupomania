import "./posts.css"
import { Post } from "../post/Post";

export const Posts = () =>{

    //TEMPORARY
    const posts = [
        {
          id: 1,
          name: "landscape",
          userId: 1,
          profilePic:
            "https://us.123rf.com/450wm/facundodelellis/facundodelellis1805/facundodelellis180500003/100932744-silhouette-de-jeune-photographe-avec-son-appareil-photo.jpg?ver=6g?auto=compress&cs=tinysrgb&w=1600",
          desc: "Northern Lights",
          img: "https://cdn.britannica.com/64/94864-050-223C3FE6/Northern-lights-sky-Kautokeino.jpg?auto=compress&cs=tinysrgb&w=1600",

        },
        {
          id: 2,
          name: "art",
          userId: 2,
          profilePic:
            "https://dessin-creation.com/wp-content/uploads/2016/04/Comment-dessiner-un-paysage-par-dessi-n-creation.jpg?auto=compress&cs=tinysrgb&w=1600",
          desc: "it was my dream home",
        },
      ];
    
      return <div className="posts">
        {posts.map(post=>(
          <Post post={post} key={post.id}/>
          
        ))}
      </div>;
    };
    