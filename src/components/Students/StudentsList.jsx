import { useState } from 'react';
import './StudentsList.css'
import { useNavigate } from 'react-router-dom';
import { IoChevronBackOutline } from "react-icons/io5";

function StudentsList() {
  const navigate = useNavigate(); // Initialize useNavigate
  const [studentsDetails, setStudentsDetails] = useState([
    { id: 1, studentName: 'John Doe', class: '10th', admissionNo: 'A101', parentName: 'Sabu', place: 'kozhikode', joiningDate: '2023-08-01' },
    { id: 2, studentName: 'Jane Smith', class: '11th', admissionNo: 'A102', parentName: 'Alex', place: 'feroke', joiningDate: '2023-08-15' },
    { id: 3, studentName: 'Michael Johnson', class: '12th', admissionNo: 'A103', parentName: 'Lijo', place: 'kallai', joiningDate: '2023-09-05' },
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
              <th>Student Name</th>
              <th>Class</th>
              <th>Admission No</th>
              <th>Parent Name</th>
              <th>Place</th>
              <th>Date of Joining</th>
            </tr>
          </thead>
          <tbody>
            {studentsDetails.map(student => (
              <tr key={student.id}>
                <td>{student.studentName}</td>
                <td>{student.class}</td>
                <td>{student.admissionNo}</td>
                <td>{student.parentName}</td>
                <td>{student.place}</td>
                <td>{new Date(student.joiningDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default StudentsList
