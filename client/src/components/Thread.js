import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../actions/post.action";
import Card from "./Card";
import { isEmpty } from "./Utils";

const Thread = () => {
  const [loadPosts, setLoadPosts] = useState(true);
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.postReducer);
  useEffect(() => {
    if (loadPosts) {
      dispatch(getPosts());

      setLoadPosts(false);
    }
  }, [loadPosts, dispatch]);

  return (
    <div className="thread-container">
      <ul>
        {!isEmpty(posts[0]) &&
          posts.map((post) => {
            return <Card post={post} key={post._id} />;
          })}
      </ul>
    </div>
  );
};

export default Thread;
