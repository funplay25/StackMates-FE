const Loading = ({ text }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-white overflow-hidden p-6">
      <div className="relative flex items-center justify-center scale-90 sm:scale-100 transition-transform">
        <div className="absolute w-20 h-20 bg-red-500 rounded-full animate-radar delay-1"></div>
        <div className="absolute w-20 h-20 bg-red-500 rounded-full animate-radar delay-2"></div>
        <div className="absolute w-20 h-20 bg-red-500 rounded-full animate-radar delay-3"></div>

        <div className="relative z-10 flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-full shadow-2xl border border-slate-50">
          <svg
            className="w-10 h-10 sm:w-12 sm:h-12 text-red-500 animate-heartbeat"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.75 3c1.399 0 2.674.52 3.65 1.382.976-.861 2.251-1.382 3.65-1.382 3.036 0 5.5 2.322 5.5 5.25 0 3.924-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
          </svg>
        </div>
      </div>

      <p className="mt-12 sm:mt-16 text-red-500 text-xs sm:text-sm font-black uppercase tracking-[0.2em] animate-pulse text-center max-w-xs">
        {text}
      </p>
    </div>
  );
};

export default Loading;
