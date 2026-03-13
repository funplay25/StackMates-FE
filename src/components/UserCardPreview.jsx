import { useRef } from "react";

const UserCardPreview = ({ user }) => {
  const cardRef = useRef(null);

  if (!user)
    return (
      <div className="text-gray-400 italic">No profile data available</div>
    );

  return (
    <div className="flex items-center flex-col justify-center font-sans p-4">
      <div ref={cardRef} className="relative select-none">
        <div className="w-80 sm:w-92.5 bg-white rounded-[30px] shadow-2xl overflow-hidden border border-gray-100">
          <div className="relative h-96">
            <img
              src={user.profileUrl}
              alt={user.firstName}
              className="w-full h-full object-cover"
            />

            <div className="absolute bottom-0 left-0 right-0 h-40 bg-linear-to-t from-black/90 via-black/40 to-transparent p-6 flex flex-col justify-end">
              <h2 className="text-white text-2xl font-bold">
                {user.firstName || "Name"},{" "}
                <span className="font-light">{user.age || "??"}</span>
              </h2>
              <span className="text-red-400 text-xs font-bold uppercase mt-1 tracking-widest">
                {user.gender || "Not specified"}
              </span>
            </div>
          </div>

          <div className="p-6">
            <h4 className="text-red-500 uppercase text-[10px] font-black tracking-[0.2em] mb-2">
              About
            </h4>
            <p className="text-gray-600 text-sm leading-relaxed mb-6 h-12 line-clamp-2">
              {user.about || "No description provided yet."}
            </p>

            <h4 className="text-red-500 uppercase text-[10px] font-black tracking-[0.2em] mb-2">
              Skills
            </h4>
            <div className="flex flex-wrap gap-2">
              {(user.skills || []).map((skill, i) => (
                <span
                  key={i}
                  className="bg-red-50 text-red-500 px-3 py-1 rounded-full text-[10px] font-bold border border-red-100 uppercase"
                >
                  {skill.trim()}
                </span>
              ))}
            </div>
          </div>
          <div className="h-2 bg-red-500 w-full" />
        </div>
      </div>
    </div>
  );
};

export default UserCardPreview;
