import axios from "axios";
import isFQDN from "validator/lib/isFQDN";

export const GET_USER = "GET_USER";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";
export const UPDATE_BIO = "UPDATE_BIO";
export const FOLLOW_USER = "FOLLOW_USER";
export const UNFOLLOW_USER = "UNFOLLOW_USER";

export const getUser = (uid) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}/api/user/${uid}`)
      .then((res) => {
        dispatch({ type: GET_USER, payload: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const uplaodPicture = (data, id) => {
  return (dispatch) => {
    return axios
      .post(`${process.env.REACT_APP_API_URL}/api/user/upload`, data)
      .then((res) => {
        return axios
          .get(`${process.env.REACT_APP_API_URL}/api/user/${id}`)
          .then((res) => {
            dispatch({ type: UPLOAD_PICTURE, payload: res.data.picure });
          })
          .catch((err) => {
            console.log({ ERROR_Dans_Le_GET: err });
          });
      })
      .catch((err) => {
        console.log({ ERROR_Dans_UPLOAD: err });
      });
  };
};

export const updateBio = (userId, bio) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}/api/user/${userId}`,
      data: {
        bio,
      },
    })
      .then((res) => {
        dispatch({ type: UPDATE_BIO, payload: bio });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const followUser = (follwerId, idToFollow) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}/api/user/follow/${follwerId}`,
      data: idToFollow,
    }).then((res) => {
      dispatch({ type: FOLLOW_USER, payload: idToFollow }).catch((err) => {
        console.log(err);
      });
    });
  };
};

export const unfollowUser = (follwerId, idToUnFollow) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}/api/user/unfollow/${follwerId}`,
      data: idToUnFollow,
    }).then((res) => {
      dispatch({ type: UNFOLLOW_USER, payload: idToUnFollow }).catch((err) => {
        console.log(err);
      });
    });
  };
};
