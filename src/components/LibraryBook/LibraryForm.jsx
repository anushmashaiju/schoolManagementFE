import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addLibraryRecord } from '../../redux-toolkit/librarySlice'; // Correct action import
import axios from 'axios'; // Import axios for API requests
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './LibraryForm.css';

function LibraryForm() {
  const [newBook, setNewBook] = useState({
    admissionNo: '',
    studentName: '',
    class: '',
    bookId: '',
    bookName: '',
    authorName: '',
    borrowDate: '',
    returnDate: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false); // State to manage form submission success
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize navigate

  // Fetch student data based on admission number
  const fetchStudentData = async (admissionNo) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/student/admission/${admissionNo}`);
      if (response.data) {
        setNewBook((prev) => ({
          ...prev,
          studentName: response.data.name,
          class: response.data.class,
        }));
      }
    } catch (error) {
      console.error('Error fetching student data:', error);
      setNewBook((prev) => ({
        ...prev,
        studentName: '',
        class: '',
      }));
    }
  };

  // Handle input changes for all form fields
  const handleBookChange = (e) => {
    const { name, value } = e.target;
    setNewBook((prev) => ({ ...prev, [name]: value }));

    // Fetch student data when admission number changes
    if (name === 'admissionNo' && value) {
      fetchStudentData(value);
    }
  };

  // Handle form submission
  const handleBookSubmit = async (e) => {
    e.preventDefault();

    try {
      // Fetch student details based on admission number
      const response = await axios.get(`http://localhost:8000/api/v1/student/admission/${newBook.admissionNo}`);
      const student = response.data; // Ensure we have the correct student data

      if (!student._id) {
        throw new Error('Student not found');
      }

      // Determine status based on return date
      const status = newBook.returnDate ? 'Returned' : 'Not Returned';

      // Create new book entry object with student details
      const newBookEntry = {
        student: student._id, // Pass the student's ObjectId
        bookId: newBook.bookId,
        bookName: newBook.bookName,
        authorName: newBook.authorName,
        borrowDate: newBook.borrowDate,
        returnDate: newBook.returnDate,
        status, // Set status based on return date

        // Include student details in the record
        studentDetails: {
          name: student.name,
          class: student.class,
          admissionNo: student.admissionNo,
        },
      };

      // Dispatch action to add the new book entry
      dispatch(addLibraryRecord(newBookEntry));

      // Show success message and reset form
      setIsSubmitted(true);
      setTimeout(() => {
        navigate('/library'); // After 1 second, navigate to the fee history page
      }, 1000);

      // Reset the form fields after submission
      setNewBook({
        admissionNo: '',
        studentName: '',
        class: '',
        bookId: '',
        bookName: '',
        authorName: '',
        borrowDate: '',
        returnDate: '',
      });

    } catch (error) {
      console.error('Error submitting book form:', error);
    }
  };

  return (
    <div>
      {/* Add Book Details Form */}
      <div className="library-form-card">
        <h3>Add Book Details</h3>

        <form onSubmit={handleBookSubmit}>
          <div>
            <label>Admission No:</label>
            <input
              type="text"
              name="admissionNo"
              value={newBook.admissionNo}
              onChange={handleBookChange}
              required
            />
          </div>
          <div>
            <label>Name of Student:</label>
            <input
              type="text"
              name="studentName"
              value={newBook.studentName}
              onChange={handleBookChange}
              readOnly
              required
            />
          </div>
          <div>
            <label>Class:</label>
            <input
              type="text"
              name="class"
              value={newBook.class}
              onChange={handleBookChange}
              readOnly
              required
            />
          </div>
          <div>
            <label>Book ID:</label>
            <input
              type="text"
              name="bookId"
              value={newBook.bookId}
              onChange={handleBookChange}
              required
            />
          </div>
          <div>
            <label>Book Name:</label>
            <input
              type="text"
              name="bookName"
              value={newBook.bookName}
              onChange={handleBookChange}
              required
            />
          </div>
          <div>
            <label>Author Name:</label>
            <input
              type="text"
              name="authorName"
              value={newBook.authorName}
              onChange={handleBookChange}
              required
            />
          </div>
          <div>
            <label>Borrow Date:</label>
            <input
              type="date"
              name="borrowDate"
              value={newBook.borrowDate}
              onChange={handleBookChange}
              required
            />
          </div>
          <div>
            <label>Return Date:</label>
            <input
              type="date"
              name="returnDate"
              value={newBook.returnDate}
              onChange={handleBookChange} // Update status when return date changes
            />
          </div>
          <button type="submit">Submit</button>
        </form>
        {/* Success message */}
        {isSubmitted && <div className="success-message">Book added successfully!</div>}
      </div>
    </div>
  );
}

export default LibraryForm;
