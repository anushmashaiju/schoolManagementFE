import React, { useState } from 'react';
import './FeesList.css';
import { useNavigate } from 'react-router-dom';
import { IoChevronBackOutline } from 'react-icons/io5';

function FeesList() {
  const navigate = useNavigate(); // Initialize useNavigate
  const [feesHistory, setFeesHistory] = useState([
    { id: 1, studentName: 'John Doe', class: '10th', admissionNo: 'A101', amountPaid: '$500',  paidDate: '2023-08-01', status: 'Completed' },
    { id: 2, studentName: 'Jane Smith', class: '11th', admissionNo: 'A102', amountPaid: '$450',  paidDate: '2023-08-15', status: 'Pending' },
    { id: 3, studentName: 'Michael Johnson', class: '12th', admissionNo: 'A103', amountPaid: '$550', paidDate: '2023-09-05', status: 'Completed' },
  ]);

  return (
    <div>
      {/* Fee history table */}
      <div className="container">
        <button className="back-button" onClick={() => navigate(-1)}>
          <IoChevronBackOutline />
        </button>
        <h2>Fees History</h2>
        <table className="fees-table">
          <thead>
            <tr>
              <th>Admission No</th>
              <th>Student Name</th>
              <th>Class</th>
              <th>Amount Paid</th>
              <th>Paid Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {feesHistory.map(fee => (
              <tr key={fee.id}>
                <td>{fee.admissionNo}</td>
                <td>{fee.studentName}</td>
                <td>{fee.class}</td>
                <td>{fee.amountPaid}</td>
                <td>{new Date(fee.paidDate).toLocaleDateString()}</td>
                <td>{fee.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FeesList;
