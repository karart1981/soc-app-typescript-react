import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { IComment, IPost } from "../helpers/types";
import { BASE } from "../helpers/default";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { handleAddComment, handleGetPostById } from "../helpers/api";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  height: 700,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface IProps {
  open: boolean;
  post: IPost;
  onClose: () => void;
}

export function Preview({ open, onClose, post }: IProps) {
 
  const [postComments, setPostComment] = useState<IPost | null>(null)
 
 const {register, handleSubmit,reset} = useForm<IComment>()

 useEffect(() => {
  handleGetPostById(post.id)
  .then(resonse => {
    
    setPostComment(resonse.payload as IPost)
   
  })
 },[post])

 const handleAdd = (data:IComment) => {
  
  const {content} = data
  
  handleAddComment(content, post.id)
  .then(response => {
    if(response.payload){
    
     if(response && postComments?.id ){
      setPostComment({...postComments,
        comments:[...postComments.comments,response.payload as IComment]})
    }
  }
   
   reset()
   
   
  })

 }

 
 
 

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {post.title}
        </Typography>
        <div className="contentStyle">
          <img
            src={BASE + post.picture}
            alt={post.title}
            style={{width:300, height:400, objectFit:'cover'}}
          />
          <div style={{ width:400}}>
            <Typography variant="subtitle1">
              <div style={{ display: "flex", alignItems: "center" }}>
                <strong style={{ marginRight: "8px" }}>
                  {post.likes.length} likes
                </strong>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <strong style={{ marginRight: "8px" }}>
                  {post.comments.length} comments
                </strong>
              </div>

              <div style={{ display: "flex", alignItems: "center" }}>
                <p style={{ marginRight: "8px" }}>likes:</p>
              </div>
            </Typography>
            {post.likes.length > 0 ? (
              <ul style={{ padding: 0, margin: 0, listStyleType: "none" }}>
                {post.likes.map((user, index) => (
                  <li key={index} className="likeItemStyle">
                    <img
                      src={BASE + user.picture}
                      alt={`${user.name} ${user.surname}`}
                      className="profilePicStyle"
                    />
                    <Link to={`/profile/${user.id}`}>
                      {user.name} {user.surname}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <Typography>No likes yet</Typography>
            )}
            <div className="commentsStyle">
              <Typography variant="subtitle1">
                <div style={{ display: "flex", alignItems: "center" }}>
                  <p style={{ marginRight: "8px" }}>comments:</p>
                </div>
              </Typography>
           
            </div>
            <form onSubmit={handleSubmit(handleAdd)}>
              <input
                placeholder="What you think?"
                style={{ padding: "8px", width: "100%" }}
                {...register("content")}
                
                
              />
              </form>
              <div>
                {
                  postComments?.comments.map(com => <div>
                    <strong>{com.user.name}</strong>
                    <p>{com.content}</p>
                    
                  </div>

                  )
                }
              </div>
            
            
          </div>
        </div>
      </Box>
    </Modal>
  );
}
