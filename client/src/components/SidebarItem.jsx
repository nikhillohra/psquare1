export const SidebarItem = ({ label, icon, isActive, onClick }) => (
    <li
      className={`py-2 px-3 flex gap-4 rounded-md cursor-pointer items-center
        ${isActive ? "border-l-[10px] border-purple-800 rounded-r-md    text-purple-800" : "hover:bg-gray-200"}`}
      onClick={onClick}
    >
      <img src={icon} alt="icon" className="w-6 h-6" />
      {label}
    </li>
  );
  