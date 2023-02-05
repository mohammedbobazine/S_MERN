import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uplaodPicture } from "../../actions/user.action";

const UplaodImg = () => {
  const [file, setFile] = useState();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer);
  const handlePicture = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", userData.pseudo);
    data.append("userId", userData._id);
    data.append("file", file);
    dispatch(uplaodPicture(data, userData._id));
  };
  return (
    <form action="" className="uplaod-pic" onSubmit={handlePicture}>
      <label htmlFor="file">Changer d'image</label>
      <input
        type="file"
        name="file"
        id="file"
        accept=".jpg .jpeg .png"
        onChange={(e) => {
          console.log({ tergets: e.target.files[0] });
          setFile(e.target.files[0]);
        }}
      />
      <br />
      <input type="submit" value="Envoyer" />
    </form>
  );
};

export default UplaodImg;