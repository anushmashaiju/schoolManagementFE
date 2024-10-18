import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addStudent } from '../../redux-toolkit/studentSlice'; // Import the addStudent action
import './StudentsForm.css';
import { useNavigate } from 'react-router-dom';

function StudentsForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize navigate
  const [isSubmitted, setIsSubmitted] = useState(false);

  const user = useSelector((state) => state.auth.user); // Get user info
  const [studentDetails, setStudentDetails] = useState({
    admissionNo: '',
    name: '',
    class: '',
    dateOfBirth: '',
    parentName: '',
    contactNo: '',
    place: '',
    dateOfJoining: ''
  });

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudentDetails({
      ...studentDetails,
      [name]: value,
    });
  };

  // Function to handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(addStudent(studentDetails)); // Dispatch addStudent action
   //  Show success message and reset form
      setIsSubmitted(true);
      setTimeout(() => {
        navigate('/students'); // After 1 second, navigate to the fee history page
      }, 1000);

    setStudentDetails({
      admissionNo: '',
      name: '',
      class: '',
      dateOfBirth: '',
      parentName: '',
      contactNo: '',
      place: '',
      dateOfJoining: ''
    });
  };

  if (user?.role !== 'admin') {
    return <p>You do not have permission to add students.</p>; // Show permission message
  }

  return (
    <div>
      {/* Add Details Form */}
      <div className="student-form-card">
        <h3>Add New Student Details</h3>
        <form onSubmit={handleFormSubmit}>
          <div>
            <label>Admission No:</label>
            <input
              type="text"
              name="admissionNo"
              value={studentDetails.admissionNo}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Name of Student:</label>
            <input
              type="text"
              name="name"
              value={studentDetails.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Class:</label>
            <input
              type="text"
              name="class"
              value={studentDetails.class}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Date of Birth:</label>
            <input
              type="date"
              name="dateOfBirth"
              value={studentDetails.dateOfBirth}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Name of Parent:</label>
            <input
              type="text"
              name="parentName"
              value={studentDetails.parentName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Contact No:</label>
            <input
              type="text"
              name="contactNo"
              value={studentDetails.contactNo}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Place:</label>
            <input
              type="text"
              name="place"
              value={studentDetails.place}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Date of Joining:</label>
            <input
              type="date"
              name="dateOfJoining"
              value={studentDetails.dateOfJoining}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit">Add Student</button>
        </form>
         {/* Success message */}
         {isSubmitted && <div className="success-message">Book added successfully!</div>}
      </div>
    </div>
  );
}

export default StudentsForm;
