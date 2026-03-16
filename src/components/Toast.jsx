import { useEffect } from "react";

const Toast = ({ message, type = "success", onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const typeStyles = {
    success: "bg-emerald-500 border-emerald-600",
    error: "bg-red-500 border-red-600",
  };

  return (
    <div className="fixed top-22 right-4 left-4 sm:left-auto sm:w-auto flex justify-center sm:justify-end z-50">
      <div
        className={`flex items-center gap-3 px-5 py-3 text-white border shadow-lg rounded-xl backdrop-blur-md
        animate-[toastSlide_0.35s_ease]
        ${typeStyles[type]}`}
      >
        <span className="text-sm sm:text-base font-medium">{message}</span>
      </div>
    </div>
  );
};

export default Toast;
