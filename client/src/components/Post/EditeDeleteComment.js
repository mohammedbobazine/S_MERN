import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteComment, editComment } from "../../actions/post.action";
import { UidContext } from "../Routes/AppContext";

const EditeDeleteComment = ({ comment, postId }) => {
  const [isAuthor, setIsAuthor] = useState(false);
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState("");
  const uid = useContext(UidContext);
  const dispatch = useDispatch();

  useEffect(() => {
    const chekAuthor = () => {
      if (uid === comment.commenterId) {
        setIsAuthor(true);
      }
    };

    chekAuthor();
  }, [uid, comment.commenterId]);
  const handleEdit = (e) => {
    e.preventDefault();
    if (text) {
      dispatch(editComment(postId, comment._id, text));
      setText("");
      setEdit(false);
    }
  };

  const handleDelete = () => {
    dispatch(deleteComment(postId, comment._id));
  };
  return (
    <div className="edit-comment">
      {isAuthor && edit === false && (
        <span onClick={() => setEdit(!edit)}>
          <img src="./img/icons/edit.svg" alt="edit-icon" />
        </span>
      )}
      {isAuthor && edit && (
        <form action="" onSubmit={handleEdit} className="edit-comment-form">
          <label
            htmlFor="text"
            onClick={() => {
              setEdit(!edit);
            }}
          >
            Editer
          </label>
          <br />
          <input
            type="text"
            name="text"
            onChange={(e) => setText(e.target.value)}
            defaultValue={comment.text}
          />
          <br />
          <div className="btn">
            <span
              onClick={() => {
                if (window.confirm("Voulez-vous supprimer ce commentaire ?")) {
                  handleDelete();
                }
              }}
            >
              <img src="./img/icons/trash.svg" alt="delete-icons" />
            </span>

            <input type="submit" value="Valider modifications" />
          </div>
        </form>
      )}
    </div>
  );
};

export default EditeDeleteComment;
