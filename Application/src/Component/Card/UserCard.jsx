export const UserCard = () => {
  return (
    <div className="w-80 h-20 bg-white rounded-full border border-green-100
                    flex items-center px-4 shadow-md hover:shadow-lg shadow-green-300 transition
                    mt-6 mx-auto">
      
      {/* Profile Icon */}
      <div className="w-12 h-12 rounded-full border-2 border-gray-500 
                      flex items-center justify-center mr-4">
        👤
      </div>

      {/* Text */}
      <div className="flex flex-col space-y-1">
        <p className="text-sm font-semibold">Username</p>

        <p className="text-xs text-gray-600">Roll No</p>
      </div>
    </div>
  );
};

