// CARD
export const Card = ({ children, className }) => (
    <div className={`bg-white shadow-md rounded-2xl  ${className}`}>
      {children}
    </div>
  );


  //BUTTON
 export const Button = ({ children, onClick, className }) => (
    <button
      onClick={onClick}
      className={`px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 ${className}`}
    >
      {children}
    </button>
  );


  //INPUT
  export const Input = ({ placeholder, value, onChange, className }) => (
    <div className="relative">
      <img
        src="./search.svg"
        alt="searchIcon"
        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
      />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`border border-gray-300 rounded-3xl px-10 w-full py-2 placeholder-gray-500 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 ${className}`}
      />
    </div>
  );

  export const Select = ({ options, placeholder, value, onChange, className }) => (
    <select
      value={value}
      onChange={onChange}
      className={`border border-gray-300 rounded px-3 py-2 ${className}`}
    >
      <option value="">{placeholder}</option>
      {options.map((option, idx) => (
        <option key={idx} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
  