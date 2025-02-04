import { useState } from "react";

export const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    fullName: "",
    emailAddress: "",
    phoneNumber: "",
    position: "",
    experience: "",
    resume: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      resume: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("fullName", formData.fullName);
    formDataToSend.append("emailAddress", formData.emailAddress);
    formDataToSend.append("phoneNumber", formData.phoneNumber);
    formDataToSend.append("position", formData.position);
    formDataToSend.append("experience", formData.experience);
    if (formData.resume) {
      formDataToSend.append("resume", formData.resume);
    }

    try {
      const response = await fetch("http://localhost:5004/api/form/submit", {
        method: "POST",
        headers: {
            "Content-Type": "application/json", 
          },
          body: JSON.stringify(formDataToSend),  
        });
      console.log(response);

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      alert("Form submitted successfully!");
      setFormData({
        fullName: "",
        emailAddress: "",
        phoneNumber: "",
        position: "",
        experience: "",
        resume: null,
      });
      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="rounded-xl bg-white shadow-lg w-[70%]">
        {/* Header */}
        <div className="bg-[#4D007D] p-3 flex justify-between items-center rounded-t-xl h-14">
          <h2 className="text-xl text-white flex-grow text-center">
            Add New Candidate
          </h2>
          <button onClick={onClose} className="text-gray-100 hover:text-gray-300 text-2xl px-4">
            &times;
          </button>
        </div>

        {/* Form Fields */}
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 p-6">
          {[
            { label: "Full Name", name: "fullName" },
            { label: "Email Address", name: "emailAddress" },
            { label: "Phone Number", name: "phoneNumber" },
            { label: "Position", name: "position" },
            { label: "Experience", name: "experience" },
          ].map(({ label, name }) => (
            <div key={name} className="relative">
              <input
                type="text"
                name={name}
                className="peer border border-[#4D007D] p-3 rounded-xl w-full focus:outline-none placeholder-transparent"
                placeholder={`${label}*`}
                value={formData[name]}
                onChange={handleChange}
                required
              />
              <label
                className="absolute left-3 top-3 bg-white px-1 text-[#121212] transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-slate-800 peer-focus:top-[-10px] peer-focus:text-purple-600 peer-focus:text-sm"
              >
                {label}
                <span className="text-red-500">*</span>
              </label>
            </div>
          ))}

        {/* Resume Upload */}
<div className="relative border border-[#4D007D] p-3 rounded-xl w-full flex items-center justify-between">
  <label htmlFor="resume" className="bg-white px-1 text-[#121212]">
    {formData.resume ? formData.resume.name : "Resume"} <span className="text-red-500">*</span>
  </label>
  <input type="file" id="resume" className="hidden" accept=".pdf" onChange={handleFileChange} />
  <button type="button" onClick={() => document.getElementById("resume").click()} className="flex items-center space-x-2">
    <img src="./upload.svg" alt="Upload" className="w-6 h-6" />
  </button>
</div>

     {/* Declaration Checkbox */}
     <div className="px-6 flex items-center">
        <input type="checkbox" id="declaration" className="mr-2" />
        <label htmlFor="declaration" className="text-gray-500 text-sm">
          I hereby declare that the above information is true to the best of my knowledge and belief.
        </label>
      </div>

          {/* Submit Button */}
          <div className="col-span-2 text-center p-4">
            <button type="submit" className="bg-[#4D007D] text-white px-4 py-2 rounded">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
