import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import profileImage from "/profile1.png";

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(null);

  const menuItems = ["Edit Profile", "Change Password", "Manage Notification"];

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
          <ChevronUp className="text-[#4D007D]" />
        ) : (
          <ChevronDown className="text-[#4D007D]" />
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute text-base right-0 mt-2 w-[13rem] text-nowrap bg-white shadow-lg rounded-xl p-3">
          <ul className="space-y-2 text-gray-700">
            {menuItems.map((item) => (
              <li
                key={item}
                className={`p-2 rounded cursor-pointer ${
                  activeItem === item
                    ? "text-purple-600 "
                    : "hover:bg-gray-100 hover:rounded-2xl hover:shadow-md"
                }`}
                onClick={() => setActiveItem(item)}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
