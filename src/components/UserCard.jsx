import axios from "axios";
import { useState, useRef } from "react";
import { BE_BASE_URL } from "../utils/constants";

const UserCard = ({ persons, onLoadMore }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  // isDragging is kept in state only to toggle transitions/cursors globally
  const [isDragging, setIsDragging] = useState(false);

  // High-performance Refs: These do NOT trigger re-renders when updated
  const cardRef = useRef(null);
  const likeStampRef = useRef(null);
  const nopeStampRef = useRef(null);
  const xPos = useRef(0);
  const startX = useRef(0);

  const threshold = 120;

  // Handling the swipe right or left output
  const handleSwipeOutput = async (status, toUserId) => {
    try {
      await axios.post(
        BE_BASE_URL + "/request/" + status + "/" + toUserId,
        {},
        { withCredentials: true },
      );
    } catch (err) {
      console.log(err.message);
    }
  };

  // Handlers
  const onStart = (e) => {
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    startX.current = x;
    setIsDragging(true);

    // Remove transitions while dragging for instant response
    if (cardRef.current) {
      cardRef.current.style.transition = "none";
    }
  };

  const onMove = (e) => {
    if (!startX.current) return;

    const x = e.touches ? e.touches[0].clientX : e.clientX;
    const diff = x - startX.current;
    xPos.current = diff;

    // 1. Update Card Transform (GPU Accelerated)
    if (cardRef.current) {
      cardRef.current.style.transform = `translateX(${diff}px) rotate(${diff * 0.07}deg)`;
    }

    // 2. Update Stamp Opacities directly via DOM
    if (likeStampRef.current) {
      likeStampRef.current.style.opacity =
        diff > 50 ? Math.min(diff / 150, 1) : 0;
    }
    if (nopeStampRef.current) {
      nopeStampRef.current.style.opacity =
        diff < -50 ? Math.min(Math.abs(diff) / 150, 1) : 0;
    }
  };

  const onEnd = () => {
    if (!startX.current) return;

    const finalX = xPos.current;
    startX.current = 0;
    setIsDragging(false);

    // Re-enable transition for the "snap" or "fly away"
    if (cardRef.current) {
      cardRef.current.style.transition =
        "transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
    }

    if (Math.abs(finalX) > threshold) {
      const flyDistance = finalX > 0 ? 1000 : -1000;

      const currentUser = persons[currentIndex];
      // Logic to apply when you want the info of if user swiped right or left
      if (finalX > 0) {
        handleSwipeOutput("interested", currentUser._id);
      } else {
        handleSwipeOutput("ignored", currentUser._id);
      }

      // Fly off screen
      if (cardRef.current) {
        cardRef.current.style.transform = `translateX(${flyDistance}px) rotate(${flyDistance * 0.05}deg)`;
      }

      // Wait for animation, then change user
      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
        xPos.current = 0;
      }, 300);
    } else {
      // Snap back to center
      if (cardRef.current) {
        cardRef.current.style.transform = `translateX(0px) rotate(0deg)`;
      }
      // Hide stamps
      if (likeStampRef.current) likeStampRef.current.style.opacity = 0;
      if (nopeStampRef.current) nopeStampRef.current.style.opacity = 0;
    }
  };

  // Empty state check
  if (!persons || currentIndex >= persons.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6 font-sans text-center">
        <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl max-w-sm w-full transition-all">
          <div className="text-5xl mb-4">🎉</div>
          <h2 className="text-2xl font-black text-gray-800 mb-2">
            That's everyone!
          </h2>
          <p className="text-gray-500 mb-8 text-sm">
            You've seen all the stacks for now. Come back later for fresh
            profiles.
          </p>
          <button
            onClick={onLoadMore}
            className="w-full py-4 bg-red-500 hover:bg-red-600 text-white font-bold rounded-2xl shadow-lg shadow-red-200 transition-all active:scale-95 cursor-pointer"
          >
            Find more
          </button>
        </div>
      </div>
    );
  }

  const user = persons[currentIndex];

  return (
    user && (
      <div className="flex items-center flex-col justify-center min-h-screen bg-gray-50 font-sans p-4 overflow-hidden">
        <div
          key={currentIndex}
          ref={cardRef}
          onMouseDown={onStart}
          onMouseMove={onMove}
          onMouseUp={onEnd}
          onMouseLeave={onEnd}
          onTouchStart={onStart}
          onTouchMove={onMove}
          onTouchEnd={onEnd}
          className={`relative select-none ${isDragging ? "cursor-grabbing" : "cursor-grab"} touch-none transition-transform duration-75`}
        >
          <div
            ref={likeStampRef}
            className="absolute top-12 left-6 z-20 text-2xl md:text-4xl font-black px-4 py-1 border-4 md:border-[5px] border-green-500 text-green-500 rounded-xl -rotate-20 pointer-events-none opacity-0 whitespace-nowrap"
          >
            INTERESTED
          </div>
          <div
            ref={nopeStampRef}
            className="absolute top-12 right-6 z-20 text-2xl md:text-4xl font-black px-4 py-1 border-4 md:border-[5px] border-red-500 text-red-500 rounded-xl rotate-20 pointer-events-none opacity-0 whitespace-nowrap"
          >
            IGNORE
          </div>

          <div className="w-[88vw] max-w-95 bg-white rounded-[30px] md:rounded-[40px] shadow-2xl overflow-hidden border border-gray-100 pointer-events-none flex flex-col">
            <div className="relative h-[45vh] md:h-125 min-h-87.5">
              <img
                src={user.profileUrl}
                alt={user.firstName}
                className="w-full h-full object-cover"
              />

              <div className="absolute bottom-0 left-0 right-0 h-48 bg-linear-to-t from-black/90 via-black/40 to-transparent p-6 md:p-8 flex flex-col justify-end">
                <h2 className="text-white text-2xl md:text-3xl font-bold">
                  {user.firstName},{" "}
                  <span className="font-light">{user.age}</span>
                </h2>
                <span className="text-red-400 text-xs md:text-sm font-black uppercase mt-1 tracking-[0.2em]">
                  {user.gender}
                </span>
              </div>
            </div>

            <div className="p-5 md:p-8 bg-white">
              <h4 className="text-red-500 uppercase text-[9px] md:text-[10px] font-black tracking-[0.2em] mb-2 opacity-70">
                About
              </h4>
              <p className="text-gray-600 text-sm leading-relaxed mb-5 h-10 line-clamp-2">
                {user.about}
              </p>

              <h4 className="text-red-500 uppercase text-[9px] md:text-[10px] font-black tracking-[0.2em] mb-2 opacity-70">
                Top Skills
              </h4>
              <div className="flex flex-wrap gap-1.5 md:gap-2">
                {user.skills?.map((skill, i) => (
                  <span
                    key={i}
                    className="bg-red-50 text-red-500 px-3 py-1 rounded-lg text-[10px] font-bold border border-red-100/50 uppercase tracking-tighter"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="h-1.5 md:h-2 bg-red-500 w-full" />
          </div>
        </div>

        <div className="mt-8 md:mt-12 hidden xs:flex flex-col items-center gap-2 pointer-events-none select-none">
          <div className="flex items-center gap-6">
            <span className="text-[11px] md:text-sm font-bold text-gray-300 uppercase tracking-widest">
              Swipe left to skip
            </span>
            <div className="h-1.5 w-1.5 rounded-full bg-red-500"></div>
            <span className="text-[11px] md:text-sm font-bold text-red-500 uppercase tracking-widest">
              Swipe right to connect
            </span>
          </div>
        </div>
      </div>
    )
  );
};

export default UserCard;
