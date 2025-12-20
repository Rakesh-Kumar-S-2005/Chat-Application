import { useNavigate } from "react-router-dom";
import { UserCard } from "./Card/UserCard";
export const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="w-full py-4 bg-white shadow-md shadow-green-100 flex justify-between items-center px-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Chat<span className="text-green-600">!</span>
        </h1>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition "
        >
          Logout
        </button>
      </header>

      {/* Main Content */}
      <div className="flex flex-row space-x-4 justify-center items-center mt-20">
        <div className=" bg-white p-10 rounded-xl shadow-lg shadow-green-100 text-center max-w-lg w-full">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Welcome to the Chat<span className="text-green-600">!</span>🎉
          </h2>
          <p className="text-gray-600">
            You are successfully logged in. Start chatting with your friends!
          </p>
         
        </div>
        <div>
          <UserCard />
        </div>
      </div>
    </div>
  );
};
