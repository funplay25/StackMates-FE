import axios from "axios";
import { BE_BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import Loading from "./Loading";
import UserCardPreview from "./UserCardPreview";
import { Link } from "react-router-dom";

const Connections = () => {
  const [selectedUser, setSelectedUser] = useState(null);
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
    <div className="mt-20 md:mt-24 px-4 pb-16 max-w-3xl mx-auto">
      {selectedUser && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/20"
          onClick={() => setSelectedUser(null)}
        >
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button
              className="absolute -top-3 -right-3 z-10 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center text-slate-500 hover:text-red-500 transition-colors cursor-pointer"
              onClick={() => setSelectedUser(null)}
            >
              ✕
            </button>

            <UserCardPreview user={selectedUser} />
          </div>
        </div>
      )}

      <header className="mb-8 text-center sm:text-left">
        <h1 className="font-black text-2xl md:text-3xl text-slate-800 tracking-tight">
          {connections.length === 0 ? "No Friends Yet" : "Your Connections"}
        </h1>
        <div className="text-slate-500 text-sm mt-1">
          {connections.length > 0 ? (
            <p>
              You have <span className="font-bold">{connections.length}</span>{" "}
              friends in your network
            </p>
          ) : (
            "Time to start swiping!"
          )}
        </div>
      </header>

      <div className="grid grid-cols-1 gap-3">
        {connections.map((user) => (
          <div
            key={user._id}
            className="bg-white p-3.5 md:p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm border border-slate-100 rounded-2xl hover:border-red-100 hover:shadow-md transition-all duration-300 group"
          >
            <div className="flex items-center gap-4 w-full flex-1 min-w-0">
              <div className="relative shrink-0">
                <img
                  src={user.profileUrl}
                  alt={`${user.firstName}'s profile`}
                  className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover object-top ring-2 ring-slate-50 group-hover:ring-red-100 transition-all"
                />
                {/* online status */}
                {/* <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div> */}
              </div>

              <div className="flex flex-col min-w-0">
                <h2 className="font-bold text-slate-800 text-sm md:text-base capitalize group-hover:text-red-500 transition-colors truncate">
                  {user.firstName} {user.lastName}
                </h2>
                <p className="text-slate-500 text-[11px] md:text-xs line-clamp-1 italic pr-4">
                  {user.about || "Building something cool..."}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto mt-1 sm:mt-0">
              <button
                className="flex-1 sm:flex-none px-4 py-2.5 text-[11px] md:text-xs font-bold rounded-xl bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-all cursor-pointer"
                onClick={() => {
                  setSelectedUser(user);
                }}
              >
                Profile
              </button>

              <Link to={`/chat/${user._id}`}>
                <button
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 text-[11px] md:text-xs font-bold rounded-xl bg-red-500 text-white hover:bg-red-600 shadow-sm shadow-red-100 transition-all active:scale-95 cursor-pointer"
                  onClick={() => {
                    /* Open Chat */
                  }}
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
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Connections;
