import React, { useState, useMemo } from "react";
import { Card,Button, Input, Select } from "../constants/component";

export const CandidatesComponent = ({ data }) => {
    const candidateRows = useMemo(
      () =>
        data.map((candidate, index) => (
          <tr key={candidate.id} className="border-b">
            <td className="tabCell text-center">{index + 1}</td>
            <td className="tabCell">{candidate.name}</td>
            <td className="tabCell break-all">{candidate.email}</td>
            <td className="tabCell whitespace-nowrap">{candidate.phone}</td>
            <td className="tabCell">{candidate.position}</td>
            <td className="tabCell">{candidate.status}</td>
            <td className="tabCell">{candidate.experience}</td>
            <td className="tabCell">Actions</td>
          </tr>
        )),
      [data]
    );
  
    return (
      <Card className="mt-10 overflow-x-auto">
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