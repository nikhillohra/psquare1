import React, { useState, useMemo } from "react";
import { Card, Button, Input, Select } from "../constants/component.jsx";
import { CandidatesComponent } from "../components/CandidatesComponent";
import { SidebarItem } from "../components/SidebarItem";
import { EmployeesComponent } from "../components/EmployeesComponent";
import { OthersComponent } from "../components/OthersComponent";
import { Modal } from "../components/CandidateModal.jsx";
import { candidates } from "../constants/index.js";

const Dashboard = () => {
  const [selectedSection, setSelectedSection] = useState("Candidates");
  const [isModalOpen, setModalOpen] = useState(false);

  const renderSection = () => {
    switch (selectedSection) {
      case "Candidates":
        return <CandidatesComponent data={candidates} />;
      case "Employees":
        return <EmployeesComponent />;
      case "Others":
        return <OthersComponent />;
      default:
        return <div>Select a section to view content.</div>;
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/4 border-r shadow-md p-4">
        <div className="flex flex-col items-start px-2 py-4">
          <img src="./logo.svg" alt="logo" className="h-8 w-auto" />
          <div className="mt-4">
            <Input placeholder="Search" />
          </div>
        </div>
        <nav className="mt-4 space-y-2">
          <h3 className="px-3 text-base text-gray-500">Recruitment</h3>
          <ul>
            <SidebarItem
              label="Candidates"
              icon="./candidates.svg"
              isActive={selectedSection === "Candidates"}
              onClick={() => setSelectedSection("Candidates")}
            />
          </ul>
          <h3 className="px-3 mt-4 text-base  text-gray-500">Organization</h3>
          <ul>
            <SidebarItem
              label="Employees"
              icon="./employee.svg"
              isActive={selectedSection === "Employees"}
              onClick={() => setSelectedSection("Employees")}
            />
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl">{selectedSection}</h1>
          <div className="flex items-center space-x-2">
            <Input placeholder="Search" className="w-64" />
            {selectedSection === "Candidates" && (
              <button
                className="bg-[#4D007D] text-white px-4 py-2 rounded-3xl"
                onClick={() => setModalOpen(true)}
              >
                Add Candidate
              </button>
            )}
          </div>
        </div>

        <div className="mt-4">{renderSection()}</div>
      </div>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default Dashboard;
