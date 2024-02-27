/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { getDataRequest } from "../../utils/server-request-function/get-data-request";

const ChatHeader = ({ userId }) => {
  const [userData, setUserData] = useState({});
  useEffect(() => {
    try {
      const fetchData = async () => {
        const data = await getDataRequest(`/user/get/one/${userId}`);
        setUserData(data.payload);
      };
      fetchData();
    } catch (error) {
      // console.log(error)
    }
  }, [userId]);
  return (
    <div className="pt-3">
      <div className="flex gap-2 items-center ">
        <img
          src="https://cdn.pixabay.com/photo/2016/06/15/15/25/loudspeaker-1459128__340.png"
          alt="profile"
          //   className="w-10 h-10 rounded-full"
          style={{ width: "50px", height: "50px", borderRadius: "50%" }}
        />
        <div className="text-lg capitalize">
          <span>{userData?.name}</span>
        </div>
      </div>
      <hr
        style={{
          width: "95%",
          border: "0.1px solid #ececec",
          marginTop: "10px",
        }}
      />
    </div>
  );
};

export default ChatHeader;
