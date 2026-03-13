import { useEffect } from "react";

const Toast = ({ message, type = "success", onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const isSuccess = type === "success";
  return (
    <div className="fixed top-10 left-[58%] -translate-x-1/2 z-100 animate-bounce-in">
      <div
        className={`
        flex items-center gap-3 px-4 py-3 rounded-2xl shadow-2xl 
        backdrop-blur-md border min-w-75
        ${
          isSuccess
            ? "bg-emerald-50/90 border-emerald-200 text-emerald-900"
            : "bg-rose-50/90 border-rose-200 text-rose-900"
        }
      `}
      >
        <div
          className={`
          flex items-center justify-center w-8 h-8 rounded-full shrink-0
          ${isSuccess ? "bg-emerald-200" : "bg-rose-200"}
        `}
        >
          {isSuccess ? (
            <span className="text-emerald-700 text-sm">✓</span>
          ) : (
            <span className="text-rose-700 text-sm">!</span>
          )}
        </div>

        <p className="grow text-sm font-semibold tracking-wide">{message}</p>
        <button
          onClick={onClose}
          className="p-1 rounded-lg hover:bg-black/5 transition-colors"
        >
          <svg
            className="w-4 h-4 opacity-50"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Toast;
