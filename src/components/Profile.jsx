import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BE_BASE_URL } from "../utils/constants";
import UserCardPreview from "./UserCardPreview";
import Toast from "./Toast";
import { addUser } from "../utils/userSlice";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const user = useSelector((store) => store.user);
  const [formData, setFormData] = useState(null);
  const [showToast, setShowToast] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && !formData) {
      setFormData({
        ...user,
        skills: Array.isArray(user.skills)
          ? user.skills.join(", ")
          : user.skills || "",
      });
    }
  }, [user, formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const { firstName, lastName, age, gender, about, profileUrl, skills } =
      formData;

    try {
      const skillString =
        typeof skills === "object" ? Object.values(skills)[0] : skills;
      const skillsArray = skillString
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s !== "");

      const res = await axios.patch(
        BE_BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          age,
          gender,
          about,
          profileUrl,
          skills: skillsArray,
        },
        { withCredentials: true },
      );

      dispatch(addUser(res.data));

      setShowToast({ message: "Profile updated", type: "success" });
      navigate("/");
    } catch (err) {
      setShowToast({ message: "Couldn't update profile", type: "error" });
    }
  };

  const previewData = {
    ...formData,
    skills:
      typeof formData?.skills === "string"
        ? formData.skills
            .split(",")
            .map((s) => s.trim())
            .filter((s) => s !== "")
        : formData?.skills || [],
  };

  if (!user || !formData) {
    return <Loading text={"Searching for friends..."} />;
  }

  return (
    <div className="mt-20 md:mt-24 mx-auto max-w-7xl px-4 md:px-6">
      {showToast && (
        <Toast
          message={showToast.message}
          type={showToast.type}
          onClose={() => setShowToast(null)}
        />
      )}

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
        <div className="w-full lg:w-3/5 order-2 lg:order-1">
          <form
            className="bg-white p-6 sm:p-10 flex flex-col rounded-3xl shadow-2xl border border-slate-100 transition-all duration-300 mb-4"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="mb-8 text-center sm:text-left">
              <h2 className="text-2xl font-black text-slate-800">
                Edit Profile
              </h2>
              <p className="text-slate-500 text-sm">
                Update your information to stand out.
              </p>
            </div>

            {/* Name Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="firstname"
                  className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1"
                >
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  id="firstname"
                  placeholder="John"
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all text-sm text-slate-900"
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="lastname"
                  className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  id="lastname"
                  placeholder="Doe"
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all text-sm text-slate-900"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="age"
                  className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1"
                >
                  Age
                </label>
                <input
                  id="age"
                  type="number"
                  name="age"
                  value={formData.age || ""}
                  placeholder="24"
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all text-sm text-slate-900"
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="gender"
                  className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1"
                >
                  Gender
                </label>
                <div className="relative">
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all text-sm text-slate-900 appearance-none cursor-pointer"
                  >
                    <option disabled>Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="others">Others</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 mb-6">
              <label
                htmlFor="profile"
                className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1"
              >
                Profile Image URL
              </label>
              <input
                id="profile"
                type="text"
                name="profileUrl"
                value={formData.profileUrl}
                placeholder="https://example.com/photo.jpg"
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all text-sm text-slate-900"
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col gap-2 mb-6">
              <label
                htmlFor="about"
                className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1"
              >
                About Me
              </label>
              <textarea
                id="about"
                name="about"
                rows="3"
                value={formData.about}
                placeholder="Tell us something interesting..."
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all text-sm text-slate-900 resize-none"
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col gap-2 mb-8">
              <label
                htmlFor="skills"
                className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1"
              >
                Skills{" "}
                <span className="text-slate-300 font-normal">
                  (Comma separated)
                </span>
              </label>
              <input
                id="skills"
                type="text"
                name="skills"
                value={formData.skills}
                placeholder="React, Node.js, Tailwind..."
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all text-sm text-slate-900"
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className="w-full sm:w-max sm:px-12 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-full shadow-lg shadow-red-200 transition-all active:scale-95 self-center sm:self-start cursor-pointer"
              onClick={handleSubmit}
            >
              Save Changes
            </button>
          </form>
        </div>

        <div className="w-full lg:w-2/5 order-1 lg:order-2 lg:sticky lg:top-24">
          <div className="mb-4 lg:hidden">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">
              Live Preview
            </p>
          </div>
          <UserCardPreview user={previewData} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
