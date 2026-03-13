import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BE_BASE_URL } from "../utils/constants";
import UserCardPreview from "./UserCardPreview";
import Toast from "./Toast";
import { addUser } from "../utils/userSlice";

const Profile = () => {
  const user = useSelector((store) => store.user);
  const [formData, setFormData] = useState(null);
  const [showToast, setShowToast] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user && !formData) {
      setFormData({ ...user });
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

  if (!user || !formData) return <h1>Loading...</h1>;

  return (
    <div className="mt-24 mx-4">
      {showToast && (
        <Toast
          message={showToast.message}
          type={showToast.type}
          onClose={() => setShowToast(null)}
        />
      )}
      <h1 className="text-2xl font-bold text-center mb-8">Edit your profile</h1>
      <div className="flex flex-row gap-10">
        <div className="w-1/2">
          <form
            className="p-10 flex flex-col rounded-md shadow-md border border-red-400"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="flex  mb-4 flex-col">
              <label htmlFor="firstname">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                id="firstname"
                className="w-1/4 p-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 text-sm text-gray-900"
                onChange={handleChange}
              />
            </div>

            <div className="flex  mb-4 flex-col">
              <label htmlFor="firstname">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                id="lastname"
                className="w-1/4 p-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 text-sm text-gray-900"
                onChange={handleChange}
              />
            </div>

            <div className="flex  mb-4 flex-col">
              <label htmlFor="age">Age</label>
              <input
                id="age"
                type="text"
                name="age"
                value={formData.age}
                className="w-1/4 p-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 text-sm text-gray-900"
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col gap-1.5 mb-4">
              <label
                htmlFor="gender"
                className="text-sm font-medium text-gray-700"
              >
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-1/4 p-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 text-sm text-gray-900"
              >
                <option value="" disabled>
                  Select gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="others">Others</option>
              </select>
            </div>

            <div className="flex mb-4 flex-col">
              <label htmlFor="profile">Profile URL</label>
              <input
                id="profile"
                type="text"
                name="profileUrl"
                value={formData.profileUrl ? formData.profileUrl : "profileUrl"}
                className="w-full p-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 text-sm text-gray-900"
                onChange={handleChange}
              />
            </div>

            <div className="flex mb-4 flex-col">
              <label htmlFor="about">About</label>
              <textarea
                id="about"
                type="text"
                name="about"
                value={formData.about}
                className="w-full p-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 text-sm text-gray-900"
                onChange={handleChange}
              />
            </div>

            <div className="flex mb-6 flex-col">
              <label htmlFor="skills">Skills (separate by commas) </label>
              <input
                id="skills"
                type="text"
                name="skills"
                value={formData.skills}
                className="w-full p-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 text-sm text-gray-900"
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className="bg-red-500 text-white px-4 py-2 rounded-md w-1/4 active:scale-[0.95] transition-all cursor-pointer"
              onClick={handleSubmit}
            >
              Save Profile
            </button>
          </form>
        </div>
        <div className="w-1/2">
          <UserCardPreview user={previewData} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
