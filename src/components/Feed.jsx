import { useDispatch, useSelector } from "react-redux";
import UserCard from "./UserCard";
import axios from "axios";
import { BE_BASE_URL } from "../utils/constants";
import { addFeed, incrementPage, removeFeed } from "../utils/feedSlice";
import { useEffect } from "react";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed.data);
  const page = useSelector((store) => store.feed.page);
  const user = useSelector((store) => store.user);

  const fetchFeed = async (pageNum) => {
    try {
      const res = await axios.get(`${BE_BASE_URL}/feed?${pageNum}&limit=10`, {
        withCredentials: true,
      });

      dispatch(addFeed(res.data));
    } catch (err) {
      console.error("error while fetching feed " + err.message);
    }
  };

  useEffect(() => {
    if (!user?._id) return;
    dispatch(removeFeed());
    fetchFeed(1);
  }, [user?._id]);

  useEffect(() => {
    if (!user?._id || page === 1) return;
    fetchFeed(page);
  }, [page]);

  const handleLoadMore = () => {
    if (feed.length === 0) return;
    dispatch(incrementPage());
  };

  return (
    <div>
      <UserCard persons={feed} onLoadMore={handleLoadMore} />
    </div>
  );
};

export default Feed;
