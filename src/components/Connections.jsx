import axios from "axios";
import { BE_BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import Loading from "./Loading";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BE_BASE_URL + "/user/connections", {
        withCredentials: true,
      });

      dispatch(addConnections(res.data));
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    if (!connections) {
      fetchConnections();
    }
  }, []);

  if (!connections) return <Loading text={"Loading..."} />;

  return (
    <div className="mt-24 px-4">
      <h1 className="font-extrabold text-3xl text-slate-800 text-center mb-8 tracking-tight">
        {connections.length === 0 ? "No Friends Found" : "Friends"}
      </h1>

      {connections.map((user) => {
        return (
          <div
            key={user._id}
            className="mx-auto max-w-2xl bg-white p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm border border-slate-100 rounded-2xl hover:border-red-100 hover:shadow-md transition-all duration-300 mb-3 group"
          >
            <div className="flex items-center gap-4 flex-1 w-full">
              <div className="relative shrink-0">
                <img
                  src={user.profileUrl}
                  alt={`${user.firstName}'s profile`}
                  className="w-14 h-14 rounded-full object-cover object-top ring-2 ring-slate-50 shadow-sm"
                />

                {/* Optional: Online status dot */}
                {/* <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div> */}
              </div>

              <div className="flex flex-col">
                <h2 className="font-bold text-slate-800 text-base capitalize group-hover:text-red-500 transition-colors">
                  {user.firstName} {user.lastName}
                </h2>
                <p className="text-slate-500 text-xs line-clamp-1 italic">
                  {user.about || "No status provided"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                className="flex-1 sm:flex-none px-4 py-2 text-xs font-bold rounded-lg bg-slate-50 text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                onClick={() => /* Navigate to friends profile */ {}}
              >
                View Profile
              </button>

              <button
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2 text-xs font-bold rounded-lg bg-red-500 text-white hover:bg-red-600 shadow-sm shadow-red-100 transition-all active:scale-95 cursor-pointer"
                onClick={() => /* Open Chat Functionality */ {}}
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                Message
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
