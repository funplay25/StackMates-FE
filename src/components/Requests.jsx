import axios from "axios";
import { BE_BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";
import Loading from "./Loading";
import { clearConnections } from "../utils/connectionSlice";

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

      dispatch(clearConnections());
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

  return (
    <div className="mt-20 md:mt-24 px-4 pb-16 max-w-3xl mx-auto">
      <header className="mb-8 text-center sm:text-left">
        <h1 className="font-black text-2xl md:text-3xl text-slate-800">
          Friend Requests
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          <span className="font-bold">{requests?.length || 0}</span> people want
          to connect with you
        </p>
      </header>

      <div className="space-y-4">
        {requests && requests.length > 0 ? (
          requests.map((user) => (
            <div
              className="bg-white p-3.5 md:p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm border border-slate-100 rounded-2xl hover:border-red-100 hover:shadow-md transition-all duration-300 group"
              key={user._id}
            >
              <div className="flex items-center gap-4 w-full flex-1">
                <div className="relative shrink-0">
                  <img
                    src={user?.fromUserId?.profileUrl}
                    alt="Profile"
                    className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover object-top ring-2 ring-slate-50 group-hover:ring-red-100 transition-all"
                  />
                  {/* online status */}
                  {/* <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div> */}
                </div>

                <div className="flex flex-col min-w-0">
                  <h2 className="font-bold text-slate-900 text-base md:text-lg capitalize truncate">
                    {`${user?.fromUserId?.firstName} ${user?.fromUserId?.lastName}`}
                  </h2>
                  <p className="text-slate-500 text-xs md:text-sm line-clamp-1 italic">
                    {user?.fromUserId?.about || "No bio provided"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 md:gap-3 w-full sm:w-auto mt-2 sm:mt-0">
                <button
                  className="flex-1 sm:flex-none px-4 md:px-6 py-2.5 text-xs md:text-sm font-bold rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-700 transition-all cursor-pointer active:scale-95"
                  onClick={() => handleRequestReview("rejected", user._id)}
                >
                  Ignore
                </button>
                <button
                  className="flex-1 sm:flex-none px-4 md:px-6 py-2.5 text-xs md:text-sm font-bold rounded-xl bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-100 transition-all active:scale-95 cursor-pointer"
                  onClick={() => handleRequestReview("accepted", user._id)}
                >
                  Accept
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="py-20 text-center">
            <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
              👋
            </div>
            <h3 className="text-slate-800 font-bold">No pending requests</h3>
            <p className="text-slate-500 text-sm">You're all caught up!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Requests;
