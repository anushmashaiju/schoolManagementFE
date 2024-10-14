import React, { useState } from 'react';
import './FeesForm.css';

function FeesForm() {
  const [feesHistory, setFeesHistory] = useState([
    { id: 1, studentName: 'John Doe', class: '10th', admissionNo: 'A101', amountPaid: 500, totalAmountDue: 500, paidDate: '2023-08-01', status: 'Completed' },
    { id: 2, studentName: 'Jane Smith', class: '11th', admissionNo: 'A102', amountPaid: 450, totalAmountDue: 600, paidDate: '2023-08-15', status: 'Pending' },
    { id: 3, studentName: 'Michael Johnson', class: '12th', admissionNo: 'A103', amountPaid: 550, totalAmountDue: 550, paidDate: '2023-09-05', status: 'Completed' },
  ]);

  const [newFee, setNewFee] = useState({
    admissionNo: '',
    studentName: '',
    class: '',
    amountPaid: '',
    totalAmountDue: '',
    paidDate: ''
  });

  const handleFeeChange = (e) => {
    const { name, value } = e.target;
    setNewFee((prev) => ({ ...prev, [name]: value }));
  };

  const handleFeeSubmit = (e) => {
    e.preventDefault();

    // Calculate status based on amountPaid and totalAmountDue (both are numbers)
    const status = Number(newFee.amountPaid) >= Number(newFee.totalAmountDue) ? 'Completed' : 'Pending';

    const newFeeEntry = {
      id: feesHistory.length + 1,
      admissionNo: newFee.admissionNo,
      studentName: newFee.studentName,
      class: newFee.class,
      amountPaid: Number(newFee.amountPaid), // Convert string to number
      totalAmountDue: Number(newFee.totalAmountDue), // Convert string to number
      paidDate: newFee.paidDate,
      status: status // Adding status to the entry
    };

    setFeesHistory((prev) => [...prev, newFeeEntry]);

    // Reset form after submission
    setNewFee({
      admissionNo: '',
      studentName: '',
      class: '',
      amountPaid: '',
      totalAmountDue: '',
      paidDate: ''
    });
  };

  return (
    <div>
      {/* Add Fee Details Form */}
      <div className="fee-form-card">
        <h3>Add Fee Details</h3>
        <form onSubmit={handleFeeSubmit}>
          <div>
            <label>Admission No:</label>
            <input
              type="text"
              name="admissionNo"
              value={newFee.admissionNo}
              onChange={handleFeeChange}
              required
            />
          </div>
          <div>
            <label>Name of Student:</label>
            <input
              type="text"
              name="studentName"
              value={newFee.studentName}
              onChange={handleFeeChange}
              required
            />
          </div>
          <div>
            <label>Class:</label>
            <input
              type="text"
              name="class"
              value={newFee.class}
              onChange={handleFeeChange}
              required
            />
          </div>
          <div>
            <label>Amount Paid:</label>
            <input
              type="number"
              name="amountPaid"
              value={newFee.amountPaid}
              onChange={handleFeeChange}
              required
            />
          </div>
          <div>
            <label>Total Amount Due:</label>
            <input
              type="number"
              name="totalAmountDue"
              value={newFee.totalAmountDue}
              onChange={handleFeeChange}
              required
            />
          </div>
          <div>
            <label>Paid Date:</label>
            <input
              type="date"
              name="paidDate"
              value={newFee.paidDate}
              onChange={handleFeeChange}
              required
            />
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>

      {/* Display Fee History */}
      <div className="fee-history">
        <h3>Fees History</h3>
        <table>
          <thead>
            <tr>
              <th>Admission No</th>
              <th>Student Name</th>
              <th>Class</th>
              <th>Amount Paid</th>
              <th>Total Amount Due</th>
              <th>Paid Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {feesHistory.map((fee) => (
              <tr key={fee.id}>
                <td>{fee.admissionNo}</td>
                <td>{fee.studentName}</td>
                <td>{fee.class}</td>
                <td>{fee.amountPaid}</td>
                <td>{fee.totalAmountDue}</td>
                <td>{fee.paidDate}</td>
                <td>{fee.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FeesForm;
