import { useState, useEffect } from "react";
import { FetchCall } from "./FetchCall";

const useUserDetails = () => {
  const [details, setDetails] = useState({});

  useEffect(() => {
    FetchCall("GET", "http://localhost:3030/users", {}).then((data) => {
      console.log(data);
      setDetails(data);
    });
  }, []);
  return { details };
};
export default useUserDetails;
