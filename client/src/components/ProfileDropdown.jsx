import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react"; // Using Lucide icons for dropdown
import profileImage from "/profile1.png"; // Replace with your actual profile image path

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Profile Icon Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2"
      >
        <img
          src={profileImage}
          alt="Profile"
          className="w-10 h-10 rounded-full border border-gray-300 shadow-sm"
        />
        {isOpen ? (
          <ChevronUp className="text-purple-600" />
        ) : (
          <ChevronDown className="text-purple-600" />
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-[15rem] text-nowrap bg-white shadow-lg rounded-xl p-3">
          <ul className="space-y-2 text-gray-700">
            <li className="hover:bg-gray-100 p-2 rounded cursor-pointer">
              Edit Profile
            </li>
            <li className="hover:bg-gray-100 p-2 rounded cursor-pointer">
              Change Password
            </li>
            <li className="hover:bg-gray-100 p-2 rounded cursor-pointer">
              Manage Notification
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
