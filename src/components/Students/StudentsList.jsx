import { useState } from 'react';
import './StudentsList.css'
import { useNavigate } from 'react-router-dom';
import { IoChevronBackOutline } from "react-icons/io5";

function StudentsList() {
  const navigate = useNavigate(); // Initialize useNavigate
  const [studentsDetails, setStudentsDetails] = useState([
    { id: 1, admissionNo: 'A101',studentName: 'John Doe', class: '10th',DateOfBirth: '2008-06-05' , parentName: 'Sabu', place: 'kozhikode', contactNo:'9876642532',joiningDate: '2023-08-01' },
    { id: 2, admissionNo: 'A102',studentName: 'Jane Smith', class: '11th',DateOfBirth: '2007-03-01',  parentName: 'Alex', place: 'feroke',contactNo:'9876642532', joiningDate: '2023-08-15' },
    { id: 3,admissionNo: 'A103', studentName: 'Michael Johnson', class: '12th',DateOfBirth: '2006-02-01',  parentName: 'Lijo', place: 'kallai',contactNo:'9872664532', joiningDate: '2023-09-05' },
  ]);
  return (
    <div>

      {/* Student Records Table */}
      <div className="container">
        <button className="back-button" onClick={() => navigate(-1)}>
          <IoChevronBackOutline />
        </button>
        <h2>All Student Details</h2>

        <table className="student-table">
          <thead>
            <tr>
            <th>Admission No</th>
              <th>Student Name</th>
              <th>Class</th>
              <th>Date of Birth</th>
              <th>Parent Name</th>
              <th>Contact No</th>
              <th>Place</th>
              <th>Date of Joining</th>
            </tr>
          </thead>
          <tbody>
            {studentsDetails.map(student => (
              <tr key={student.id}>
                  <td>{student.admissionNo}</td>
                <td>{student.studentName}</td>
                <td>{student.class}</td>
                <td>{new Date(student.dateOfBirth).toLocaleDateString()}</td>
                <td>{student.parentName}</td>
                <td>{student.contactNo}</td>
                <td>{student.place}</td>
                <td>{new Date(student.dateOfJoining).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default StudentsList
