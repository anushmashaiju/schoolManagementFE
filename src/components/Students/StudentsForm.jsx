import { useState } from 'react'
import './StudentsForm.css'

function StudentsForm() {
    const [studentDetails, setStudentDetails] = useState({
        name: '',
        class: '',
        admissionNo: '',
        parentsName: '',
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
        console.log('New Student Details:', studentDetails);
        // Add logic to save the student details
        setStudentDetails({
          name: '',
          class: '',
          admissionNo: '',
          parentsName: '',
          place: '',
          dateOfJoining: ''
        });
      };

  return (
    <div>
       {/* Add Details Form */}
       <div className="student-form-card">
          <h3>Add New Student</h3>
          <form onSubmit={handleFormSubmit}>
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
              <label>Parent Name:</label>
              <input
                type="text"
                name="parentsName"
                value={studentDetails.parentsName}
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
            <button type="submit">Submit</button>
          </form>
        </div>

    </div>
  )
}

export default StudentsForm
