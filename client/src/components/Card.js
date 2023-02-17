import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dateParser, isEmpty } from "./Utils";
import FollowHandler from "./Porfil/FollowHandler";
import LikeButton from "./LikeButton";
import { updatePost } from "../actions/post.action";
import DeleteCard from "./DeleteCard";

const Card = ({ post }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdate, setisUpdate] = useState(false);
  const [textupdate, SetTextUpdate] = useState(null);

  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);

  const dispatch = useDispatch();

  const updateItem = () => {
    if (textupdate) {
      dispatch(updatePost(post._id, textupdate));
    }
    setisUpdate(false);
  };

  useEffect(() => {
    !isEmpty(usersData[0]) && setIsLoading(false);
  }, [usersData]);
  return (
    <li className="card-container" key={post._id}>
      {isLoading ? (
        <i className="fas fa-spinner fa-spin"></i>
      ) : (
        <>
          <div className="card-left">
            <img
              src={
                !isEmpty(usersData[0]) &&
                usersData
                  .map((user) => {
                    if (user._id === post.posterId) {
                      //console.log(user.picure);
                      return user.picure;
                    } else {
                      return null;
                    }
                  })
                  .join("")
              }
              alt="poster-pic"
            />
          </div>
          <div className="card-right">
            <div className="card-header">
              <div className="pseudo">
                <h3>
                  {!isEmpty(usersData[0]) &&
                    usersData
                      .map((user) => {
                        if (user._id === post.posterId) {
                          return user.pseudo;
                        } else {
                          return null;
                        }
                      })
                      .join("")}
                </h3>{" "}
                {userData._id !== post.posterId && (
                  <FollowHandler idToFollow={post.posterId} type={"card"} />
                )}
              </div>
              <span>{dateParser(post.createdAt)}</span>
            </div>
            {isUpdate === false && <p>{post.message}</p>}
            {isUpdate && (
              <div className="update-post">
                <textarea
                  defaultValue={post.message}
                  onChange={(e) => SetTextUpdate(e.target.value)}
                />
                <div className="button-container">
                  <button className="btn" onClick={updateItem}>
                    Valider Modification
                  </button>
                </div>
              </div>
            )}

            {post.picture && (
              <img className="card-pic" src={post.picture} alt="card-pic" />
            )}
            {post.video && (
              <iframe
                width="500"
                height="300"
                src={post.video}
                frameBorder="0"
                allow="acceleromter; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="post._id"
              ></iframe>
            )}

            {post.posterId === userData._id && (
              <div className="button-container">
                <div onClick={() => setisUpdate(!isUpdate)}>
                  <img src="./img/icons/edit.svg" alt="edit-message" />
                </div>
                <DeleteCard id={post._id} />
              </div>
            )}
            <div className="card-footer">
              <div className="comment-icon">
                <img src="./img/icons/message1.svg" alt="comment" />
                <span>{post.comments.length}</span>
              </div>
              <LikeButton post={post} />
              <img src="./img/icons/share.svg" alt="" />
            </div>
          </div>
        </>
      )}
    </li>
  );
};

export default Card;
