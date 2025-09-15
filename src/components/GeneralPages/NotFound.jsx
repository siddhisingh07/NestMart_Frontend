import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100 text-green px-4">
      <h1 className="text-9xl font-bold text-green">404</h1>
      <h2 className="text-2xl md:text-3xl font-semibold mt-4">
        Oops! Page not found
      </h2>
      <p className="text-gray-600 mt-2 text-center">
        The page you're looking for doesn't exist or has been moved.
      </p>

      <button
        onClick={() => navigate("/")}
        className="mt-6 px-6 py-2 bg-green text-white rounded-lg hover:bg-green transition"
      >
        Go Home
      </button>
    </div>
  );
};

export default NotFound;
