import axios from "axios";
import { BE_BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";
import Loading from "./Loading";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BE_BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });

      dispatch(addRequests(res.data));
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleRequestReview = async (status, toUserId) => {
    try {
      const res = await axios.post(
        BE_BASE_URL + "/request/review/" + status + "/" + toUserId,
        {},
        { withCredentials: true },
      );

      dispatch(removeRequest(res.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!requests) {
      fetchRequests();
    }
  }, []);

  if (requests === null) return <Loading text={"Loading..."} />;

  if (requests?.length === 0) {
    return (
      <h1 className="mt-24 text-center font-extrabold text-3xl text-slate-800 mb-8 tracking-tight">
        No friend requests found!
      </h1>
    );
  }

  return (
    <div className="mt-24 px-4">
      <h1 className="font-extrabold text-3xl text-slate-800 text-center mb-8 tracking-tight">
        Friend Requests
      </h1>

      {requests &&
        requests.map((user) => {
          return (
            <div
              className="mx-auto max-w-2xl bg-white p-5 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm border border-slate-100 rounded-2xl hover:shadow-md transition-shadow duration-300 mb-4"
              key={user._id}
            >
              <div className="flex items-center gap-4 flex-1">
                <img
                  src={user?.fromUserId?.profileUrl}
                  alt="Profile Image"
                  className="w-16 h-16 shrink-0 rounded-full object-cover object-top ring-2 ring-slate-50 shadow-sm"
                />
                <div className="flex flex-col">
                  <h2 className="font-bold text-slate-900 text-lg capitalize">
                    {`${user?.fromUserId?.firstName} ${user?.fromUserId?.lastName}`}
                  </h2>
                  <p className="text-slate-500 text-sm line-clamp-1">
                    {user?.fromUserId?.about}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  className="flex-1 sm:flex-none px-5 py-2 text-sm font-semibold rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
                  onClick={() => handleRequestReview("rejected", user._id)}
                >
                  Ignore
                </button>
                <button
                  className="flex-1 sm:flex-none px-5 py-2 text-sm font-semibold rounded-xl bg-red-500 text-white hover:bg-red-600 shadow-sm shadow-red-200 transition-all active:scale-95 cursor-pointer"
                  onClick={() => handleRequestReview("accepted", user._id)}
                >
                  Accept
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Requests;
