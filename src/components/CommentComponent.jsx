import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Swal from "sweetalert2";

const Container = styled.div`
  padding: 20px;
  background: #f4f4f4;

  border-radius: 10px;
  margin-top: 20px;
  position: fixed;
  top: 0%;
  left: 50%;
  box-shadow: rgba(0, 0, 0, 0.5) 0px 3px 8px;
  width: 80%; /* Adjust as needed */
  transform: translate(-50%, 0%);
  height:100vh;
  overflow-y:scroll;
  z-index:1001;


`;


const CommentBox = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  resize: none;


`;

const Button = styled.button`
  background: #0077B5;
  color: white;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 5px;
  transition: 0.3s;
  margin-top: 5px;

  &:hover {
    background: #005A93;
  }
`;

const CommentContainer = styled.div`
  background: white;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 5px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  
`;

const ReplyButton = styled.button`
  background: transparent;
  color: #0077B5;
  border: none;
  cursor: pointer;
  margin-top: 5px;
`;

const ReplyBox = styled.div`
  margin-left: 20px;
  margin-top: 10px;
`;

const CommentComponent = ({ manuscriptId, handleCloseComments }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState({});
  const location = useLocation();

  // Fetch Comments and Replies
  
    const fetchComments = async () => {
      try {
        const response = await fetch(
          `https://www.fuprecosjournals.org/api/get_comments.php?manuscript_id=${manuscriptId}`
        );
        const data = await response.json();

        if (data.success) {
          setComments(data.comments);
        } else {
          console.error(data.error);
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };


    useEffect(() => {
    fetchComments();
  }, [manuscriptId]);

  // Handle New Comment
  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return;

    try {
      const response = await fetch("https://www.fuprecosjournals.org/api/add_comment.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ manuscript_id: manuscriptId, text: newComment }),
      });

      const data = await response.json();

      if (data.success) {
        Swal.fire("Success!", "Comment added successfully.", "success");
        setNewComment("");
        setComments((prev) => [...prev, data.comment]);
        fetchComments();
      } else {
        Swal.fire("Error!", data.error || "Failed to add comment.", "error");
      }
    } catch (error) {
      Swal.fire("Error!", "Network issue or server error.", "error");
      console.error("Error adding comment:", error);
    }
  };

  // Handle Reply Submit
  const handleReplySubmit = async (commentId) => {
    const text = replyText[commentId]?.trim();
    if (!text) return;

    try {
      const response = await fetch("https://www.fuprecosjournals.org/api/add_reply.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comment_id: commentId, text }),
      });

      const data = await response.json();

      if (data.success) {
        Swal.fire("Success!", "Reply added successfully.", "success");
        setReplyText((prev) => ({ ...prev, [commentId]: "" }));
        setComments((prev) =>
          prev.map((comment) =>
            comment.id === commentId
              ? { ...comment, replies: [...comment.replies, data.reply] }
              : comment
          )
        );

        fetchComments();
        setReplyingTo(null);
      } else {
        Swal.fire("Error!", data.error || "Failed to add reply.", "error");
      }
    } catch (error) {
      Swal.fire("Error!", "Network issue or server error.", "error");
      console.error("Error adding reply:", error);
    }
  };

  return (
    <Container>
      <h3>Comments</h3>
      {(location.pathname === "/editordashboard" || location.pathname === "/reviewerdashboard") && (
  <CommentBox
    rows="4"
    placeholder="Write a comment..."
    value={newComment}
    onChange={(e) => setNewComment(e.target.value)}
  />
)}
      {(location.pathname === "/editordashboard" || location.pathname === "/reviewerdashboard")&&(<Button 
      onClick={handleCommentSubmit}>Post Comment</Button>)}
      <Button onClick={()=>handleCloseComments(manuscriptId)} style={{marginLeft:"5px", backgroundColor:"gray"}}>Cancel</Button>

      {comments?.map((comment) => (
        <CommentContainer key={comment?.id}>
          <p>{comment?.text}</p>
          {location.pathname==="/authordashboard"&&<ReplyButton onClick={() => setReplyingTo(comment?.id)}>
            Reply
          </ReplyButton>}
          <p style={{fontWeight:"bold",color:"gray",marginTop:"10px",textDecoration:"underline"}}>Replies:</p>

          {replyingTo === comment?.id && (
            <ReplyBox>
              <CommentBox
                rows="2"
                placeholder="Write a reply..."
                value={replyText[comment?.id] || ""}
                onChange={(e) =>
                  setReplyText((prev) => ({
                    ...prev,
                    [comment?.id]: e.target.value,
                  }))
                }
              />
              <Button onClick={() => handleReplySubmit(comment?.id)}>
                Post Reply
              </Button>
            </ReplyBox>
          )}

          {comment?.replies &&
            comment?.replies?.map((reply) => (
              <ReplyBox key={reply?.id}>
                <p>{reply?.text}</p>
              </ReplyBox>
            ))}
        </CommentContainer>
      ))}
    </Container>
  );
};

export default CommentComponent;
