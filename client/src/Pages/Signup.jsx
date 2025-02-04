import React, { useState } from "react";
import { Link } from "react-router-dom";
import { slides } from "../constants";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Password validation
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
  
    const { fullName, email, password, confirmPassword } = formData;
    const userData = { fullName, email, password, confirmPassword };
    console.log("Sending Data:", userData);  // 🔍 Debugging log
  
    try {
      const response = await fetch("http://localhost:5004/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
  
      const data = await response.json();
      console.log("Response Data:", data);  // 🔍 Debugging log
  
      if (!response.ok) throw new Error(data.message || "Registration failed");
  
      // Success Toast after registration
      toast.success("Registration successful!");
  
    } catch (error) {
      console.error("Error:", error.message);
      toast.error(error.message || "Registration failed.");
    }
  };
  

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      {/* Logo */}
      <header className="w-full flex items-center justify-center mb-20 mt-10">
        <img src="./logo.svg" alt="logo" className="h-10 w-auto" />
      </header>

      {/* Content */}
      <section className="grid sm:grid-cols-2 items-center justify-center w-[90%] shadow-xl border rounded-2xl overflow-hidden">
        {/* Left Section */}
        <div className="bg-[#4D007D] h-full flex flex-col items-center justify-center sm:p-20 p-4 text-white w-full">
          {/* Slider Image */}
          <div className="h-full flex items-center justify-center w-full">
            <img
              src={slides[currentSlide].src}
              alt={slides[currentSlide].alt}
              className="shadow-md w-[90%] h-[80%] object-cover transition duration-300 rounded-2xl"
            />
          </div>

          {/* Slider Text */}
          <div className="text-center mt-5">
            <h1 className="text-2xl">{slides[currentSlide].heading}</h1>
            <p className="mt-2 text-sm font-light">
              {slides[currentSlide].description}
            </p>
          </div>

          {/* Slider Dots */}
          <div className="flex justify-center mt-10 gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition duration-300 ${
                  currentSlide === index ? "bg-white" : "bg-gray-400"
                }`}
              ></button>
            ))}
          </div>
        </div>

        {/* Right Section */}
        <div className="p-8 md:p-14 flex flex-col justify-center">
          <h2 className="text-2xl font-normal mb-5">Welcome to Dashboard</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Full Name<span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Full name"
                className="mt-1 w-full p-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Email Address<span className="text-red-600">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="mt-1 w-full p-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Password<span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="mt-1 w-full p-2 border rounded-md pr-10"
                  required
                />
                <img
                  src={showPassword ? "./eye_off.svg" : "./eye.svg"}
                  alt="toggle password visibility"
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Confirm Password<span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  className="mt-1 w-full p-2 border rounded-md pr-10"
                  required
                />
                <img
                  src={showConfirmPassword ? "./eye_off.svg" : "./eye.svg"}
                  alt="toggle confirm password visibility"
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-[8rem] sm:w-[10rem] px-1 py-2 bg-[#4D007D] text-white rounded-3xl hover:bg-[#360058] transition duration-300"
            >
              Register
            </button>
          </form>
          <p className="mt-4 text-sm text-start">
            Already have an account?{" "}
            <Link to="/login" className="text-[#4D007D] ">
              Login
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default Signup;
