import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLibraryHistory, updateLibraryRecord, deleteLibraryRecord } from '../../redux-toolkit/librarySlice';
import { useNavigate } from 'react-router-dom';
import { IoChevronBackOutline } from 'react-icons/io5';
import { FaEdit, FaTrash, FaSave } from 'react-icons/fa'; // Import Save icon
import './LibraryList.css';

function LibraryList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { bookHistory, loading, error } = useSelector((state) => state.library);
  const user = useSelector((state) => state.auth.user); // Get user info from auth state

  // Local state to track the row being edited
  const [editingRecordId, setEditingRecordId] = useState(null);
  const [editedRecord, setEditedRecord] = useState({});

  useEffect(() => {
    dispatch(fetchLibraryHistory());
  }, [dispatch]);

  // Start editing a specific row
  const handleEdit = (book) => {
    setEditingRecordId(book._id); // Set the record ID being edited
    setEditedRecord({ // Copy the fields we want to edit
      bookId: book.bookId,
      bookName: book.bookName,
      authorName: book.authorName,
      borrowDate: new Date(book.borrowDate).toISOString().split('T')[0], // Format date for input
      returnDate: new Date(book.returnDate).toISOString().split('T')[0], // Format date for input
    });
  };

  // Save the changes
  const handleSave = (id) => {
    dispatch(updateLibraryRecord({ id, updatedRecord: { ...editedRecord, _id: id } }));
    setEditingRecordId(null); // Exit edit mode
  };

  // Handle changes in the input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedRecord((prev) => ({ ...prev, [name]: value }));
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      dispatch(deleteLibraryRecord(id));
    }
  };

  return (
    <div className="library-list">
      <div className="container">
        <button className="back-button" onClick={() => navigate(-1)}>
          <IoChevronBackOutline />
        </button>
        <h2>Library History</h2>

        {loading && <p>Loading...</p>}
        {error && <p className="error-message">Error: {error.message || JSON.stringify(error)}</p>}

        {!loading && !error && Array.isArray(bookHistory) && bookHistory.length > 0 ? (
          <table className="book-table">
            <thead>
              <tr>
                <th>Admission No</th>
                <th>Student Name</th>
                <th>Class</th>
                <th>Book ID</th>
                <th>Book Name</th>
                <th>Author Name</th>
                <th>Borrow Date</th>
                <th>Return Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookHistory.map((book) => (
                <tr key={book._id}>
                  <td>{book.studentDetails?.admissionNo}</td>
                  <td>{book.studentDetails?.name}</td>
                  <td>{book.studentDetails?.class}</td>
                  {/* Editable fields */}
                  <td>
                    {editingRecordId === book._id ? (
                      <input
                        type="text"
                        name="bookId"
                        value={editedRecord.bookId || ''}
                        onChange={handleChange}
                      />
                    ) : (
                      book.bookId
                    )}
                  </td>
                  <td>
                    {editingRecordId === book._id ? (
                      <input
                        type="text"
                        name="bookName"
                        value={editedRecord.bookName || ''}
                        onChange={handleChange}
                      />
                    ) : (
                      book.bookName
                    )}
                  </td>
                  <td>
                    {editingRecordId === book._id ? (
                      <input
                        type="text"
                        name="authorName"
                        value={editedRecord.authorName || ''}
                        onChange={handleChange}
                      />
                    ) : (
                      book.authorName
                    )}
                  </td>
                  <td>
                    {editingRecordId === book._id ? (
                      <input
                        type="date"
                        name="borrowDate"
                        value={editedRecord.borrowDate || ''}
                        onChange={handleChange}
                      />
                    ) : (
                      new Date(book.borrowDate).toLocaleDateString()
                    )}
                  </td>
                  <td>
                    {editingRecordId === book._id ? (
                      <input
                        type="date"
                        name="returnDate"
                        value={editedRecord.returnDate || ''}
                        onChange={handleChange}
                      />
                    ) : (
                      new Date(book.returnDate).toLocaleDateString()
                    )}
                  </td>
                  <td>{book.status}</td>
                  <td>
                    {editingRecordId === book._id ? (
                      <button className="action-button save-button" onClick={() => handleSave(book._id)}>
                        <FaSave />
                      </button>
                    ) : (
                      user?.role === 'admin' || user?.role === 'librarian' ? ( // Check if user is admin or librarian
                        <>
                          <button className="action-button edit-button" onClick={() => handleEdit(book)}>
                            <FaEdit />
                          </button>
                          <button className="action-button delete-button" onClick={() => handleDelete(book._id)}>
                            <FaTrash />
                          </button>
                        </>
                      ) : null // No actions for non-admin/librarian
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No book history available</p>
        )}
      </div>
    </div>
  );
}

export default LibraryList;
