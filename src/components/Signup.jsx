import bgImg from "../assets/bg-pic.jpg";

const Signup = () => {
  return (
    <div className="w-screen h-screen bg-black">
      <img
        src={bgImg}
        alt="backround image"
        className="object-cover h-screen opacity-60"
      />
      <h1 className="absolute inset-0 m-auto w-220 h-64 font-extrabold text-5xl">
        Build Friendships, Not Just Code.
      </h1>
    </div>
  );
};

export default Signup;
