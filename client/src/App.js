import React, { useEffect, useState } from "react";
import { UidContext } from "./components/Routes/AppContext.js";
import Chemins from "./components/Routes/index.js";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getUser } from "./actions/user.action";
const App = () => {
  const [uid, setUid] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchToken = async () => {
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}/jwtid`,
        withCredentials: true,
      })
        .then((res) => {
          console.log(res);
          setUid(res.data);
        })
        .catch((err) => {
          console.log("No Token");
        });
    };
    fetchToken();

    if (uid) {
      dispatch(getUser(uid));
    }
  }, [uid]);
  return (
    <UidContext.Provider value={uid}>
      <Chemins />
    </UidContext.Provider>
  );
};

export default App;
