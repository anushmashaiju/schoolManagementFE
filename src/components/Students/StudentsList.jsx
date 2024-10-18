import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IoChevronBackOutline } from "react-icons/io5";
import { FaEdit, FaTrash } from 'react-icons/fa';
import { fetchStudents, deleteStudent } from '../../redux-toolkit/studentSlice';
import './StudentsList.css';

function StudentsList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Selectors to get students and user role
  const { students, isLoading, error } = useSelector((state) => state.students);
  const user = useSelector((state) => state.auth.user); // Get user info from auth state

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      dispatch(deleteStudent(id));
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-student/${id}`);
  };

  return (
    <div>
      <div className="container">
        <button className="back-button" onClick={() => navigate(-1)}>
          <IoChevronBackOutline />
        </button>
        <h2>All Student Details</h2>

        {isLoading && <p>Loading...</p>}
        {error && <p className="error-message">{error}</p>}

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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr key={student._id}>
                <td>{student.admissionNo}</td>
                <td>{student.name}</td>
                <td>{student.class}</td>
                <td>{new Date(student.dateOfBirth).toLocaleDateString()}</td>
                <td>{student.parentName}</td>
                <td>{student.contactNo}</td>
                <td>{student.place}</td>
                <td>{new Date(student.dateOfJoining).toLocaleDateString()}</td>
                <td>
                  {user?.role === 'admin' && ( // Check if user is admin
                    <>
                      <button className="action-button edit-button" onClick={() => handleEdit(student._id)}>
                        <FaEdit />
                      </button>
                      <button className="action-button delete-button" onClick={() => handleDelete(student._id)}>
                        <FaTrash />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StudentsList;
