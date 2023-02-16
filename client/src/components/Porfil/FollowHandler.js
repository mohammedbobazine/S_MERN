import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUser, unfollowUser } from "../../actions/user.action";
import { isEmpty } from "../Utils";

const FollowHandler = ({ idToFollow, type }) => {
  const userData = useSelector((state) => state.userReducer);
  const [isFollowed, SetIsFollowed] = useState(false);
  const dispatch = useDispatch();

  const handleFollow = () => {
    dispatch(followUser(userData._id, idToFollow));
    SetIsFollowed(true);
  };

  const handleUnFollow = () => {
    const idToUnFollow = idToFollow;

    dispatch(unfollowUser(userData._id, idToUnFollow));
    SetIsFollowed(false);
  };

  useEffect(() => {
    /*console.log(userData.following);
    console.log({ ToFollow: idToFollow });*/

    if (!isEmpty(userData.following)) {
      if (userData.following.includes(idToFollow)) {
        SetIsFollowed(true);
      } else {
        SetIsFollowed(false);
      }
    }
  }, [userData, idToFollow]);
  return (
    <>
      {isFollowed && !isEmpty(userData) && (
        <span onClick={handleUnFollow}>
          {type === "suggestion" && (
            <button className="unfollow-btn">Abonné</button>
          )}
          {type === "card" && (
            <img src="./img/icons/checked.svg" alt="checked" />
          )}
        </span>
      )}
      {isFollowed === false && !isEmpty(userData) && (
        <span onClick={handleFollow}>
          {type === "suggestion" && (
            <button className="follow-btn">suivre</button>
          )}
          {type === "card" && <img src="./img/icons/check.svg" alt="check" />}
        </span>
      )}
    </>
  );
};

export default FollowHandler;
