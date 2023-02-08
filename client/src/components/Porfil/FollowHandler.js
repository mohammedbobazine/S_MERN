import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUser, unfollowUser } from "../../actions/user.action";
import { isEmpty } from "../Utils";

const FollowHandler = (idToFollow) => {
  const userData = useSelector((state) => state.userReducer);
  const [isFollowed, SetIsFollowed] = useState(false);
  const dispatch = useDispatch();

  const handleFollow = () => {
    dispatch(followUser(userData._id, idToFollow));
    SetIsFollowed(true);
  };

  const handleUnFollow = () => {
    dispatch(unfollowUser(userData._id, idToFollow));
    SetIsFollowed(false);
  };

  useEffect(() => {
    if (!isEmpty(userData.following)) {
      if (userData.following.includes(idToFollow.idToFollow)) {
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
          <button className="unfollow-btn">Abonné</button>
        </span>
      )}
      {isFollowed === false && !isEmpty(userData) && (
        <span onClick={handleFollow}>
          <button className="follow-btn">suivre</button>
        </span>
      )}
    </>
  );
};

export default FollowHandler;
