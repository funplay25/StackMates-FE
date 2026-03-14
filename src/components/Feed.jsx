import { useDispatch, useSelector } from "react-redux";
import UserCard from "./UserCard";
import axios from "axios";
import { BE_BASE_URL } from "../utils/constants";
import { addFeed, removeFeed } from "../utils/feedSlice";
import { useEffect } from "react";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  const user = useSelector((store) => store.user);

  const fetchFeed = async () => {
    try {
      const res = await axios.get(BE_BASE_URL + "/feed", {
        withCredentials: true,
      });

      dispatch(addFeed(res.data));
    } catch (err) {
      console.error("error while fetching feed" + err.message);
    }
  };

  useEffect(() => {
    if (!user?._id || !feed) return;
    dispatch(removeFeed());
    fetchFeed();
  }, [user?._id]);

  return (
    <div>
      <UserCard persons={feed} />
    </div>
  );
};

export default Feed;
