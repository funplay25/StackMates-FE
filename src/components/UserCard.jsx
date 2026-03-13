import { useState, useRef } from "react";

const UserCard = ({ persons }) => {
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
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4 font-sans text-center">
        <div className="bg-white p-8 rounded-3xl shadow-xl">
          <h2 className="text-2xl font-black text-gray-800 mb-2">
            That's everyone!
          </h2>
          <p className="text-gray-500 mb-6">
            Come back later for more profiles.
          </p>
          <button
            onClick={() => setCurrentIndex(0)}
            className="px-8 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-full shadow-lg transition-all active:scale-95"
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
        {/* Draggable Wrapper */}
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
          className={`relative select-none ${isDragging ? "cursor-grabbing" : "cursor-grab"} touch-none`}
        >
          {/* Animated Stamps */}
          <div
            ref={likeStampRef}
            className="absolute top-10 left-8 z-20 text-4xl font-black px-4 py-1 border-[5px] border-green-500 text-green-500 rounded-xl -rotate-20 pointer-events-none opacity-0 transition-opacity duration-100"
          >
            INTERESTED
          </div>
          <div
            ref={nopeStampRef}
            className="absolute top-10 right-8 z-20 text-4xl font-black px-4 py-1 border-[5px] border-red-500 text-red-500 rounded-xl rotate-20 pointer-events-none opacity-0 transition-opacity duration-100"
          >
            IGNORE
          </div>

          {/* Card Body */}
          <div className="w-85 sm:w-92.5 bg-white rounded-[30px] shadow-2xl overflow-hidden border border-gray-100 pointer-events-none">
            {/* Image Section */}
            <div className="relative h-105">
              <img
                src={user.profileUrl}
                alt={user.firstName}
                className="w-full h-full object-cover"
              />
              {/* Gradient Overlay */}
              <div className="absolute bottom-0 left-0 right-0 h-40 bg-linear-to-t from-black/90 via-black/40 to-transparent p-6 flex flex-col justify-end">
                <h2 className="text-white text-3xl font-bold">
                  {user.firstName},{" "}
                  <span className="font-light">{user.age}</span>
                </h2>
                <span className="text-red-400 text-sm font-bold uppercase mt-1 tracking-widest">
                  {user.gender}
                </span>
              </div>
            </div>

            {/* Details Section */}
            <div className="p-6">
              <h4 className="text-red-500 uppercase text-[10px] font-black tracking-[0.2em] mb-2">
                About
              </h4>
              <p className="text-gray-600 text-sm leading-relaxed mb-6 h-12 line-clamp-2">
                {user.about}
              </p>

              <h4 className="text-red-500 uppercase text-[10px] font-black tracking-[0.2em] mb-2">
                Skills
              </h4>
              <div className="flex flex-wrap gap-2">
                {user.skills?.map((skill, i) => (
                  <span
                    key={i}
                    className="bg-red-50 text-red-500 px-3 py-1 rounded-full text-[10px] font-bold border border-red-100 uppercase"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="h-2 bg-red-500 w-full" />
          </div>
        </div>

        {/* Static Footer (Outside the keyed div so it never re-renders) */}
        <div className="mt-12 flex flex-col items-center gap-2 pointer-events-none">
          <div className="flex items-center gap-6">
            <span className="text-sm font-medium text-red-400 animate-pulse">
              ← Ignore
            </span>
            <div className="h-1 w-1 rounded-full bg-gray-300"></div>
            <span className="text-sm font-medium text-green-500 animate-pulse">
              Interested →
            </span>
          </div>
        </div>
      </div>
    )
  );
};

export default UserCard;
