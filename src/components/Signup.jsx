import bgImg from "../assets/bg-pic.jpg";

const Signup = () => {
  return (
    <div className="w-full h-screen bg-black/60 overflow-hidden">
      <div class="absolute inset-0 bg-black opacity-20"></div>
      <img
        src={bgImg}
        alt="backround image"
        className="h-screen w-screen object-cover"
      />
      <h1 className="absolute top-[40%] left-[25%] font-extrabold text-6xl text-white">
        Build Friendships, Not Just Code.
      </h1>
      <button className="px-6 py-2 text-[20px] font-semibold text-white bg-red-600 rounded-full cursor-pointer absolute top-[50%] left-[45%]">
        Create Account
      </button>
    </div>
  );
};

export default Signup;
