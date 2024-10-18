import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addFee } from '../../redux-toolkit/feeSlice'; // Action to add fee
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './FeesForm.css';

function FeesForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize navigate
  const [isSubmitted, setIsSubmitted] = useState(false); // State for success message

  // State to store form input values
  const [newFee, setNewFee] = useState({
    admissionNo: '',
    studentName: '',
    class: '',
    amountPaid: '',
    paidDate: ''
  });

  // Function to handle input changes
  const handleFeeChange = (e) => {
    const { name, value } = e.target;
    setNewFee((prev) => ({ ...prev, [name]: value }));

    // Fetch student data when admission number changes
    if (name === 'admissionNo' && value) {
      fetchStudentData(value);
    }
  };

  // Fetch student data based on admission number
  const fetchStudentData = async (admissionNo) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/student/admission/${admissionNo}`);
      if (response.data) {
        setNewFee((prev) => ({
          ...prev,
          studentName: response.data.name,
          class: response.data.class,
        }));
      }
    } catch (error) {
      console.error('Error fetching student data:', error);
      setNewFee((prev) => ({
        ...prev,
        studentName: '',
        class: '',
      }));
    }
  };

  const handleFeeSubmit = async (e) => {
    e.preventDefault();

    const totalAmountDue = 1000; // Replace with actual logic to get the due amount
    const status = Number(newFee.amountPaid) >= Number(totalAmountDue) ? 'Completed' : 'Pending';

    try {
        // Fetch the student data based on the admission number (if not already fetched)
        const response = await axios.get(`http://localhost:8000/api/v1/student/admission/${newFee.admissionNo}`);
        const student = response.data; // The student data including _id, name, class, and admissionNo

        // Ensure that the student _id is available
        if (!student._id) {
            throw new Error('Student not found');
        }

        // Create the fee entry object with correct student ObjectId and student details
        const newFeeEntry = {
            student: student._id,         // Use the student's ObjectId here
            feesType: newFee.feesType,     // Correct field mapping for feesType
            paymentDate: newFee.paidDate,  // Correct field mapping for paymentDate
            amount: Number(newFee.amountPaid), // Ensure amount is a number
            status: status,                // Set status as 'Completed' or 'Pending'
            
            // Add student details
            studentDetails: {
                name: student.name,         // Populate student's name
                class: student.class,       // Populate student's class
                admissionNo: student.admissionNo // Populate student's admissionNo
            }
        };

        // Dispatch an action to add the fee entry to the backend via Redux
        dispatch(addFee(newFeeEntry));

        // Show success message
        setIsSubmitted(true);

        // After 1 seconds, navigate to the fee history page
        setTimeout(() => {
            navigate('/fees');
        }, 1000); // Wait for 1 seconds before navigating
    } catch (error) {
        console.error('Error submitting fee form:', error);
    }
};

  return (
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
            readOnly // Make it read-only as it will be filled automatically
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
            readOnly // Make it read-only as it will be filled automatically
          />
        </div>
        <div>
          <label>Fees Type:</label>
          <select
            name="feesType"
            value={newFee.feesType}
            onChange={handleFeeChange}
            required
          >
            <option value="">Select Fee Type</option>
            <option value="Tuition Fee">Tuition Fee</option>
            <option value="Admission Fee">Admission Fee</option>
            <option value="Book Fee">Book Fee</option>
            <option value="Other Fee">Other Fee</option>
          </select>
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
          <label>Paid Date:</label>
          <input
            type="date"
            name="paidDate"
            value={newFee.paidDate}
            onChange={handleFeeChange}
            required
          />
        </div>
        <div>
          <label>Fee Status:</label>
          <select
            name="status"
            value={newFee.status}
            onChange={handleFeeChange}
            required
          >
            <option value="">Select Status</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
          </select>
        </div>

        <button type="submit">Submit</button>
      </form>
      {/* Show success message if form is submitted */}
      {isSubmitted && <div className="success-message">Payment Successful!</div>}
    </div>
  );
}

export default FeesForm;
