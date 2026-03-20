import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import createSocketConnection from "../utils/socket";
import { useSelector } from "react-redux";

const Chat = () => {
  const { targetUserId } = useParams();
  const user = useSelector((store) => store.user);
  const [newMsg, setNewMsg] = useState("");
  const [msgCollection, setMsgCollection] = useState([]);
  const userId = user?._id;
  const scrollRef = useRef();

  useEffect(() => {
    if (!userId) return;
    const socket = createSocketConnection();

    socket.emit("joinChat", {
      firstName: user?.firstName,
      userId,
      targetUserId,
    });

    socket.on("msgReceived", ({ firstName, text }) => {
      setMsgCollection((messages) => [
        ...messages,
        {
          firstName,
          text,
        },
      ]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [msgCollection]);

  const sendMsg = () => {
    const socket = createSocketConnection();

    if (newMsg.trim().length > 0) {
      socket.emit("sendMessage", {
        firstName: user?.firstName,
        userId,
        targetUserId,
        text: newMsg,
      });
    }

    setNewMsg("");
  };

  return (
    <div className="mt-20 md:mt-24 px-4 max-w-4xl mx-auto">
      <header className="mb-8 text-center sm:text-left">
        <h1 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">
          Chat Messages
        </h1>
        <p className="text-slate-500 text-sm">
          Stay connected with your network in real-time.
        </p>
      </header>

      <div className="bg-white flex flex-col h-[calc(100vh-11rem)] md:h-[calc(100vh-13rem)] rounded-3xl shadow-2xl border border-slate-100 overflow-hidden transition-all duration-300">
        <div className="flex-1 overflow-y-auto bg-slate-50/50 p-6 space-y-3">
          {msgCollection.map((msg, i) => {
            return (
              <div key={i}>
                {msg.firstName === user.firstName ? (
                  <div className="flex flex-col gap-1 items-end">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mr-3">
                      You
                    </span>
                    <div className="max-w-[80%] p-4 bg-red-500 text-white rounded-2xl rounded-tr-none shadow-lg shadow-red-200 text-sm font-medium">
                      {msg.text}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-1 items-start">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-3">
                      {msg.firstName}
                    </span>
                    <div className="max-w-[80%] p-4 bg-white border border-slate-100 rounded-2xl rounded-tl-none shadow-sm text-sm text-slate-700">
                      {msg.text}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
          <div ref={scrollRef} />
        </div>

        <div className="p-4 bg-white border-t border-slate-100">
          <form
            onSubmit={(e) => {
              sendMsg();
              e.preventDefault();
            }}
          >
            <div className="flex gap-3 items-center bg-slate-50 p-2 rounded-2xl border border-slate-200 focus-within:ring-2 focus-within:ring-red-500/20 focus-within:border-red-500 transition-all">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 bg-transparent p-2 pl-3 outline-none text-sm text-slate-900 placeholder:text-slate-400"
                value={newMsg}
                onChange={(e) => setNewMsg(e.target.value)}
              />
              <button
                className="bg-red-500 hover:bg-red-600 p-3 rounded-xl shadow-md shadow-red-200 transition-all active:scale-95 group cursor-pointer"
                type="submit"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                >
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
