import { useState } from 'react';
import './LibraryForm.css';

function LibraryForm() {
    const [bookHistory, setBookHistory] = useState([
        {
            id: 1, studentName: 'John Doe', class: '10th', admissionNo: 'A101',
            bookId: 'B001', bookName: 'To Kill a Mockingbird', authorName: 'Harper Lee',
            borrowDate: '2024-09-01', returnDate: '2024-09-15', status: 'Returned'
        },
        {
            id: 2, studentName: 'Jane Smith', class: '11th', admissionNo: 'A102',
            bookId: 'B002', bookName: '1984', authorName: 'George Orwell',
            borrowDate: '2024-09-10', returnDate: '2024-09-25', status: 'Borrowed'
        },
        {
            id: 3, studentName: 'Michael Johnson', class: '12th', admissionNo: 'A103',
            bookId: 'B003', bookName: 'The Great Gatsby', authorName: 'F. Scott Fitzgerald',
            borrowDate: '2024-09-12', returnDate: '2024-09-26', status: 'Borrowed'
        },
    ]);

    const [newBook, setNewBook] = useState({
        admissionNo: '',
        studentName: '',
        class: '',
        bookId: '',
        bookName: '',
        authorName: '',
        borrowDate: '',
        returnDate: ''
    });

    const handleBookChange = (e) => {
        const { name, value } = e.target;
        setNewBook((prev) => ({ ...prev, [name]: value }));
    };

    const handleBookSubmit = (e) => {
        e.preventDefault();
        const today = new Date();
        const returnDate = new Date(newBook.returnDate);
        const status = returnDate > today ? 'Borrowed' : 'Returned';

        const newBookEntry = {
            id: bookHistory.length + 1,
            admissionNo: newBook.admissionNo,
            studentName: newBook.studentName,
            class: newBook.class,
            bookId: newBook.bookId,
            bookName: newBook.bookName,
            authorName: newBook.authorName,
            borrowDate: newBook.borrowDate,
            returnDate: newBook.returnDate,
            status: status,
        };

        setBookHistory((prev) => [...prev, newBookEntry]);
        setNewBook({
            admissionNo: '',
            studentName: '',
            class: '',
            bookId: '',
            bookName: '',
            authorName: '',
            borrowDate: '',
            returnDate: ''
        }); // Reset form
    };

    return (
        <div>
            {/* Add Details Form */}
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
                            required
                        />
                    </div>
                    <div>
                        <label>Book Id:</label>
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
                            onChange={handleBookChange}
                            required
                        />
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default LibraryForm;
