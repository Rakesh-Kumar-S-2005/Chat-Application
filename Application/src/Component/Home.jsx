import { useNavigate } from "react-router-dom";
import { UserCard } from "./Card/UserCard";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "./Redux/User/UserSlice";
export const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
   const dispatch = useDispatch();
  const { list, loading, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
console.log("Users List:", list);
  return (
    <div className="h-screen flex flex-col bg-gray-50 ">
      
      {/* Header */}
     
     <header className="w-full py-4 bg-white shadow-md shadow-green-100  flex flex-row justify-between items-center px-6">
       <h1 className="text-3xl font-bold text-gray-800"> Chat<span className="text-green-600">!</span> </h1> 
       <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition " > Logout </button> 
       </header>
      {/* Body */}
      <div className="flex flex-1 overflow-hidden">

        {/* Sidebar */}
        <aside className="w-80 bg-white border-r border-gray-200 
                          overflow-y-auto px-3 py-4 space-y-3 m-2 rounded-lg shadow-lg ">
                            <h1>Your<span className="text-green-600"> Colleagues</span></h1>
          {
            list.map((user) => (
             <UserCard username={user.userName} rollno={user.rollNo} />
            ))
          }
        </aside>

        {/* Chat Area */}
        <main className="flex-1 flex items-center m-2 justify-center bg-gray-100">
          <div className="text-center max-w-md">
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">
              Welcome 👋
            </h2>
            <p className="text-gray-500 text-sm">
              Select a user from the left panel to start chatting
            </p>
          </div>
        </main>

      </div>
    </div>
  );
};
