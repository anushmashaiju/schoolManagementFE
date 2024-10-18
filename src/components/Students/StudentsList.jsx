import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IoChevronBackOutline } from "react-icons/io5";
import { FaEdit, FaTrash, FaSave, FaTimes } from 'react-icons/fa';
import { fetchStudents, deleteStudent, updateStudent } from '../../redux-toolkit/studentSlice';
import './StudentsList.css';

function StudentsList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { students = [], isLoading, error } = useSelector((state) => state.students); // Default to empty array if undefined
    const user = useSelector((state) => state.auth.user);

    const [editingId, setEditingId] = useState(null);
    const [editFormData, setEditFormData] = useState({});

    useEffect(() => {
        dispatch(fetchStudents());
    }, [dispatch]);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this student?")) {
            dispatch(deleteStudent(id));
        }
    };

    const handleEditClick = (student) => {
        setEditingId(student._id);
        setEditFormData({ ...student });
    };

    const handleCancelEdit = () => {
        setEditingId(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSave = (id) => {
        dispatch(updateStudent({ id, studentData: editFormData })).then(() => {
            setEditingId(null);
        });
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
                        {students.length > 0 ? (
                            students.map(student => (
                                student ? ( // Check if student is defined
                                    <tr key={student._id}>
                                        {editingId === student._id ? (
                                            <>
                                                <td>
                                                    <input
                                                        type="text"
                                                        name="admissionNo"
                                                        value={editFormData.admissionNo}
                                                        onChange={handleInputChange}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        value={editFormData.name}
                                                        onChange={handleInputChange}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        name="class"
                                                        value={editFormData.class}
                                                        onChange={handleInputChange}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="date"
                                                        name="dateOfBirth"
                                                        value={editFormData.dateOfBirth}
                                                        onChange={handleInputChange}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        name="parentName"
                                                        value={editFormData.parentName}
                                                        onChange={handleInputChange}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        name="contactNo"
                                                        value={editFormData.contactNo}
                                                        onChange={handleInputChange}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        name="place"
                                                        value={editFormData.place}
                                                        onChange={handleInputChange}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="date"
                                                        name="dateOfJoining"
                                                        value={editFormData.dateOfJoining}
                                                        onChange={handleInputChange}
                                                    />
                                                </td>
                                                <td>
                                                    <button className="action-button save-button" onClick={() => handleSave(student._id)}>
                                                        <FaSave />
                                                    </button>
                                                    <button className="action-button cancel-button" onClick={handleCancelEdit}>
                                                        <FaTimes />
                                                    </button>
                                                </td>
                                            </>
                                        ) : (
                                            <>
                                                <td>{student.admissionNo}</td>
                                                <td>{student.name}</td>
                                                <td>{student.class}</td>
                                                <td>{new Date(student.dateOfBirth).toLocaleDateString()}</td>
                                                <td>{student.parentName}</td>
                                                <td>{student.contactNo}</td>
                                                <td>{student.place}</td>
                                                <td>{new Date(student.dateOfJoining).toLocaleDateString()}</td>
                                                <td>
                                                    {user?.role === 'admin' && (
                                                        <>
                                                            <button className="action-button edit-button" onClick={() => handleEditClick(student)}>
                                                                <FaEdit />
                                                            </button>
                                                            <button className="action-button delete-button" onClick={() => handleDelete(student._id)}>
                                                                <FaTrash />
                                                            </button>
                                                        </>
                                                    )}
                                                </td>
                                            </>
                                        )}
                                    </tr>
                                ) : null // Render nothing if student is undefined
                            ))
                        ) : (
                            <tr>
                                <td colSpan="9" style={{ textAlign: 'center' }}>No students found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default StudentsList;
