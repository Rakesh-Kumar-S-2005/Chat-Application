export const UserCard = ({username,rollno}) => {
  return (
    <div className="flex items-center gap-3 px-3 py-2 rounded-md
                    hover:bg-green-100 cursor-pointer transition">

      <div className="w-9 h-9 rounded-full bg-gray-200
                      flex items-center justify-center text-sm">
        👤
      </div>

      <div className="flex-1 border-b border-gray-100 pb-2">
        <p className="text-sm font-medium text-gray-800">{username}</p>
        <p className="text-xs text-gray-500">{rollno}</p>
      </div>
    </div>
  );
};
