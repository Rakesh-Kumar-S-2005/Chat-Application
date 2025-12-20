import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export const Register = () => {
  const [formData, setFormData] = useState({
    rollNumber: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await axios.post("http://localhost:8080/auth/register", {
        rollNo: formData.rollNumber,
        userName: formData.username,
        password: formData.password,
      });

      // ✅ redirect to login after successful register
      navigate("/login");
    } catch (err) {
      setError("User already exists or registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="w-full py-4 text-center bg-white shadow-lg shadow-green-100">
        <h1 className="text-3xl font-bold text-gray-800">
          Chat<span className="text-green-600">!</span>
        </h1>
      </header>

      <div className="flex justify-center items-start mt-12 px-4">
        <div className="bg-white p-8 rounded-xl shadow-lg shadow-green-100 w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6">Register</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="rollNumber"
              placeholder="Roll Number"
              value={formData.rollNumber}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
            />

            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
            />

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
            />

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
            >
              Register
            </button>
          </form>

          <p className="text-sm text-center text-gray-600 mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-green-600 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
