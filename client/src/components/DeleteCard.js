import React from "react";
import { useDispatch } from "react-redux";
import { deletePost } from "../actions/post.action";

const DeleteCard = (props) => {
  const dispatch = useDispatch();
  const deleteQuote = () => {
    dispatch(deletePost(props.id));
  };
  return (
    <div
      onClick={() => {
        if (window.confirm("Vouliez-vous supprimer ce post ?")) {
          deleteQuote();
        }
      }}
    >
      <img src="./img/icons/trash.svg" alt="delete-post-icon" />
    </div>
  );
};

export default DeleteCard;
