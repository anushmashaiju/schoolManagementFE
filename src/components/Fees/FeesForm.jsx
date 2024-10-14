import React, { useState } from 'react'
import './FeesForm.css'

function FeesForm() {
    const [feesHistory, setFeesHistory] = useState([
        { id: 1, studentName: 'John Doe', class: '10th', admissionNo: 'A101', amountPaid: '$500', amountToBePaid: '$300', paidDate: '2023-08-01' },
        { id: 2, studentName: 'Jane Smith', class: '11th', admissionNo: 'A102', amountPaid: '$450', amountToBePaid: '$250', paidDate: '2023-08-15' },
        { id: 3, studentName: 'Michael Johnson', class: '12th', admissionNo: 'A103', amountPaid: '$550', amountToBePaid: '$350', paidDate: '2023-09-05' },
      ]);
    const handleFeeSubmit = (e) => {
        e.preventDefault();
        const newFeeEntry = {
          id: feesHistory.length + 1,
          studentName: newFee.studentName,
          class: newFee.class,
          admissionNo: newFee.admissionId,
          amountPaid: newFee.amountPaid,
          amountToBePaid: newFee.amountToBePaid,
          paidDate: newFee.paidDate,
        };

        setFeesHistory((prev) => [...prev, newFeeEntry]);
        setNewFee({ studentName: '', class: '', admissionNo: '', amountPaid: '', amountToBePaid: '', paidDate: '' }); // Reset form
      };
    
  const [newFee, setNewFee] = useState({
    studentName: '',
    class: '',
    admissionNo: '',
    amountPaid: '',
    amountToBePaid: '',
    paidDate: ''
  });
 

  const handleFeeChange = (e) => {
    const { name, value } = e.target;
    setNewFee((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      {/* Add Details Form */}
      <div className="fee-form-card">
        <h3>Add Fee Details</h3>
        <form onSubmit={handleFeeSubmit}>
          <div>
            <label>Name of Student:</label>
            <input
              type="text"
              name="studentName" // Corrected the name to match state
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
            <label>Admission No:</label>
            <input
              type="text"
              name="admissionId" // Corrected the name to match state
              value={newFee.admissionId}
              onChange={handleFeeChange}
              required
            />
            </div>
            <div>
              <label>Amount Paid:</label>
              <input
                type="text"
                name="amountPaid"
                value={newFee.amountPaid}
                onChange={handleFeeChange}
                required
              />
            </div>

          <div>
              <label>Amount To Be Paid:</label>
              <input
                type="text"
                name="amountToBePaid"
                value={newFee.amountToBePaid}
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
        </form >
      </div >
    </div>
  )
}

export default FeesForm
