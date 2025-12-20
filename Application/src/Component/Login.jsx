import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    rollNo: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate(); // ✅ FIX 1

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.rollNo || !formData.password) {
      setError("All fields are required");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/auth/login",
        formData
      );

      // ✅ FIX 2
      localStorage.setItem("token", response.data);
      console.log("Login successful, token stored.", response.data);
      navigate("/"); // redirect after login
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="w-full py-4 text-center bg-white shadow-md shadow-green-100">
        <h1 className="text-3xl font-bold text-gray-800">
          Chat<span className="text-green-600">!</span>
        </h1>
      </header>

      <div className="flex justify-center items-start mt-16 px-4">
        <div className="bg-white p-8 rounded-xl shadow-lg shadow-green-100 w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                RollNo
              </label>
              <input
                type="text"
                name="rollNo"
                value={formData.rollNo}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            {/* ✅ FIX 3 */}
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
            >
              Login
            </button>
          </form>

          <p className="text-sm text-center text-gray-600 mt-4">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-green-600 font-medium hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
