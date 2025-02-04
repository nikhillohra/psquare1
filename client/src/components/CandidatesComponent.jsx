import React, { useState, useMemo } from "react";
import { Card } from "../constants/component";
import { ChevronDown, ChevronUp } from "lucide-react";

export const CandidatesComponent = ({ data }) => {
  const [statusMap, setStatusMap] = useState(
    data.reduce((acc, candidate) => {
      acc[candidate.id] = candidate.status;
      return acc;
    }, {})
  );

  const [dropdownOpen, setDropdownOpen] = useState(null);

  const handleStatusChange = (id, newStatus) => {
    setStatusMap((prev) => ({ ...prev, [id]: newStatus }));
    setDropdownOpen(null);
  };

  const toggleDropdown = (id) => {
    setDropdownOpen(dropdownOpen === id ? null : id);
  };

  const candidateRows = useMemo(
    () =>
      data.map((candidate, index) => (
        <tr key={candidate.id} className="border-b">
          <td className="tabCell text-center">{index + 1}</td>
          <td className="tabCell">{candidate.name}</td>
          <td className="tabCell break-all">{candidate.email}</td>
          <td className="tabCell whitespace-nowrap">{candidate.phone}</td>
          <td className="tabCell">{candidate.position}</td>
          <td className="tabCell">
            <div className="relative">
              <button
                className={`border px-3 py-1 w-32 rounded-full text-sm  flex items-center justify-between gap-2 ${
                  statusMap[candidate.id] === "Scheduled"
                    ? "text-yellow-500 border-yellow-500"
                    : statusMap[candidate.id] === "Ongoing"
                    ? "text-green-600 border-green-600"
                    : statusMap[candidate.id] === "Selected"
                    ? "text-purple-700 border-purple-700"
                    : "text-red-500 border-red-500"
                }`}
                onClick={() => toggleDropdown(candidate.id)}
              >
                {statusMap[candidate.id]}
                {dropdownOpen === candidate.id ? (
                  <ChevronUp className="text-black" size={16} />
                ) : (
                  <ChevronDown className="text-black" size={16} />
                )}
              </button>
              {dropdownOpen === candidate.id && (
                <div className="absolute bg-white shadow-lg rounded-lg p-2 mt-1 w-32 z-10">
                  {["Scheduled", "Ongoing", "Selected", "Rejected"].map(
                    (status) => (
                      <div
                        key={status}
                        className="px-3 py-1 cursor-pointer hover:bg-gray-100"
                        onClick={() => handleStatusChange(candidate.id, status)}
                      >
                        {status}
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          </td>
          <td className="tabCell">{candidate.experience}</td>
          <td className="tabCell relative">
            <button onClick={() => toggleDropdown(`action-${candidate.id}`)}>
              <img
                src="/three-dots.svg"
                alt="Options"
                className="w-5 h-5 cursor-pointer"
              />
            </button>
            {dropdownOpen === `action-${candidate.id}` && (
              <div className="absolute right-0 bg-white shadow-lg  text-nowrap rounded-lg p-2 mt-1 w-40 z-10">
                <div className="px-2 py-2 cursor-pointer hover:bg-gray-100 hover:rounded-2xl">
                  Download Resume
                </div>
                <div className="px-3 py-2 cursor-pointer hover:bg-gray-100   hover:rounded-2xl">
                  Delete Candidate
                </div>
              </div>
            )}
          </td>
        </tr>
      )),
    [data, statusMap, dropdownOpen]
  );

  return (
    <Card className="mt-10 max-h-screen overflow-y-visible">
      <table className="w-full text-left rounded-2xl border-collapse">
        <thead className="bg-[#4D007D] text-white text-sm">
          <tr>
            <th className="tabHead text-center">Sr no.</th>
            <th className="tabHead">Candidates Name</th>
            <th className="tabHead">Email Address</th>
            <th className="tabHead">Phone Number</th>
            <th className="tabHead">Position</th>
            <th className="tabHead">Status</th>
            <th className="tabHead">Experience</th>
            <th className="tabHead">Action</th>
          </tr>
        </thead>
        <tbody>{candidateRows}</tbody>
      </table>
    </Card>
  );
};
