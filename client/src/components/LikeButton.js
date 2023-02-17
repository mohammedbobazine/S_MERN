import React, { useContext, useEffect, useState } from "react";
import { UidContext } from "../components/Routes/AppContext";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useDispatch } from "react-redux";
import { likePost, unLikePost } from "../actions/post.action";
const LikeButton = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const uid = useContext(UidContext);
  const dispatch = useDispatch();

  const like = () => {
    dispatch(likePost(post._id, uid));

    setLiked(true);
  };

  const unlike = () => {
    dispatch(unLikePost(post._id, uid));

    setLiked(false);
  };

  useEffect(() => {
    if (post.likers.includes(uid)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [uid, post.likers, liked]);

  return (
    <div className="like-container">
      {uid === null && (
        <Popup
          trigger={<img src="./img/icons/heart.svg" alt="like" />}
          position={["bottom center", "bottom right", "bottom left"]}
          closeOnDocumentClick
        >
          <div>Connectez-vous ya hmar !</div>
        </Popup>
      )}
      {uid && liked === false && (
        <img src="./img/icons/heart.svg" alt="like" onClick={like} />
      )}
      {uid && liked && (
        <img src="./img/icons/heart-filled.svg" alt="like" onClick={unlike} />
      )}
      <span>{post.likers.length}</span>
    </div>
  );
};

export default LikeButton;
