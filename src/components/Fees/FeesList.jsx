import React, { useState } from 'react'
import './FeesList.css'
import { useNavigate } from 'react-router-dom';
import { IoChevronBackOutline } from 'react-icons/io5';

function FeesList() {
    const navigate = useNavigate(); // Initialize useNavigate
    const [feesHistory, setFeesHistory] = useState([
        { id: 1, studentName: 'John Doe', class: '10th', admissionNo: 'A101', amountPaid: '$500', amountToBePaid: '$300', paidDate: '2023-08-01' },
        { id: 2, studentName: 'Jane Smith', class: '11th', admissionNo: 'A102', amountPaid: '$450', amountToBePaid: '$250', paidDate: '2023-08-15' },
        { id: 3, studentName: 'Michael Johnson', class: '12th', admissionNo: 'A103', amountPaid: '$550', amountToBePaid: '$350', paidDate: '2023-09-05' },
      ]);
  return (
    <div>
        {/* Fee history table */}
        <div className="container" >
        <button className="back-button" onClick={() => navigate(-1)}>
          <IoChevronBackOutline />
        </button>
        <h2>Fees History</h2>
        <table className="fees-table">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Class</th>
              <th>Admission No</th>
              <th>Amount Paid</th>
              <th>Amount To Be Paid</th>
              <th>Paid Date</th>
            </tr>
          </thead>
          <tbody>
            {feesHistory.map(fee => (
              <tr key={fee.id}>
                <td>{fee.studentName}</td>
                <td>{fee.class}</td>
                <td>{fee.admissionNo}</td>
                <td>{fee.amountPaid}</td>
                <td>{fee.amountToBePaid}</td>
                <td>{new Date(fee.paidDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default FeesList
